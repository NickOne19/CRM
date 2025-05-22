import React from "react";

const suppliersData = [
  { id: 1, name: "ООО «Поставщик 1»", contact: "contact1@example.com", phone: "+7 999 111-22-33" },
  { id: 2, name: "ИП Иванов", contact: "ivanov@example.com", phone: "+7 999 444-55-66" },
  { id: 3, name: "ЗАО «Снабжение»", contact: "snab@example.com", phone: "+7 999 777-88-99" },
];

export default function Suppliers() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Поставщики</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={thStyle}>Название</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {suppliersData.map(({ id, name, contact, phone }) => (
            <tr key={id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{name}</td>
              <td style={tdStyle}>{contact}</td>
              <td style={tdStyle}>{phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "10px 8px",
  textAlign: "left",
};

const tdStyle = {
  padding: "8px",
};
