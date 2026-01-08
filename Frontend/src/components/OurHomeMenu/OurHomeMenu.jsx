import React, { useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { dummyMenuData } from "../../assets/OmDD";

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurHomeMenu = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const displayItems = (dummyMenuData[activeCategory] || []).slice(0, 4);

    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const getQuantity = id => (cartItems.find(i => i.id === id)?.quantity || 0);

    return (
        <div className="bg-gradient-to-r from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
                    <span className="font-cursive block text-5xl md:text-7xl sm:text-6xl mb-2">
                        Our Exquisite Menu
                    </span>
                    <span className='block text-xl sm:text-2xl md:text-2xl mt-4 text-amber-100/80'>
                        A Symphony of Flavors
                    </span>
                </h2>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform text-sm sm:text-lg tracking-widest backdrop-blur-sm
                            ${activeCategory === cat ?
                                'bg-gradient-to-r from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30 text-white'
                                : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-105'
                            }`}
                        > 
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {displayItems.map((item, i) => {
                        const quantity = getQuantity(item.id);
                        return (
                            <div 
                                key={item.id} 
                                className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md flex flex-col transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/40"
                            >
                                {/* Image with Floating Animation */}
                                <div className="relative h-52 flex items-center justify-center p-4 overflow-hidden bg-black/20">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        /* Using your custom float animation from CSS */
                                        className="max-h-full max-w-full object-contain animate-[float_6s_ease-in-out_infinite] transition-transform duration-700 group-hover:scale-110" 
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    {/* FOOD ITEM NAME */}
                                    <h3 className="text-2xl font-bold text-amber-100 mb-2 font-cursive group-hover:text-amber-400 transition-colors">
                                        {item.title || item.name} 
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                                        {item.description}
                                    </p>
                                    
                                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                                        <span className="text-2xl font-bold text-amber-500">₹{item.price}</span>
                                        
                                        {quantity === 0 ? (
                                            <button 
                                                onClick={() => addToCart(item, 1)}
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold px-6 py-2 rounded-xl hover:scale-105 transition-transform"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3 bg-amber-900/40 rounded-xl p-1 border border-amber-500/30">
                                                <button onClick={() => quantity > 1 ? updateQuantity(item.id, quantity - 1) : removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-amber-500 font-bold hover:bg-amber-500 hover:text-white rounded-lg transition-all">−</button>
                                                <span className="text-amber-100 font-bold min-w-[20px] text-center">{quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center text-amber-500 font-bold hover:bg-amber-500 hover:text-white rounded-lg transition-all">+</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default OurHomeMenu;