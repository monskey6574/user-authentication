import 'dotenv/config';
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export const connectDB = async()=>{
  try {
    const connection = process.env.connection_string;
    if(!connection){
      throw new Error("No connection String");
      
    }
    await mongoose.connect(connection, {
  });
  console.log('Database Connected...');


}catch(err){
  console.log(err);
}
}
// Hash password before saving

