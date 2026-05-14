// import { useEffect, useState } from "react";

// export default function StockPage() {
//   const [gold21, setGold21] = useState(0);
//   const [cash, setCash] = useState(0);

//   const [customersDebt, setCustomersDebt] = useState(0);
//   const [yourDebt, setYourDebt] = useState(0);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   useEffect(() => {
//     const stock = JSON.parse(localStorage.getItem("stock")) || {};
//     const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setGold21(Number(stock.gold21 || 0));
//     setCash(Number(stock.cash || 0));

//     let totalCustomersDebt = 0;

//     invoices.forEach((inv) => {
//       totalCustomersDebt += Number(inv.remainingGold || 0);
//     });

//     setCustomersDebt(totalCustomersDebt);

//   }, []);

//   // حفظ تلقائي
//   useEffect(() => {
//     localStorage.setItem(
//       "stock",
//       JSON.stringify({
//         gold21,
//         cash
//       })
//     );
//   }, [gold21, cash]);

//   // الجرد
//   const myGold = gold21;
//   const net = fix(myGold + cash - customersDebt - yourDebt);

//   return (
//     <div className="app">
//       <h1>📦 الخزنة</h1>

//       <section className="card">
//         <h3>إضافة / تعديل</h3>

//         <label>دهب 21 (إضافة يدوي)</label>
//         <input
//           value={gold21}
//           onChange={(e) => setGold21(e.target.value)}
//         />

//         <label>كاش</label>
//         <input
//           value={cash}
//           onChange={(e) => setCash(e.target.value)}
//         />

//         <label>عليا دهب (لو مديونة)</label>
//         <input
//           value={yourDebt}
//           onChange={(e) => setYourDebt(e.target.value)}
//         />
//       </section>

//       <section className="card">
//         <h3>الجرد</h3>

//         <p>🟡 عندي دهب: {fix(myGold)}</p>
//         <p>💰 عندي كاش: {fix(cash)}</p>
//         <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
//         <p>📉 عليا: {fix(yourDebt)}</p>

//         <hr />

//         <h2>📊 الصافي الحقيقي: {net}</h2>
//       </section>
//     </div>
//   );
// }



















import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function StockPage() {

  const navigate = useNavigate();

  const [gold21, setGold21] = useState(0);
  const [cash, setCash] = useState(0);

  const [customersDebt, setCustomersDebt] = useState(0);
  const [yourDebt, setYourDebt] = useState(0);
  const [suppliersBalance, setSuppliersBalance] = useState(0);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {

    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = 0; // 🔥 نبدأ من صفر

    // 🏭 الموردين
    supplierRecords.forEach((r) => {
      currentGold += Number(r.totalGold21 || 0); // وارد
      currentGold -= Number(r.payGold21 || 0);   // سداد
    });

    // 🧾 الفواتير
    invoices.forEach((inv) => {
      currentGold -= Number(inv.totalWeight21 || 0); // بيع
      currentGold += Number(inv.totalPaid21 || 0);   // سداد عميل
    });

    // 💰 الكاش
    setCash(Number(stock.cash || 0));

    // 📈 العملاء (اللي ليكي)
    let totalCustomers = 0;
    invoices.forEach((inv) => {
      totalCustomers += Number(inv.remainingGold || 0);
    });
    setCustomersDebt(totalCustomers);

    // 🏭 الموردين (عليكي أو ليكي)
    let totalSuppliers = 0;
    supplierRecords.forEach((r) => {
      totalSuppliers += (Number(r.totalGold21 || 0) - Number(r.payGold21 || 0));
    });
    setSuppliersBalance(totalSuppliers);

    // 🔥 الناتج النهائي
    setGold21(currentGold);

  }, []);

  // حفظ الكاش فقط
  useEffect(() => {
    localStorage.setItem(
      "stock",
      JSON.stringify({
        gold21,
        cash
      })
    );
  }, [gold21, cash]);

  // 🔥 الجرد
  const net = fix(
    gold21 +
    cash +
    customersDebt -
    suppliersBalance -
    yourDebt
  );

  return (
    <div className="app">

      <button className="arrow" onClick={() => navigate("/")}>
        ⬅
      </button>

      <h1>📦 الخزنة</h1>

      {/* تعديل يدوي */}
      <section className="card">
        <h3>إضافة / تعديل</h3>

        <label>دهب 21</label>
        <input
          value={gold21}
          onChange={(e) => setGold21(e.target.value)}
        />

        <label>كاش</label>
        <input
          value={cash}
          onChange={(e) => setCash(e.target.value)}
        />

        <label>عليا دهب</label>
        <input
          value={yourDebt}
          onChange={(e) => setYourDebt(e.target.value)}
        />
      </section>

      {/* الجرد */}
      <section className="card">
        <h3>الجرد</h3>

        <p>🟡 عندي دهب: {fix(gold21)}</p>
        <p>💰 كاش: {fix(cash)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
        <p>🏭 حساب الموردين: {fix(suppliersBalance)}</p>
        <p>📉 عليا: {fix(yourDebt)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>
      </section>

    </div>
  );
}