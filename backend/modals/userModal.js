import { em } from "framer-motion/client";
import mongoose from "mongoose";
import { use } from "react";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true},
    password: {
        type: String,
        required: true,
    },
});

const userModal = mongoose.model("User", userSchema);

export default userModal;

