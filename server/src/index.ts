import express from "express";
import { createUser  } from "../applications/user";
import { userRoute } from "../api/user";
import cors from "cors";
import { connectDB } from "../infastructure/db";


const app = express();
app.use(express.json());
app.use(cors());
connectDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/signup" ,createUser);

app.use('/' ,userRoute);

app.listen(8000, () => console.log("Server is listening on port 8000."));