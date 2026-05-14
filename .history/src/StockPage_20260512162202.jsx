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

  const [supplierDebt, setSupplierDebt] = useState(0);   // 🔥 عليا
  const [supplierCredit, setSupplierCredit] = useState(0); // 🔥 ليا

  // 🔥 جدول الأصناف
  const [items, setItems] = useState([
    { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
  ]);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {

    const stock = JSON.parse(localStorage.getItem("stock")) || {};
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];

    let currentGold = Number(stock.gold21 || 0);
    let currentCash = Number(stock.cash || 0);

    setGold21(currentGold);
    setCash(currentCash);

    // 🔥 العملاء
    let totalCustomersDebt = 0;

    invoices.forEach((inv) => {
      totalCustomersDebt += Number(inv.remainingGold || 0);

      // سداد العملاء → يزود الخزنة
      currentGold += Number(inv.totalPaid21 || 0);

      // البيع → يخصم من الخزنة
      currentGold -= Number(inv.totalWeight21 || 0);
    });

    setCustomersDebt(totalCustomersDebt);

    // 🔥 الموردين (تصحيح مهم)
    let totalSuppliers = 0;

    supplierRecords.forEach((r) => {

      // وارد من المورد → يدخل الخزنة
      currentGold += Number(r.goldIn || 0);

      // ❌ السداد لا يخصم من المخزون

      totalSuppliers += Number(r.goldIn || 0) - Number(r.paidGold || 0);
    });

    // 🔥 تحديد عليا ولا ليا
    if (totalSuppliers > 0) {
      setSupplierDebt(totalSuppliers); // عليا
      setSupplierCredit(0);
    } else {
      setSupplierDebt(0);
      setSupplierCredit(Math.abs(totalSuppliers)); // ليا
    }

    setGold21(currentGold);

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

  // 🔥 تعديل الجدول
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
    ]);
  };

  // 🔥 حساب الجدول
  let totalWeight = 0;
  let totalWork = 0;
  let total21 = 0;

  items.forEach(item => {

    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const karat = Number(item.karat || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = count * weight;

    let itemWork = item.type === "piece"
      ? count * workmanship
      : itemWeight * workmanship;

    totalWeight += itemWeight;
    totalWork += itemWork;

    // 🔥 تحويل 24 → 21
    if (karat === 24) {
      total21 += (itemWeight * 999.9) / 875;
    } else {
      total21 += itemWeight;
    }
  });

  // 🔥 الجرد
  const net = fix(
    gold21 +
    cash +
    customersDebt +
    supplierCredit -
    supplierDebt -
    yourDebt
  );

  return (
    <div className="app">

      <button className="arrow" onClick={() => navigate("/")}>
        ⬅
      </button>

      <h1>📦 الخزنة</h1>

      {/* 🔥 جدول الأصناف */}
      <section className="card">
        <h3>الأصناف داخل الخزنة</h3>

        <table>
          <thead>
            <tr>
              <th>الصنف</th>
              <th>عدد</th>
              <th>وزن</th>
              <th>عيار</th>
              <th>نوع</th>
              <th>مصنعية</th>
              <th>الإجمالي</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => {
              const count = Number(item.count || 0);
              const weight = Number(item.weight || 0);
              const karat = Number(item.karat || 0);
              const workmanship = Number(item.workmanship || 0);

              let itemWeight = count * weight;
              let itemWork = item.type === "piece"
                ? count * workmanship
                : itemWeight * workmanship;

              return (
                <tr key={i}>
                  <td><input onChange={(e) => handleItemChange(i, "name", e.target.value)} /></td>
                  <td><input onChange={(e) => handleItemChange(i, "count", e.target.value)} /></td>
                  <td><input onChange={(e) => handleItemChange(i, "weight", e.target.value)} /></td>
                  <td><input onChange={(e) => handleItemChange(i, "karat", e.target.value)} /></td>
                  <td>
                    <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
                      <option value="gram">جرام</option>
                      <option value="piece">قطعة</option>
                    </select>
                  </td>
                  <td><input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} /></td>
                  <td>
                    وزن: {fix(itemWeight)} <br />
                    مصنعية: {fix(itemWork)} <br />
                    عيار: {karat}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button className="add" onClick={addRow}>➕ إضافة صنف</button>

        <p>📦 إجمالي وزن: {fix(totalWeight)}</p>
        <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>
        <p>🟡 إجمالي 21: {fix(total21)}</p>

      </section>

      {/* 🔥 التحكم */}
      <section className="card">
        <h3>إضافة / تعديل</h3>

        <label>دهب 21</label>
        <input value={gold21} onChange={(e) => setGold21(e.target.value)} />

        <label>كاش</label>
        <input value={cash} onChange={(e) => setCash(e.target.value)} />

        <label>عليا دهب</label>
        <input value={yourDebt} onChange={(e) => setYourDebt(e.target.value)} />
      </section>

      {/* 🔥 الجرد */}
      <section className="card">
        <h3>الجرد</h3>

        <p>🟡 عندي دهب: {fix(gold21)}</p>
        <p>💰 كاش: {fix(cash)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>

        <p>🏭 عليا للموردين: {fix(supplierDebt)}</p>
        <p>🏭 ليا عند الموردين: {fix(supplierCredit)}</p>

        <p>📉 عليا: {fix(yourDebt)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>
      </section>

    </div>
  );
}