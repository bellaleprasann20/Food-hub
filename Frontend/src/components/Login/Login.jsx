import React, { useEffect, useState } from "react";
// FIX 1: Removed duplicate FaUserPlus import
import { FaArrowRight, FaCheckCircle, FaEyeSlash, FaEye, FaLock, FaUser, FaUserPlus } from "react-icons/fa";
import { iconClass, inputBase } from "../../assets/dummydata";
import { Link } from "react-router-dom";

const Login = ({ onClose, onLoginSuccess }) => {
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [FormData, setFormData] = useState({ username: '', password: '', rememberMe: false });

    useEffect(() => {
        const stored = localStorage.getItem('loginData');
        if (stored) setFormData(JSON.parse(stored));
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if (FormData.rememberMe) {
            localStorage.setItem('loginData', JSON.stringify(FormData));
        } else {
            localStorage.removeItem('loginData');
        }
        
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        if (onLoginSuccess) onLoginSuccess();
    };

    const handleChange = ({ target: { name, value, type, checked } }) =>
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <div className="space-y-6 relative">
            {/* Toast Notification */}
            <div className={`fixed top-4 right-4 z-50 transition-all duration-300 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg
                ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                <FaCheckCircle className="flex-shrink-0" />
                <span>Login Successful</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <FaUser className={iconClass} />
                    <input 
                        type="text" 
                        name='username' 
                        placeholder="Username"
                        value={FormData.username}
                        onChange={handleChange} 
                        className={`${inputBase} pl-10 pr-4 py-3`} 
                    />
                </div>

                <div className="relative">
                    <FaLock className={iconClass} />
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' 
                        placeholder="Password" 
                        value={FormData.password}
                        onChange={handleChange} 
                        className={`${inputBase} pl-10 pr-4 py-3`} 
                    />
                    <button 
                        type="button" 
                        onClick={toggleShowPassword} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        name="rememberMe" 
                        id="rememberMe"
                        checked={FormData.rememberMe} 
                        onChange={handleChange} 
                    />
                    <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    Sign In <FaArrowRight/>
                </button>
                {/* FIX 2: Removed empty button tag */}
            </form>

            <div className="text-center">
                {/* FIX 3: Changed lowercase <link> to capitalized <Link> */}
                <Link to='/signup' onClick={onClose} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors">
                    <FaUserPlus/> Create New Account
                </Link>
            </div>
        </div>
    );
}

export default Login;