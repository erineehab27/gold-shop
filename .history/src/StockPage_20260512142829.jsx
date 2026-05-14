import { useEffect, useState } from "react";

export default function StockPage() {
  const [gold21, setGold21] = useState(0);
  const [cash, setCash] = useState(0);

  const [customersDebt, setCustomersDebt] = useState(0);
  const [yourDebt, setYourDebt] = useState(0);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {
    const stock = JSON.parse(localStorage.getItem("stock")) || {};
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

    setGold21(Number(stock.gold21 || 0));
    setCash(Number(stock.cash || 0));

    let totalCustomersDebt = 0;

    invoices.forEach((inv) => {
      totalCustomersDebt += Number(inv.remainingGold || 0);
    });

    setCustomersDebt(totalCustomersDebt);

  }, []);

  // حفظ تلقائي
  useEffect(() => {
    localStorage.setItem(
      "stock",
      JSON.stringify({
        gold21,
        cash
      })
    );
  }, [gold21, cash]);

  // الجرد
  const myGold = gold21;
  const net = fix(myGold + cash - customersDebt - yourDebt);

  return (
    <div className="app">
      <h1>📦 الخزنة</h1>

      <section className="card">
        <h3>إضافة / تعديل</h3>

        <label>دهب 21 (إضافة يدوي)</label>
        <input
          value={gold21}
          onChange={(e) => setGold21(e.target.value)}
        />

        <label>كاش</label>
        <input
          value={cash}
          onChange={(e) => setCash(e.target.value)}
        />

        <label>عليا دهب (لو مديونة)</label>
        <input
          value={yourDebt}
          onChange={(e) => setYourDebt(e.target.value)}
        />
      </section>

      <section className="card">
        <h3>الجرد</h3>

        <p>🟡 عندي دهب: {fix(myGold)}</p>
        <p>💰 عندي كاش: {fix(cash)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
        <p>📉 عليا: {fix(yourDebt)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>
      </section>
    </div>
  );
}