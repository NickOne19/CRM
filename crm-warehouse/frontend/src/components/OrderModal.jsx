import React from "react";
import "./OrderModal.css";

export default function OrderModal({ order, onClose, onEdit, onDelete }) {
  if (!order) return null;

  // Чтобы клик по фону закрывал модалку, а клик по содержимому — нет
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={stopPropagation}>
        <h2>Детали заказа #{order.id}</h2>

        <p><strong>Клиент:</strong> {order.client}</p>
        <p><strong>Дата:</strong> {order.date}</p>
        <p><strong>Статус:</strong> {order.status}</p>

        <p><strong>Товары:</strong></p>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} — {item.quantity} шт.
            </li>
          ))}
        </ul>

        <div className="modal-buttons">
          <button
            className="btn-edit"
            onClick={() => {
              onEdit(order);
              onClose();
            }}
          >
            Редактировать
          </button>

          <button
            className="btn-delete"
            onClick={() => {
              if (window.confirm("Удалить этот заказ?")) {
                onDelete(order.id);
                onClose();
              }
            }}
          >
            Удалить
          </button>

          <button className="btn-close" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
