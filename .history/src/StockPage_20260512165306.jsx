import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function StockPage() {

  const navigate = useNavigate();

  const [gold21, setGold21] = useState(0);
  const [cash, setCash] = useState(0);

  const [customersDebt, setCustomersDebt] = useState(0);
  const [suppliersDebt, setSuppliersDebt] = useState(0);
  const [suppliersCredit, setSuppliersCredit] = useState(0);

  const [items, setItems] = useState([]);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {

    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = 0;
    let allItems = [];

    // 🏭 الموردين
    let totalDebt = 0;
    let totalCredit = 0;

    supplierRecords.forEach((r) => {

      // ✔️ الوارد يزود
      currentGold += Number(r.totalGold21 || 0);

      // ✔️ السداد يخصم
      currentGold -= Number(r.payGold21 || 0);

      // حساب عليكي / ليكي
      let remain = Number(r.totalGold21 || 0) - Number(r.payGold21 || 0);

      if (remain > 0) {
        totalDebt += remain; // عليكي
      } else {
        totalCredit += Math.abs(remain); // ليكي
      }

      // 🔥 الأصناف
      if (r.items) {
        allItems.push(...r.items);
      }
    });

    setSuppliersDebt(totalDebt);
    setSuppliersCredit(totalCredit);

    // 🧾 الفواتير
    let totalCustomers = 0;

    invoices.forEach((inv) => {

      // ✔️ البيع يخصم
      currentGold -= Number(inv.totalWeight21 || 0);

      // ✔️ سداد العميل يزود
      currentGold += Number(inv.totalPaid21 || 0);

      totalCustomers += Number(inv.remainingGold || 0);

      // 🔥 الأصناف
      if (inv.items) {
        allItems.push(...inv.items);
      }
    });

    setCustomersDebt(totalCustomers);

    setItems(allItems);

    setCash(Number(stock.cash || 0));

    setGold21(currentGold);

  }, []);

  // 🧮 حساب جدول الأصناف
  let totalWeight = 0;
  let totalWork = 0;

  items.forEach(item => {

    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = count * weight;

    let itemWork =
      item.type === "piece"
        ? count * workmanship
        : itemWeight * workmanship;

    totalWeight += itemWeight;
    totalWork += itemWork;
  });

  const net = fix(
    gold21 +
    cash +
    customersDebt +
    suppliersCredit -
    suppliersDebt
  );

  return (
    <div className="app">

      <button className="arrow" onClick={() => navigate("/")}>
        ⬅
      </button>

      <h1>📦 الخزنة</h1>

      {/* 🔥 جدول زي الموردين */}
      <section className="card">
        <h3>الأصناف</h3>

        

        <p>🟡 إجمالي الوزن: {fix(totalWeight)}</p>
        <p>🛠️ إجمالي المصنعية: {fix(totalWork)}</p>
      </section>

      {/* 🔥 الجرد */}
      <section className="card">
        <h3>الجرد</h3>

        <p>🟡 عندي دهب: {fix(gold21)}</p>
        <p>💰 كاش: {fix(cash)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>

        <p>📉 عليا للموردين: {fix(suppliersDebt)}</p>
        <p>📈 ليا عند الموردين: {fix(suppliersCredit)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>
      </section>

    </div>
  );
}