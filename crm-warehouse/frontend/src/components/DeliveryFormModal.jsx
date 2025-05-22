import React, { useState, useEffect } from "react";
import "./OrderModal.css";

export default function DeliveryFormModal({ delivery, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: null,
    supplier: "",
    date: "",
    status: "",
    total: 0,
    items: [],
  });

  useEffect(() => {
    if (delivery) {
      setFormData(delivery);
    }
  }, [delivery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // Для простоты — редактирование списка товаров не реализовано, можно добавить отдельно

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!delivery) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактирование поставки #{formData.id}</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Поставщик:
            <input
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Дата:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Статус:
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Сумма:
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={(e) =>
                setFormData((f) => ({ ...f, total: Number(e.target.value) }))
              }
              required
              min={0}
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn-save">Сохранить</button>
            <button type="button" className="btn-close" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
