import mongoose from "mongoose";

export const connectDB = async () => {
    // We use process.env.MONGO_URI to read from your .env file
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB CONNECTED');
    } catch (error) {
        console.error('DB CONNECTION ERROR:', error.message);
    }
}