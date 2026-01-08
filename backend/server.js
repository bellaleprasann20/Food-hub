import express from "express";
import cors from "cors";
import 'dotenv/config'
import {connectDB} from "./config/db.js";

import path from "path";
import { fileURLToPath } from 'url'; 

import userRouter from "./routes/userRoute.js";
import itemRouter from "./routes/itemRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE - CORS must be first
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES - Serve images (must be before API routes)
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
console.log('✓ Static files path:', path.join(__dirname, 'uploads'));

// DATABASE CONNECTION
connectDB();

// API Routes
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// Test route
app.get("/", (req, res) => {
    res.send("API is working!");
});

// Test uploads directory
app.get("/test-uploads", (req, res) => {
    const fs = require('fs');
    const uploadsPath = path.join(__dirname, 'uploads');
    
    if (fs.existsSync(uploadsPath)) {
        const files = fs.readdirSync(uploadsPath);
        res.json({
            success: true,
            uploadsPath,
            filesCount: files.length,
            files: files.slice(0, 10) // Show first 10 files
        });
    } else {
        res.json({
            success: false,
            message: 'Uploads directory does not exist',
            expectedPath: uploadsPath
        });
    }
});

app.listen(PORT, () => {
    console.log(`✓ Server is running on http://localhost:${PORT}`);
    console.log(`✓ Uploads directory: ${path.join(__dirname, 'uploads')}`);
});