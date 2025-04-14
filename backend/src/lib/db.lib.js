import mongoose from "mongoose";

export const mongo=async () => {
    try {
        await mongoose.connect(process.env.MON)
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error in connecting to DB",error);
    }
}