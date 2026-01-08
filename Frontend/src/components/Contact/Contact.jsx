import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FiMapPin, FiPhone, FiGlobe, FiMail, FiMessageSquare } from "react-icons/fi"; 
import { contactFormFields } from '../../assets/dummydata';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', dish: '', query: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.query) {
            toast.error("Please enter your query");
            return;
        }
        toast.success("Message sent successfully!");
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-900 via-amber-900 to-gray-900 animate-gradient-x py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-[Poppins] relative overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 4000 }} />
            
            <div className="absolute top-20 left-10 w-24 h-24 bg-orange-500/20 rounded-full animate-float" />
            <div className="absolute bottom-40 right-20 w-16 h-16 bg-green-500/20 rounded-full animate-float-delayed" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 animate-fade-in-down">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">
                        Contact With Us
                    </span>
                </h1>

                {/* INFO CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border-l-4 border-amber-500 group transition-all hover:scale-[1.02]">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-amber-500/30 rounded-xl">
                                <FiMapPin className="text-amber-400 text-2xl" />
                            </div>
                            <h3 className="ml-4 text-amber-100 text-xl font-semibold">Our Headquarter</h3>
                        </div>
                        <p className="pl-12 text-amber-100 font-light">Bhalki, Bidar</p>
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border-l-4 border-green-500 group transition-all hover:scale-[1.02]">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-green-500/30 rounded-xl">
                                <FiPhone className="text-green-400 text-2xl" />
                            </div>
                            <h3 className="ml-4 text-amber-100 text-xl font-semibold">Contact Number</h3>
                        </div>
                        <p className="pl-12 text-amber-100 font-light flex items-center">
                            <FiGlobe className='mr-2' /> +91 9380646560
                        </p>
                    </div>

                    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border-l-4 border-orange-500 group transition-all hover:scale-[1.02]">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-orange-500/30 rounded-xl">
                                <FiMail className="text-orange-400 text-2xl" />
                            </div>
                            <h3 className="ml-4 text-orange-100 text-xl font-semibold">Email Address</h3>
                        </div>
                        <p className="pl-12 text-orange-100 font-light">prasannbellale@gmail.com</p>
                    </div>
                </div>

                {/* CONTACT FORM */}
                <div className="relative bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-amber-500/30">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {contactFormFields.map(({ label, name, type, placeholder, Icon }) => (
                                <div key={name} className="relative">
                                    <label className="text-amber-200 text-sm mb-2 block">{label}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-500">
                                            {Icon && <Icon />}
                                        </div>
                                        <input
                                            type={type}
                                            name={name}
                                            value={formData[name]}
                                            placeholder={placeholder}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-amber-500/30 rounded-lg py-3 px-10 text-white focus:border-amber-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ADDED: QUERY SECTION (TEXTAREA) */}
                        <div className="relative">
                            <label className="text-amber-200 text-sm mb-2 block">Your Query</label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 text-amber-500">
                                    <FiMessageSquare />
                                </div>
                                <textarea
                                    name="query"
                                    rows="4"
                                    value={formData.query}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full bg-white/10 border border-amber-500/30 rounded-lg py-3 px-10 text-white focus:border-amber-400 outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-bold hover:scale-[1.01] active:scale-95 transition-all shadow-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;