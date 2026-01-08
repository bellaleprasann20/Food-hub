import React, { useState } from "react";
import { styles } from "../assets/dummyadmin";
import { FiUpload, FiHeart, FiStar } from "react-icons/fi";
import axios from "axios";
// 1. Import Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItem = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    image: null,
    preview: ''
  });

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const updateManualField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error("Please upload an image first."); // Better error display
      return;
    }

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('rating', formData.rating);
      payload.append('hearts', formData.hearts);
      payload.append('image', formData.image); 

      const res = await axios.post('http://localhost:4000/api/items', payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      // 2. Beautiful Toast Message on Screen
      toast.success("🚀 Item added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      setFormData({ name: '', description: '', category: '', price: '', rating: 0, hearts: 0, image: null, preview: '' });
    } catch (error) {
      console.error("Error Detail:", error.response?.data || error.message);
      toast.error("Failed to add item. Check connection.");
    }
  };

  const inputBaseStyle = "w-full border border-gray-600 bg-transparent p-3 rounded-lg outline-none text-white placeholder-gray-400 focus:border-orange-500 transition-colors";

  return (
    <div className={styles.formWrapper}>
      {/* 3. Add the ToastContainer here */}
      <ToastContainer />
      
      <div className="max-w-4xl mx-auto">
        <div className={styles.formCard}>
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4 text-center">Add New Menu Item</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className={styles.uploadWrapper}>
              <label className="cursor-pointer block border-2 border-dashed border-gray-600 rounded-xl hover:border-orange-500 transition-all" htmlFor="imageInput">
                {formData.preview ? (
                  <img src={formData.preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <FiUpload className="text-4xl mb-2" />
                    <p>Click to upload image</p>
                  </div>
                )}
                <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Item Name" className={inputBaseStyle} value={formData.name} onChange={handleChange} required />
              <select name="category" className={inputBaseStyle} value={formData.category} onChange={handleChange} required>
                <option value="" className="bg-gray-900">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat} className="bg-gray-900">{cat}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <span className="absolute left-3 top-3 text-white font-bold">₹</span>
                <input type="number" name="price" placeholder="Price" className={`${inputBaseStyle} pl-8`} value={formData.price} onChange={handleChange} required />
              </div>
              <textarea name="description" placeholder="Description" rows="3" className={inputBaseStyle} value={formData.description} onChange={handleChange} required />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-gray-300 font-medium">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`text-2xl cursor-pointer transition-colors ${formData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                      onClick={() => updateManualField('rating', star)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-300 font-medium">Popularity:</span>
                <button 
                  type="button"
                  onClick={() => updateManualField('hearts', formData.hearts + 1)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${formData.hearts > 0 ? "bg-pink-600 border-pink-500 text-white" : "border-gray-600 text-gray-400"}`}
                >
                  <FiHeart className={formData.hearts > 0 ? "fill-white" : ""} />
                  <span className="font-bold">{formData.hearts}</span>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all">
              Add Item to Inventory
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;