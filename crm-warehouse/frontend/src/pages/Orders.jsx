import React, { useState } from "react";
import OrderModal from "../components/OrderModal";
import OrderFormModal from "../components/OrderFormModal";
import "./orders.css";

const initialOrders = [
  {
    id: 1,
    client: "ООО Ромашка",
    date: "2025-05-20",
    status: "В обработке",
    total: 15000,
    items: [
      { name: "Товар A", quantity: 2 },
      { name: "Товар B", quantity: 1 },
    ],
  },
  {
    id: 2,
    client: "ЗАО Лотос",
    date: "2025-05-21",
    status: "Отгружен",
    total: 7200,
    items: [{ name: "Товар C", quantity: 3 }],
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const handleDelete = (orderId) => {
    if (window.confirm("Удалить этот заказ?")) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setViewOrder(null);
    }
  };

  const handleSaveEdit = (updated) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
    setEditOrder(null);
    setViewOrder(null);
  };

  return (
    <div className="page-container">
      <h1>Заказы</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{order.total.toLocaleString()} ₽</td>
              <td>
                <button onClick={() => setViewOrder(order)}>Подробнее</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно просмотра */}
      <OrderModal
        order={viewOrder}
        onClose={() => setViewOrder(null)}
        onEdit={(order) => {
          setEditOrder(order);
          setViewOrder(null);
        }}
        onDelete={handleDelete}
      />

      {/* Модальное окно редактирования */}
      <OrderFormModal
        order={editOrder}
        onSave={handleSaveEdit}
        onClose={() => setEditOrder(null)}
      />
    </div>
  );
}
