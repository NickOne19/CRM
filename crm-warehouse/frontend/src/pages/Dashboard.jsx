import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Главная страница (Dashboard)</h1>
      <p>Добро пожаловать в систему управления складом!</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/products" style={cardStyle}>
          <h3>📦 Товары</h3>
          <p>Просмотр, добавление, редактирование товаров.</p>
        </Link>

        <Link to="/orders" style={cardStyle}>
          <h3>📝 Заказы</h3>
          <p>Управление заказами клиентов.</p>
        </Link>

        <Link to="/supplies" style={cardStyle}>
          <h3>🚚 Поставки</h3>
          <p>Управление поставками на склад.</p>
        </Link>

        <Link to="/reports" style={cardStyle}>
          <h3>📊 Отчёты</h3>
          <p>Просмотр статистики и аналитики.</p>
        </Link>

        <Link to="/suppliers" style={cardStyle}>
          <h3>🏢 Поставщики</h3>
          <p>Управление поставщиками и контактами.</p>
        </Link>

        {/* Новая карточка сотрудников */}
        <Link to="/employees" style={cardStyle}>
          <h3>👥 Сотрудники</h3>
          <p>Просмотр и управление сотрудниками.</p>
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  textDecoration: "none",
  color: "black",
  backgroundColor: "#f9f9f9",
  transition: "0.2s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
