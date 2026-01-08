import itemModal from "../modals/itemModal.js";
import fs from "fs";
import path from "path";

// CREATE ITEM
export const createItem = async (req, res) => {
    try {
        console.log("📦 File received:", req.file);
        console.log("📦 Request body:", req.body);

        if (!req.file) {
            return res.status(400).json({ 
                status: "error", 
                message: "Image is required" 
            });
        }

        const { name, description, category, price, rating, hearts } = req.body;
        
        // CRITICAL FIX: Store ONLY the filename, not the full path
        const image = req.file.filename; // e.g., "1704123456789-pizza.jpg"

        const newItem = new itemModal({
            name,
            description,
            category,
            price: Number(price),
            rating: Number(rating) || 0,
            hearts: Number(hearts) || 0,
            total: Number(price) || 0,
            image, // Store just the filename
            imgUrl: image, // Keep imgUrl for backward compatibility if your model has it
        });

        const saved = await newItem.save();
        
        console.log("✓ Item saved:", {
            id: saved._id,
            name: saved.name,
            image: saved.image,
            fullUrl: `http://localhost:4000/uploads/${saved.image}`
        });
        
        res.status(201).json(saved); 
    } catch (error) {
        console.error("❌ Error saving item:", error.message);
        
        // Delete uploaded file if save fails
        if (req.file && req.file.path) {
            try {
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                    console.log("Deleted uploaded file due to error");
                }
            } catch (unlinkError) {
                console.error("Failed to delete file:", unlinkError);
            }
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ 
                status: "error", 
                message: "Item name already exists" 
            });
        }
        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
};

// GET ALL ITEMS
export const getAllItems = async (req, res, next) => {
    try {
        const items = await itemModal.find().sort({ createdAt: -1 });
        
        console.log(`✓ Fetched ${items.length} items`);
        
        // Debug: Log first item
        if (items.length > 0) {
            console.log("Sample item:", {
                name: items[0].name,
                image: items[0].image,
                imgUrl: items[0].imgUrl
            });
        }

        // Return items as-is - frontend will construct the full URL
        res.json(items);
        
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        next(error);
    }
};

// DELETE ITEM
export const deleteItem = async (req, res, next) => {
    try {
        const item = await itemModal.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ 
                success: false,
                message: "Item not found" 
            });
        }

        // Delete the image file from uploads folder
        const imageFilename = item.image || item.imgUrl?.replace('/uploads/', '');
        
        if (imageFilename) {
            const imagePath = path.join('uploads', imageFilename);
            
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log("✓ Deleted image file:", imageFilename);
            } else {
                console.log("⚠️ Image file not found:", imagePath);
            }
        }

        await itemModal.findByIdAndDelete(req.params.id);
        
        console.log("✓ Item deleted:", item.name);
        
        res.status(200).json({ 
            success: true, 
            message: "Item deleted successfully" 
        });
        
    } catch (error) {
        console.error("❌ Error deleting item:", error);
        next(error);
    }
};