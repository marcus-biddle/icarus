import mongoose from "mongoose";

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
}