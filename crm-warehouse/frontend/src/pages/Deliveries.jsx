import React, { useState } from "react";
import DeliveryModal from "../components/DeliveryModal";
import DeliveryFormModal from "../components/DeliveryFormModal";
import "./Deliveries.css";

const initialDeliveries = [
  {
    id: 1,
    supplier: "ООО Ромашка",
    date: "2025-05-18",
    status: "В пути",
    total: 23000,
    items: [
      { name: "Материал A", quantity: 10 },
      { name: "Материал B", quantity: 5 },
    ],
  },
  {
    id: 2,
    supplier: "ЗАО Лотос",
    date: "2025-05-19",
    status: "Получена",
    total: 18000,
    items: [{ name: "Материал C", quantity: 7 }],
  },
];

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [viewDelivery, setViewDelivery] = useState(null);
  const [editDelivery, setEditDelivery] = useState(null);

  const handleDelete = (deliveryId) => {
    if (window.confirm("Удалить эту доставку?")) {
      setDeliveries((prev) => prev.filter((d) => d.id !== deliveryId));
      setViewDelivery(null);
    }
  };

  const handleSaveEdit = (updated) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
    setEditDelivery(null);
    setViewDelivery(null);
  };

  return (
    <div className="page-container">
      <h1>Поставки</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Поставщик</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>{delivery.supplier}</td>
              <td>{delivery.date}</td>
              <td>{delivery.status}</td>
              <td>{delivery.total.toLocaleString()} ₽</td>
              <td>
                <button onClick={() => setViewDelivery(delivery)}>Подробнее</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно просмотра */}
      <DeliveryModal
        delivery={viewDelivery}
        onClose={() => setViewDelivery(null)}
        onEdit={(delivery) => {
          setEditDelivery(delivery);
          setViewDelivery(null);
        }}
        onDelete={handleDelete}
      />

      {/* Модальное окно редактирования */}
      <DeliveryFormModal
        delivery={editDelivery}
        onSave={handleSaveEdit}
        onClose={() => setEditDelivery(null)}
      />
    </div>
  );
}
