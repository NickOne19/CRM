import React, { useState } from "react";
import "./OrderModal.css";          /* используем те же стили overlay/modal */

export default function OrderFormModal({ order, onSave, onClose }) {
  const [form, setForm] = useState(order);

  if (!order) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);                 // отправляем отредактированный заказ
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактирование заказа #{order.id}</h2>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 12 }}>
            Клиент:
            <input
              name="client"
              value={form.client}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 4 }}
              required
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            Дата:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 4 }}
              required
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            Статус:
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: "100%", marginTop: 4 }}
            >
              <option value="В обработке">В обработке</option>
              <option value="Отгружен">Отгружен</option>
              <option value="Доставлен">Доставлен</option>
              <option value="Отменён">Отменён</option>
            </select>
          </label>

          {/* Можно добавить редактирование товаров, суммы и т.д. */}

          <button type="submit" className="btn-save" style={{ marginRight: 8 }}>
            Сохранить
          </button>
          <button type="button" onClick={onClose} className="btn-logout">
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
}
