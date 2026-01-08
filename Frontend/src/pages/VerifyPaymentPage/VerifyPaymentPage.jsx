import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyPaymentPage = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/orders/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorder");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification failed", error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#1a120b] text-white">
            <div className="w-16 h-16 border-4 border-t-orange-500 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium">Verifying your payment, please wait...</p>
        </div>
    );
};

export default VerifyPaymentPage;