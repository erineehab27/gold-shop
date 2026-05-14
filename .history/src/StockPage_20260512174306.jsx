import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function StockPage() {

  const navigate = useNavigate();

  const [gold21, setGold21] = useState(0);
  const [cash, setCash] = useState(0);

  const [customersDebt, setCustomersDebt] = useState(0);
  const [suppliersBalance, setSuppliersBalance] = useState(0);

  // 🔥 جدول الخزنة
  const [manualItems, setManualItems] = useState([
    { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
  ]);
  const allItems = [...items, ...manualItems];

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {

    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = 0;

    let allItems = [];

    // 🏭 الموردين (الوارد)
    supplierRecords.forEach((r) => {

      currentGold += Number(r.totalGold21 || 0);
      currentGold -= Number(r.payGold21 || 0);

      // 🔥 خد الأصناف
      if (r.items) {
        allItems.push(...r.items);
      }
    });

    // 🧾 الفواتير (البيع)
    invoices.forEach((inv) => {

      currentGold -= Number(inv.totalWeight21 || 0);
      currentGold += Number(inv.totalPaid21 || 0);

    });

    setGold21(currentGold);
    setCash(Number(stock.cash || 0));

    // 📈 العملاء
    let totalCustomers = 0;
    invoices.forEach((inv) => {
      totalCustomers += Number(inv.remainingGold || 0);
    });
    setCustomersDebt(totalCustomers);

    // 🏭 الموردين (عليكي)
    let totalSuppliers = 0;
    supplierRecords.forEach((r) => {
      totalSuppliers += (Number(r.totalGold21 || 0) - Number(r.payGold21 || 0));
    });
    setSuppliersBalance(totalSuppliers);

    // 🔥 حط الأصناف في الخزنة
    setItems(allItems);

  }, []);

  // 🔥 حساب الجدول (زي الموردين)
  let totalWeight = 0;
  let totalWork = 0;
  let totalGold21FromItems = 0;

  items.forEach(item => {

    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const karat = Number(item.karat || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = count * weight;

    let itemWork =
      item.type === "piece"
        ? count * workmanship
        : itemWeight * workmanship;

    let weight21 =
      karat === 24
        ? (itemWeight * 999.9) / 875
        : itemWeight;

    totalWeight += itemWeight;
    totalWork += itemWork;
    totalGold21FromItems += weight21;

  });

  const net = fix(
    gold21 +
    cash +
    customersDebt -
    suppliersBalance
  );
  const handleManualChange = (index, field, value) => {
    const updated = [...manualItems];
    updated[index][field] = value;
    setManualItems(updated);
  };
  const addRow = () => {
    setItems([
      ...items,
      { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
    ]);
  };
  return (
    <div className="app">

      <button className="arrow" onClick={() => navigate("/")}>
        ⬅
      </button>

      <h1>📦 الخزنة</h1>

      {/* 🔥 جدول الأصناف */}
      <section className="card">

        <h3>الأصناف داخل الخزنة</h3>
        

    
        
        <button className="add" onClick={addRow}>➕ إضافة صنف</button>
        <hr />

        <p>🟡 إجمالي وزن: {fix(totalWeight)}</p>
        <p>🟡 إجمالي دهب (21): {fix(totalGold21FromItems)}</p>
        <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>
        

      </section>

      {/* 🔥 الجرد */}
      <section className="card">

        <h3>الجرد</h3>

        <p>🟡 عندي دهب: {fix(gold21)}</p>
        <p>💰 كاش: {fix(cash)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
        <p>🏭 عليا للموردين: {fix(suppliersBalance)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>

      </section>

    </div>
  );
}