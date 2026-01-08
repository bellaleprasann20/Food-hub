import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  hearts: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  // Support both field names for compatibility
  image: {
    type: String,
    required: [true, "Image is required"],
    // Stores just the filename: "1704123456789-pizza.jpg"
  },
  imgUrl: {
    type: String,
    // Optional - for backward compatibility
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Index for faster queries
itemSchema.index({ category: 1, createdAt: -1 });

const itemModal = mongoose.model("Item", itemSchema);

export default itemModal;