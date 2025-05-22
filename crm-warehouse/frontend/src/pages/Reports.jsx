import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export default function ReportsPage() {
  const [mainTab, setMainTab] = useState("reports"); // reports или charts

  // ------------------ Данные и стейт для отчетов ------------------
  const [period, setPeriod] = useState("all"); // all, day, month, year, range
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);

  const stats = {
    totalProducts: 15,
    totalQuantity: 120,
    totalValue: 285000,
    mostExpensive: "Товар B",
    leastStock: "Товар C",
  };

  const isRangeValid = () => {
    if (!rangeStart || !rangeEnd) return false;
    return rangeStart <= rangeEnd;
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (period === "range" && !isRangeValid()) {
      alert("Дата начала должна быть меньше или равна дате конца.");
      return;
    }
    setReportGenerated(true);
    // Вызов backend можно добавить здесь
  };

  const getPeriodText = () => {
    switch (period) {
      case "day": return date ? `за день: ${date}` : "выберите день";
      case "month": return month ? `за месяц: ${month}` : "выберите месяц";
      case "year": return year ? `за год: ${year}` : "выберите год";
      case "range": return rangeStart && rangeEnd ? `за период: с ${rangeStart} по ${rangeEnd}` : "выберите период";
      case "all":
      default: return "за всё время";
    }
  };

  // ------------------ Данные и стейт для графиков ------------------
  const [activeChartTab, setActiveChartTab] = useState("stockCategories");

  const stockCategoriesData = [
    { category: "Электроника", stock: 120 },
    { category: "Одежда", stock: 80 },
    { category: "Продукты", stock: 150 },
    { category: "Хозтовары", stock: 60 },
  ];

  const incomingOutgoingData = [
    { date: "01.05", incoming: 50, outgoing: 20 },
    { date: "02.05", incoming: 40, outgoing: 30 },
    { date: "03.05", incoming: 60, outgoing: 40 },
    { date: "04.05", incoming: 30, outgoing: 50 },
  ];

  const topSellingData = [
    { name: "Товар A", sales: 120 },
    { name: "Товар B", sales: 100 },
    { name: "Товар C", sales: 90 },
    { name: "Товар D", sales: 80 },
    { name: "Товар E", sales: 75 },
    { name: "Товар F", sales: 60 },
    { name: "Товар G", sales: 50 },
    { name: "Товар H", sales: 40 },
    { name: "Товар I", sales: 35 },
    { name: "Товар J", sales: 30 },
  ];

  // Добавьте остальные данные по аналогии, если нужно

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Аналитика склада</h1>

      <nav style={{ marginBottom: 20 }}>
        <button
          onClick={() => setMainTab("reports")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            backgroundColor: mainTab === "reports" ? "#007bff" : "#eee",
            color: mainTab === "reports" ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Отчёты
        </button>
        <button
          onClick={() => setMainTab("charts")}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            backgroundColor: mainTab === "charts" ? "#007bff" : "#eee",
            color: mainTab === "charts" ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Графики
        </button>
      </nav>

      {mainTab === "reports" && (
        <>
          <form onSubmit={handleGenerateReport} style={formStyle}>
            <label>
              Период:
              <select
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  setReportGenerated(false);
                  setDate("");
                  setMonth("");
                  setYear("");
                  setRangeStart("");
                  setRangeEnd("");
                }}
                style={{ marginLeft: 5, marginRight: 20 }}
              >
                <option value="day">За день</option>
                <option value="month">За месяц</option>
                <option value="year">За год</option>
                <option value="range">За период</option>
                <option value="all">За всё время</option>
              </select>
            </label>

            {period === "day" && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={inputStyle}
              />
            )}

            {period === "month" && (
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                style={inputStyle}
              />
            )}

            {period === "year" && (
              <input
                type="number"
                min="2000"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Год"
                required
                style={{ ...inputStyle, width: 100 }}
              />
            )}

            {period === "range" && (
              <>
                <label style={{ marginLeft: 10 }}>
                  С:
                  <input
                    type="date"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    required
                    style={{ ...inputStyle, marginLeft: 5 }}
                  />
                </label>
                <label style={{ marginLeft: 10 }}>
                  По:
                  <input
                    type="date"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    required
                    style={{ ...inputStyle, marginLeft: 5 }}
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              style={{ marginLeft: 10 }}
              disabled={
                (period === "day" && !date) ||
                (period === "month" && !month) ||
                (period === "year" && !year) ||
                (period === "range" && !isRangeValid())
              }
            >
              Сформировать отчёт
            </button>
          </form>

          {reportGenerated && (
            <>
              <div style={gridStyle}>
                <ReportCard title="Всего товаров" value={stats.totalProducts} />
                <ReportCard title="Общее количество" value={stats.totalQuantity} />
                <ReportCard title="Суммарная стоимость" value={`${stats.totalValue} ₽`} />
                <ReportCard title="Самый дорогой товар" value={stats.mostExpensive} />
                <ReportCard title="Меньше всего на складе" value={stats.leastStock} />
              </div>

              <p style={{ marginTop: 30, fontStyle: "italic" }}>
                Отчёт {getPeriodText()}
              </p>
            </>
          )}
        </>
      )}

      {mainTab === "charts" && (
        <>
          <nav style={{ marginBottom: 20 }}>
            {[
              { key: "stockCategories", label: "Остатки по категориям" },
              { key: "incomingOutgoing", label: "Приход/Расход" },
              { key: "topSelling", label: "Топ-10 товаров" },
              // Добавьте другие вкладки по желанию
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveChartTab(tab.key)}
                style={{
                  marginRight: 10,
                  padding: "6px 12px",
                  backgroundColor: activeChartTab === tab.key ? "#007bff" : "#eee",
                  color: activeChartTab === tab.key ? "white" : "black",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{ width: "100%", height: 400 }}>
            {activeChartTab === "stockCategories" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stockCategoriesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChartTab === "incomingOutgoing" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={incomingOutgoingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="incoming" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="outgoing" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChartTab === "topSelling" && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topSellingData}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {topSellingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const ReportCard = ({ title, value }) => (
  <div style={{
    backgroundColor: "#f7f7f7",
    borderRadius: 6,
    padding: 15,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minWidth: 180,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  }}>
    <div style={{ color: "#555", marginBottom: 8 }}>{title}</div>
    <div>{value}</div>
  </div>
);

const formStyle = {
  marginBottom: 20,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
};

const inputStyle = {
  marginLeft: 5,
  padding: 5,
  borderRadius: 4,
  border: "1px solid #ccc",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 15,
  marginTop: 20,
};
