import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaUser, FaPhone, FaEnvelope, FaHome, FaCity, FaLock, FaMobileAlt, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { SiPhonepe, SiGooglepay, SiPaytm } from "react-icons/si";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        paymentMethod: 'card', // card, upi, cod
        upiProvider: 'phonepe', // phonepe, googlepay, paytm, other
        upiId: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        specialInstructions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setOrderPlaced(true);
            clearCart();

            // Redirect to order confirmation after 3 seconds
            setTimeout(() => {
                navigate('/myorder');
            }, 3000);
        }, 2000);
    };

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, '') || 0);
        return total + (price * item.quantity);
    }, 0);
    const deliveryFee = 40;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] flex items-center justify-center px-4">
                <div className="text-center animate-fade-in">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-4xl font-dancingscript text-amber-400 mb-4">Order Placed Successfully!</h2>
                    <p className="text-amber-100/80 text-lg">Redirecting to your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-dancingscript bg-gradient-to-r from-amber-100 to-amber-400 bg-clip-text text-transparent mb-2">
                        Checkout
                    </h1>
                    <p className="text-amber-100/60 font-cinzel">Complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-sm animate-fade-in">
                                <h2 className="text-2xl font-dancingscript text-amber-400 mb-6 flex items-center gap-2">
                                    <FaUser /> Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Full Name *</label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Phone *</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Email *</label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-sm animate-fade-in">
                                <h2 className="text-2xl font-dancingscript text-amber-400 mb-6 flex items-center gap-2">
                                    <FaMapMarkerAlt /> Delivery Address
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Street Address *</label>
                                        <div className="relative">
                                            <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="123 Main Street, Apt 4B"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-amber-100/80 font-cinzel text-sm mb-2">City *</label>
                                            <div className="relative">
                                                <FaCity className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                    placeholder="Mumbai"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-amber-100/80 font-cinzel text-sm mb-2">State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="Maharashtra"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-amber-100/80 font-cinzel text-sm mb-2">PIN Code *</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="400001"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Special Instructions (Optional)</label>
                                        <textarea
                                            name="specialInstructions"
                                            value={formData.specialInstructions}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                            placeholder="Ring the doorbell, leave at door, etc."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-sm animate-fade-in">
                                <h2 className="text-2xl font-dancingscript text-amber-400 mb-6 flex items-center gap-2">
                                    <FaCreditCard /> Payment Method
                                </h2>
                                <div className="space-y-4">
                                    {/* Payment Method Selection */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <label className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-amber-500 bg-amber-900/30' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <FaCreditCard className="text-2xl text-amber-400" />
                                            <span className="text-amber-100 font-cinzel">Card</span>
                                        </label>

                                        <label className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'upi' ? 'border-amber-500 bg-amber-900/30' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="upi"
                                                checked={formData.paymentMethod === 'upi'}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <FaMobileAlt className="text-2xl text-amber-400" />
                                            <span className="text-amber-100 font-cinzel">UPI</span>
                                        </label>

                                        <label className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-amber-500 bg-amber-900/30' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === 'cod'}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <FaMoneyBillWave className="text-2xl text-amber-400" />
                                            <span className="text-amber-100 font-cinzel">COD</span>
                                        </label>
                                    </div>

                                    {/* Card Payment */}
                                    {formData.paymentMethod === 'card' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fade-in">
                                            <div className="md:col-span-2">
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Card Number *</label>
                                                <div className="relative">
                                                    <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleChange}
                                                        required={formData.paymentMethod === 'card'}
                                                        className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength="19"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Cardholder Name *</label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleChange}
                                                    required={formData.paymentMethod === 'card'}
                                                    className="w-full px-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-2">Expiry Date *</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                    required={formData.paymentMethod === 'card'}
                                                    className="w-full px-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-2">CVV *</label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleChange}
                                                        required={formData.paymentMethod === 'card'}
                                                        className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                        placeholder="123"
                                                        maxLength="4"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* UPI Payment */}
                                    {formData.paymentMethod === 'upi' && (
                                        <div className="space-y-4 mt-4 animate-fade-in">
                                            <div>
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-3">Select UPI Provider</label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    <label className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.upiProvider === 'phonepe' ? 'border-purple-500 bg-purple-900/20' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="upiProvider"
                                                            value="phonepe"
                                                            checked={formData.upiProvider === 'phonepe'}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <SiPhonepe className="text-4xl text-purple-400" />
                                                        <span className="text-amber-100 font-cinzel text-sm">PhonePe</span>
                                                    </label>

                                                    <label className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.upiProvider === 'googlepay' ? 'border-blue-500 bg-blue-900/20' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="upiProvider"
                                                            value="googlepay"
                                                            checked={formData.upiProvider === 'googlepay'}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <SiGooglepay className="text-4xl text-blue-400" />
                                                        <span className="text-amber-100 font-cinzel text-sm">Google Pay</span>
                                                    </label>

                                                    <label className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.upiProvider === 'paytm' ? 'border-cyan-500 bg-cyan-900/20' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="upiProvider"
                                                            value="paytm"
                                                            checked={formData.upiProvider === 'paytm'}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <SiPaytm className="text-4xl text-cyan-400" />
                                                        <span className="text-amber-100 font-cinzel text-sm">Paytm</span>
                                                    </label>

                                                    <label className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.upiProvider === 'other' ? 'border-amber-500 bg-amber-900/20' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="upiProvider"
                                                            value="other"
                                                            checked={formData.upiProvider === 'other'}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <FaWallet className="text-4xl text-amber-400" />
                                                        <span className="text-amber-100 font-cinzel text-sm">Other UPI</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-amber-100/80 font-cinzel text-sm mb-2">UPI ID *</label>
                                                <div className="relative">
                                                    <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/50" />
                                                    <input
                                                        type="text"
                                                        name="upiId"
                                                        value={formData.upiId}
                                                        onChange={handleChange}
                                                        required={formData.paymentMethod === 'upi'}
                                                        className="w-full pl-10 pr-4 py-3 bg-[#1a120b] border border-amber-500/30 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                                                        placeholder="yourname@upi"
                                                    />
                                                </div>
                                                <p className="text-amber-300/50 text-xs mt-2 font-cinzel">Enter your UPI ID (e.g., 9876543210@paytm)</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Cash on Delivery */}
                                    {formData.paymentMethod === 'cod' && (
                                        <div className="mt-4 p-4 bg-amber-900/30 border border-amber-500/30 rounded-lg animate-fade-in">
                                            <div className="flex items-start gap-3">
                                                <FaMoneyBillWave className="text-2xl text-amber-400 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="text-amber-100 font-cinzel font-semibold mb-2">Cash on Delivery</h3>
                                                    <p className="text-amber-100/70 text-sm font-cinzel">
                                                        Pay when your order is delivered to your doorstep. Please keep exact change ready.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white py-4 rounded-2xl font-cinzel text-lg hover:shadow-lg hover:shadow-amber-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingBag />
                                        Place Order - ₹{total.toFixed(2)}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-sm sticky top-24 animate-fade-in">
                            <h2 className="text-2xl font-dancingscript text-amber-400 mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-4 border-b border-amber-500/20">
                                        <img 
                                            src={item.img || item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/64' }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-amber-100 font-cinzel text-sm">{item.name}</h3>
                                            <p className="text-amber-100/60 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-amber-400 font-cinzel text-sm">{item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-amber-100/80 font-cinzel text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-amber-100/80 font-cinzel text-sm">
                                    <span>Delivery Fee</span>
                                    <span>₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-amber-100/80 font-cinzel text-sm">
                                    <span>Tax (8%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 border-t border-amber-500/30 flex justify-between text-amber-400 font-dancingscript text-2xl">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-500/20">
                                <p className="text-amber-100/60 text-xs font-cinzel text-center">
                                    🔒 Your payment information is secure and encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;