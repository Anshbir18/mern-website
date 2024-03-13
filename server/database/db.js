import mongoose from "mongoose";

const Connection = async()=>{
    const MONGODB_URI=process.env.MONGODB_URI;
    try {
        mongoose.connect(MONGODB_URI);
        console.log("connection established");
    } catch (error) {
        console.error("error in connecting");
    }
}

export default Connection;