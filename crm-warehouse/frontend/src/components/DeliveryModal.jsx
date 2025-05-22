import React from "react";
import "./OrderModal.css";

export default function DeliveryModal({ delivery, onClose, onEdit, onDelete }) {
  if (!delivery) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Детали поставки #{delivery.id}</h2>

        <p><strong>Поставщик:</strong> {delivery.supplier}</p>
        <p><strong>Дата:</strong> {delivery.date}</p>
        <p><strong>Статус:</strong> {delivery.status}</p>

        <p><strong>Товары / материалы:</strong></p>
        <ul>
          {delivery.items.map((item, i) => (
            <li key={i}>{item.name} — {item.quantity} шт.</li>
          ))}
        </ul>

        <div className="modal-buttons">
          <button className="btn-close" onClick={onClose}>Закрыть</button>
          <button className="btn-edit" onClick={() => onEdit(delivery)}>Редактировать</button>
          <button className="btn-delete" onClick={() => onDelete(delivery.id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
