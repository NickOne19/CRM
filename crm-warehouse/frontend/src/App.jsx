import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/register";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";
import Reports from "./pages/Reports";
import Suppliers from "./pages/Suppliers";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="products" element={<ProductList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="employees" element={<Employees />} />
          <Route path="/orders" element={<Orders />} />
          {/* Добавляй другие страницы здесь */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
