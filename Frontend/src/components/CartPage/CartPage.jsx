import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // ADDED: useNavigate
import { useCart } from '../../CartContext/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate(); // ADDED: useNavigate hook

    // ADDED: Handle checkout button click
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen overflow-hidden py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down">
                    <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2 bg-gradient-to-r from-amber-100 to-amber-400 bg-clip-text text-transparent">
                        Your Cart
                    </span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center animate-fade-in">
                        <p className="text-amber-100/80 text-xl mb-4">
                            Your cart is empty
                        </p>
                        <Link to='/menu' className='transition-all duration-300 text-amber-100 inline-flex items-center gap-2 hover:gap-3 hover:bg-amber-800/50 hover:bg-amber-900/40 p-6 py-2 rounded-full font-cinzel text-sm uppercase'>
                            Browse All Items
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="group bg-amber-900/20 p-4 rounded-2xl border-4 border-dashed border-amber-500 backdrop-blur-sm flex flex-col items-center gap-4 transition-all duration-300 hover:border-solid hover:shadow-xl hover:shadow-amber-900/10 transform hover:-translate-y-1 animate-fade-in">
                                    
                                    <div className="w-24 h-24 flex-shrink-0 cursor-pointer relative overflow-hidden rounded-lg transition-transform duration-300"
                                        onClick={() => setSelectedImage(item.img || item.image)}>
                                        <img 
                                            src={item.img || item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
                                        />
                                    </div>

                                    <div className="w-full text-center">
                                        <h3 className="text-xl font-dancingscript text-amber-100">
                                            {item.name}
                                        </h3>
                                        <p className="text-amber-100/80 font-cinzel mt-1">{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="w-8 h-8 rounded-full bg-amber-900/40 text-amber-100 flex items-center justify-center hover:bg-amber-900/60 transition-all duration-200 active:scale-95">
                                            -
                                        </button>
                                        <span className="text-amber-100 font-cinzel">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full bg-amber-900/40 text-amber-100 flex items-center justify-center hover:bg-amber-900/60 transition-all duration-200 active:scale-95">
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs text-red-400/80 hover:text-red-400 font-cinzel transition-colors">
                                        Remove Item
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-amber-900/20 rounded-3xl border border-amber-500/30 backdrop-blur-md max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-dancingscript text-amber-100 mb-4">Total: {cartTotal}</h2>
                            {/* FIXED: Added onClick handler to navigate to checkout */}
                            <button 
                                onClick={handleCheckout}
                                className="bg-gradient-to-r from-amber-500 to-amber-700 text-white px-10 py-3 rounded-full font-cinzel hover:shadow-lg hover:shadow-amber-900/40 transition-all duration-300 hover:scale-105 active:scale-95">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Preview" className="max-w-full max-h-full rounded-xl shadow-2xl" />
                </div>
            )}
        </div>
    );
};

export default CartPage;