import React from "react";

export default function Employees() {
  const staff = [
    { id: 1, name: "Иван Иванов", position: "Менеджер" },
    { id: 2, name: "Ольга Смирнова", position: "Бухгалтер" },
    { id: 3, name: "Пётр Кузнецов", position: "Программист" },
  ];

  return (
    <div>
      <h2>Сотрудники</h2>
      <ul>
        {staff.map((emp) => (
          <li key={emp.id}>
            {emp.name} — {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
