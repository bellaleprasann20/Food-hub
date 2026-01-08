import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPackage } from 'react-icons/fi';

const MyOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const url = "http://localhost:4000";

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/orders/userorders", {}, { headers: { token: localStorage.getItem("token") } });
        setOrders(response.data.data);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchOrders();
        }
    }, []);

    return (
        <div className="py-16 px-6 lg:px-20 min-h-screen bg-[#1a120b] text-white">
            <h2 className="text-3xl font-bold mb-10 border-b border-gray-700 pb-4">My Orders</h2>
            <div className="flex flex-col gap-6">
                {orders.map((order, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-center gap-4 p-6 border border-amber-500/20 rounded-xl bg-[#2a1e14] text-gray-300">
                        <FiPackage className="text-4xl text-orange-500" />
                        <p>
                            {order.items.map((item, i) => (
                                <span key={i}>{item.name} x {item.quantity}{i === order.items.length - 1 ? "" : ", "}</span>
                            ))}
                        </p>
                        <p className="font-bold text-amber-300">₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p className="flex items-center gap-2">
                            <span className="text-orange-500">&#x25cf;</span> 
                            <b className="font-medium text-white">{order.status}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrderPage;