import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header style={{ padding: "1rem", backgroundColor: "#282c34", color: "white" }}>
        <nav>
          <Link to="/" style={{ marginRight: 10, color: "white" }}>Dashboard</Link>
          <Link to="/profile" style={{ marginRight: 10, color: "white" }}>Профиль</Link>
          {/* <Link to="/login" style={{ marginRight: 10, color: "white" }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link> */}
          <Link to="/products" style={{color:"white"}}>Товары</Link>
          <Link to="/reports" style={{ marginRight: 10, color: "white" }}>Отчёты</Link>
          <Link to="/suppliers" style={{ marginRight: 10, color: "white" }}>Поставщики</Link>
          <Link to="/employees" style={{ marginRight: 10, color: "white" }}>Сотрудники</Link>
        </nav>
      </header>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
