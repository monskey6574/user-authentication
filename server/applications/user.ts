import user from "../infastructure/schemas/user";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const users = req.body; // Extract user data from the request body
    await user.create(users); // Save user data to the database
    res.status(201).json(users); // Respond with the created user data and a 201 status
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "An error occurred", error });
     return;
  }
};

export const loginUser = async (req: express.Request, res: express.Response) : Promise<void>=> {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
       res.status(400).json({ message: "Email and password are required" });
       return;
    }

    // Find user by email
    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
       res.status(400).json({ message: "Invalid credentials" });
       return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginUser


