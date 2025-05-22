import React, { useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: "Товар A", price: 1000, quantity: 5, location: "Стеллаж 1" },
    { id: 2, name: "Товар B", price: 2500, quantity: 3, location: "Полка 2" },
    { id: 3, name: "Товар C", price: 800, quantity: 10, location: "Ячейка 5" },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "", location: "" });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: "", quantity: "", location: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeNew = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const productToAdd = {
      id,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity, 10),
      location: newProduct.location,
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", price: "", quantity: "", location: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((prod) => prod.id !== id));
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      location: product.location,
    });
  };

  const handleChangeEdit = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = (id) => {
    setProducts(
      products.map((prod) =>
        prod.id === id
          ? {
              ...prod,
              name: editProduct.name,
              price: parseFloat(editProduct.price),
              quantity: parseInt(editProduct.quantity, 10),
              location: editProduct.location,
            }
          : prod
      )
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const filteredProducts = products.filter((prod) => {
    const search = searchQuery.toLowerCase();
    return (
      prod.name.toLowerCase().includes(search) ||
      prod.price.toString().toLowerCase().includes(search) ||
      prod.quantity.toString().toLowerCase().includes(search) ||
      prod.location.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h2>Список товаров</h2>

      <input
        type="text"
        placeholder="Поиск по всем полям..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%", padding: "8px" }}
      />

      <form onSubmit={handleAddProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Название"
          value={newProduct.name}
          onChange={handleChangeNew}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={newProduct.price}
          onChange={handleChangeNew}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Количество"
          value={newProduct.quantity}
          onChange={handleChangeNew}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="location"
          placeholder="Местоположение"
          value={newProduct.location}
          onChange={handleChangeNew}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Добавить товар</button>
      </form>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Название</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Цена</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Количество</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Местоположение</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((prod) => (
            <tr key={prod.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{prod.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editingId === prod.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editProduct.name}
                    onChange={handleChangeEdit}
                  />
                ) : (
                  prod.name
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editingId === prod.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleChangeEdit}
                  />
                ) : (
                  prod.price
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editingId === prod.id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editProduct.quantity}
                    onChange={handleChangeEdit}
                  />
                ) : (
                  prod.quantity
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editingId === prod.id ? (
                  <input
                    type="text"
                    name="location"
                    value={editProduct.location}
                    onChange={handleChangeEdit}
                  />
                ) : (
                  prod.location
                )}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {editingId === prod.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(prod.id)}>Сохранить</button>
                    <button onClick={handleCancelEdit} style={{ marginLeft: "5px" }}>
                      Отмена
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(prod)}>Редактировать</button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      style={{ marginLeft: "5px", color: "red" }}
                    >
                      Удалить
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
