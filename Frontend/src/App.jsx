import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";

// Pages
import Home from "./pages/Home/Home";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import VerifyPaymentPage from "./pages/VerifyPaymentPage/VerifyPaymentPage";
import MyOrderPage from "./pages/MyOrderPage/MyOrderPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

// ONLY CHANGE: Added this import
import { AuthService } from "./services/AuthService";

/**
 * PrivateRoute Component
 * ONLY CHANGE: Now checks authToken instead of token
 */
const PrivateRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated(); // Changed from: localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to="/signup" />;
};

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />

        {/* Payment Verification callback */}
        <Route path="/myorder/verify" element={<VerifyPaymentPage />} />

        {/* Protected Private Routes */}
        <Route 
          path="/checkout" 
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/myorder" 
          element={
            <PrivateRoute>
              <MyOrderPage />
            </PrivateRoute>
          } 
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;