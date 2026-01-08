import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiClock, FiTruck, FiCheckCircle, FiPackage, FiUser, FiMapPin, FiMail, FiXCircle } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  tableClasses,
  layoutClasses
} from "../assets/dummyadmin";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Base URL - Make sure this matches your backend
  const url = "http://localhost:4000/api/orders";

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      console.log('Fetching orders from:', `${url}/getall`);
      console.log('Token:', token ? 'Present' : 'Missing');

      const response = await axios.get(`${url}/getall`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Full Response:', response.data);
      
      // Handle different response structures
      let orderData = [];
      
      if (response.data.orders) {
        orderData = response.data.orders;
      } else if (response.data.data) {
        orderData = response.data.data;
      } else if (response.data.order) {
        orderData = [response.data.order];
      } else if (Array.isArray(response.data)) {
        orderData = response.data;
      }

      console.log('Processed Orders:', orderData);
      setOrders(Array.isArray(orderData) ? orderData : []);
      
      if (orderData.length === 0) {
        toast.info("No orders found in the system");
      }
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('Updating order:', orderId, 'to status:', newStatus);
      
      const response = await axios.put(
        `${url}/getall/${orderId}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Update response:', response.data);

      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`, { theme: "dark" });
        await fetchOrders(); 
      }
    } catch (error) {
      console.error("Error updating order:", error);
      console.error("Update error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- Helper Styling Functions ---

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <FiClock className="text-lg" />;
      case 'Shipped': return <FiTruck className="text-lg" />;
      case 'Delivered': return <FiCheckCircle className="text-lg" />;
      case 'Cancelled': return <FiXCircle className="text-lg" />;
      default: return <FiClock className="text-lg" />;
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      Processing: { color: 'text-amber-400', bg: 'bg-amber-900/20' },
      Shipped: { color: 'text-blue-400', bg: 'bg-blue-900/20' },
      Delivered: { color: 'text-green-400', bg: 'bg-green-900/20' },
      Cancelled: { color: 'text-red-400', bg: 'bg-red-900/20' }
    };
    return styles[status] || styles.Processing;
  };

  const getPaymentStatusStyle = (status) => {
    const normalized = status?.toLowerCase();
    const styles = {
      pending: 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50',
      completed: 'bg-green-600/30 text-green-300 border-green-500/50',
      successful: 'bg-green-600/30 text-green-300 border-green-500/50',
      failed: 'bg-red-600/30 text-red-300 border-red-300/50'
    };
    return styles[normalized] || styles.pending;
  };

  const getPaymentMethodStyle = (method) => {
    const styles = {
      'Cash on Delivery': 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50',
      'card': 'bg-purple-600/30 text-purple-300 border-purple-500/50',
      'online': 'bg-purple-600/30 text-purple-300 border-purple-500/50',
      'Online': 'bg-purple-600/30 text-purple-300 border-purple-500/50'
    };
    return styles[method] || 'bg-blue-600/30 text-blue-300 border-blue-500/50';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={layoutClasses.page}>
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        <div className={layoutClasses.card}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={layoutClasses.heading}>Orders Management</h2>
            <button 
              onClick={fetchOrders}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <FiPackage /> Refresh Orders
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="text-amber-300 mt-4">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <>
              <div className="mb-4 text-amber-300/70 text-sm">
                Total Orders: <span className="text-amber-400 font-bold">{orders.length}</span>
              </div>
              <div className={tableClasses.wrapper}>
                <table className={tableClasses.table}>
                  <thead>
                    <tr className={tableClasses.headerRow}>
                      <th className={tableClasses.headerCell}>Order ID</th>
                      <th className={tableClasses.headerCell}>Customer</th>
                      <th className={tableClasses.headerCell}>Items</th>
                      <th className={tableClasses.headerCell}>Amount</th>
                      <th className={tableClasses.headerCell}>Payment</th>
                      <th className={tableClasses.headerCell}>Status</th>
                      <th className={tableClasses.headerCell}>Date</th>
                      <th className={tableClasses.headerCell}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const statusStyle = getStatusStyle(order.status);
                      return (
                        <tr key={order._id} className={tableClasses.row}>
                          <td className={tableClasses.cellBase}>
                            <span className="text-amber-200 font-mono text-sm">
                              #{order._id?.slice(-8) || 'N/A'}
                            </span>
                          </td>

                          <td className={tableClasses.cellBase}>
                            <div className="text-amber-100 font-medium">
                              {order.firstName || order.fullName || 'N/A'} {order.lastName || ''}
                            </div>
                            <div className="text-xs text-amber-300/60">
                              {order.email || 'No email'}
                            </div>
                            <div className="text-xs text-amber-300/60">
                              {order.city || order.address || 'No address'}
                            </div>
                          </td>

                          <td className={tableClasses.cellBase}>
                            {order.items && order.items.length > 0 ? (
                              order.items.map((itemObj, idx) => (
                                <div key={idx} className="text-sm text-amber-200">
                                  {itemObj.quantity}x {itemObj.item?.name || itemObj.name || 'Unknown Item'}
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-amber-300/50">No items</div>
                            )}
                          </td>

                          <td className={tableClasses.cellBase}>
                            <div className="text-lg font-bold text-green-400">
                              ₹{order.totalAmount || order.total || order.amount || '0'}
                            </div>
                          </td>

                          <td className={tableClasses.cellBase}>
                            <div className="flex flex-col gap-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] border w-fit ${getPaymentMethodStyle(order.paymentMethod)}`}>
                                {order.paymentMethod || 'N/A'}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] border w-fit ${getPaymentStatusStyle(order.paymentStatus)}`}>
                                {order.paymentStatus || 'pending'}
                              </span>
                            </div>
                          </td>

                          <td className={tableClasses.cellBase}>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.color}`}>
                              {getStatusIcon(order.status)}
                              <span className="text-sm">{order.status || 'Processing'}</span>
                            </div>
                          </td>

                          <td className={tableClasses.cellBase}>
                            <div className="text-xs text-amber-300/70">
                              {formatDate(order.createdAt || order.date)}
                            </div>
                          </td>

                          <td className={tableClasses.cellBase}>
                            <select
                              value={order.status || 'Processing'}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="bg-[#3a2b2b] border border-amber-500/30 text-amber-200 text-sm rounded-md px-2 py-1 outline-none hover:border-amber-500/50 transition-colors"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FiPackage className="text-6xl text-amber-300/30 mx-auto mb-4" />
              <p className="text-amber-300/70 text-xl">No orders found.</p>
              <p className="text-amber-300/50 text-sm mt-2">Orders will appear here once customers place them.</p>
              <button 
                onClick={fetchOrders}
                className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;