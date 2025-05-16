import mongoose from "mongoose";
import dotenv from "dotenv";
 
dotenv.config();
 
import { config } from "./src/config.js"
 
mongoose.connect(config.db.URI);
 
const connection = mongoose.connection;
 
connection.once("open", () => {
    console.log("DB is Connected");
});
 
connection.on("disconnected", () => {
    console.log("DB is Disconnected");
});
 
connection.on("error", (error) => {
    console.log("error found: "  + error);
});
 
 