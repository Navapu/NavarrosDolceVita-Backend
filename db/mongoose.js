import mongoose from "mongoose";
import { DB_USER, DB_PASS, CLUSTER, DATABASE } from "../config/config.js";
export const connectDB = async () => {
    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}`;

    try{
        await mongoose.connect(url);
        console.log("Connected to MongoDB")
        console.log(`DB: ${mongoose.connection.db.databaseName}`)
    }catch(error){
        console.log(`Error connecting to MongoDB: ${error}`)
    }
}