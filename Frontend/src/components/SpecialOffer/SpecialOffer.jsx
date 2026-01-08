import React, { useState } from "react";
// FaHeart is already in your dummydata.js, make sure to import it here too
import { FaHeart } from 'react-icons/fa';
import { cardData, additionalData } from "../../assets/dummydata";
import { useCart } from "../../CartContext/CartContext";

const SpecialOffer = () => {
    const [showAll, setShowAll] = useState(false);
    const initialData = [...cardData, ...additionalData];
    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();

    return (
        <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-[poppins]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14"> 
                    <h1 className="text-5xl font-bold mb-4 transform transition-all bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent font-[Playfair_Display] italic">
                        Today's <span className="text-stroke-gold">Special</span> Offer 
                    </h1>
                    <p className="text-lg text-gray-300 max-auto tracking-wide leading-relaxed">
                        Savor the extraordinary with culinary masterpieces crafted to perfection.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {(showAll ? initialData : initialData.slice(0, 4)).map((item, index) => {
                        const itemInCart = cartItems?.find(ci => ci.id === item.id);
                        const quantity = itemInCart ? itemInCart.quantity : 0;

                        return (
                            <div key={`${item.id}-${index}`} className="relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-amber-900/40 border-2 border-transparent hover:border-amber-500/20">
                                <div className="relative h-72 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500" 
                                    />
                                    {/* POPULAR TAG (if applicable) */}
                                    {item.popular && (
                                        <div className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                                            Popular
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-amber-100">{item.title}</h3>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded">⭐ {item.rating}</span>
                                            {/* HEART / LIKES SECTION */}
                                            <div className="flex items-center gap-1 text-rose-500 text-sm font-semibold mt-1">
                                                <FaHeart className="cursor-pointer hover:scale-110 transition-transform" />
                                                <span>{item.hearts}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-amber-500"> ₹{item.price}</span>
                                        
                                        {quantity === 0 ? (
                                            <button 
                                                onClick={() => addToCart(item, 1)}
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 text-[#1a1212] font-bold px-6 py-2 rounded-xl hover:scale-105 transition-transform"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3 bg-[#3a2a2a] rounded-xl p-1 border border-amber-500/30">
                                                <button 
                                                    onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeFromCart(item.id)}
                                                    className="w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-bold text-xl"
                                                >
                                                    −
                                                </button>
                                                <span className="font-bold text-amber-100 min-w-[20px] text-center">{quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors font-bold text-xl"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="bg-gradient-to-r from-amber-500 to-red-600 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-110 transition-transform shadow-lg shadow-amber-900/20"
                    >
                        {showAll ? "Show Less" : "View All Special Offers"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;