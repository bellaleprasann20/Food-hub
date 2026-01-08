import React from "react";  
import { Routes, Route } from "react-router-dom"; // Added Route here
import AddItem from "./components/AddItems.jsx";
import List from "./components/List.jsx";
import Order from "./components/Order.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const url = import.meta.env.VITE_BASE_URL;
  return (
    <> 
      <Navbar />
      <Routes>
        {/* Changed <Routes> to <Route> for the individual paths */}
        <Route path="/" element={<AddItem />} /> 
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;