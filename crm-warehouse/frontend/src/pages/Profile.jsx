import React, { useState } from "react";

export default function Profile({ onLogout }) {
  const [name, setName] = useState("Иван Иванов");
  const [email, setEmail] = useState("ivan@example.com");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Имя не может быть пустым";
    if (!email.trim()) errs.email = "Email обязателен";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Неверный формат email";
    return errs;
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // TODO: отправка данных на сервер
      console.log("Сохранено:", { name, email, avatar });
      alert("Изменения сохранены");
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: 30,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      borderRadius: 12,
      backgroundColor: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Профиль пользователя</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src={avatarPreview || "https://via.placeholder.com/100"}
          alt="avatar"
          style={{ borderRadius: "50%", width: 100, height: 100, objectFit: "cover" }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 5, border: errors.name ? "1px solid red" : "1px solid #ccc" }}
            />
          </label>
          {errors.name && <div style={{ color: "red", fontSize: 12 }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 5, borderRadius: 5, border: errors.email ? "1px solid red" : "1px solid #ccc" }}
            />
          </label>
          {errors.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>
            Аватар:
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "block", marginTop: 5, cursor: "pointer" }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Сохранить
        </button>
      </form>

      <button
        onClick={onLogout}
        style={{
          marginTop: 20,
          width: "100%",
          padding: "12px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 16,
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
      >
        Выйти из системы
      </button>
    </div>
  );
}