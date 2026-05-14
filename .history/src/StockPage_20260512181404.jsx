// import { useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// export default function StockPage() {

//   const navigate = useNavigate();

//   const [gold21, setGold21] = useState(0);
//   const [cash, setCash] = useState(0);

//   const [customersDebt, setCustomersDebt] = useState(0);
//   const [suppliersBalance, setSuppliersBalance] = useState(0);

//   // 🔥 مهم (كان ناقص)
//   const [items, setItems] = useState([]);

//   // 🔥 جدول الخزنة (manual)
//   const [manualItems, setManualItems] = useState([
//     { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//   ]);

//   const allItems = [...items, ...manualItems];

//   const fix = (num) => Number(Number(num).toFixed(2));

//   useEffect(() => {

//     const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
//     const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];
//     const stock = JSON.parse(localStorage.getItem("stock")) || {};

//     let currentGold = 0;

//     let allItemsFromSuppliers = [];

//     // 🏭 الموردين
//     supplierRecords.forEach((r) => {

//       currentGold += Number(r.totalGold21 || 0);
//       currentGold -= Number(r.payGold21 || 0);

//       if (r.items) {
//         allItemsFromSuppliers.push(...r.items);
//       }
//     });

//     // 🧾 الفواتير
//     invoices.forEach((inv) => {
//       currentGold -= Number(inv.totalWeight21 || 0);
//       currentGold += Number(inv.totalPaid21 || 0);
//     });

//     setGold21(currentGold);
//     setCash(Number(stock.cash || 0));

//     // 📈 العملاء
//     let totalCustomers = 0;
//     invoices.forEach((inv) => {
//       totalCustomers += Number(inv.remainingGold || 0);
//     });
//     setCustomersDebt(totalCustomers);

//     // 🏭 الموردين
//     let totalSuppliers = 0;
//     supplierRecords.forEach((r) => {
//       totalSuppliers += (Number(r.totalGold21 || 0) - Number(r.payGold21 || 0));
//     });
//     setSuppliersBalance(totalSuppliers);

//     // 🔥 تحميل الأصناف
//     setItems(allItemsFromSuppliers);

//   }, []);

//   // 🔥 حساب الجدول
//   let totalWeight = 0;
//   let totalWork = 0;
//   let totalGold21FromItems = 0;

//   allItems.forEach(item => {

//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;

//     let itemWork =
//       item.type === "piece"
//         ? count * workmanship
//         : itemWeight * workmanship;

//     let weight21 =
//       karat === 24
//         ? (itemWeight * 999.9) / 875
//         : itemWeight;

//     totalWeight += itemWeight;
//     totalWork += itemWork;
//     totalGold21FromItems += weight21;

//   });

//   const net = fix(
//     gold21 +
//     cash +
//     customersDebt -
//     suppliersBalance
//   );

//   const handleManualChange = (index, field, value) => {
//     const updated = [...manualItems];
//     updated[index][field] = value;
//     setManualItems(updated);
//   };

//   return (
//     <div className="app">

//       <button className="arrow" onClick={() => navigate("/")}>
//         ⬅
//       </button>

//       <h1>📦 الخزنة</h1>

//       {/* 🔥 جدول */}
//       <section className="card">

//         <h3>الأصناف داخل الخزنة</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>الصنف</th>
//               <th>عدد</th>
//               <th>وزن</th>
//               <th>عيار</th>
//               <th>نوع</th>
//               <th>مصنعية</th>
//               <th>الإجمالي</th>
//             </tr>
//           </thead>

//           <tbody>
//             {allItems.map((item, i) => {

//               const isManual = i >= items.length;

//               const count = Number(item.count || 0);
//               const weight = Number(item.weight || 0);
//               const karat = Number(item.karat || 0);
//               const workmanship = Number(item.workmanship || 0);

//               let itemWeight = count * weight;

//               let itemWork =
//                 item.type === "piece"
//                   ? count * workmanship
//                   : itemWeight * workmanship;

//               return (
//                 <tr key={i}>

//                   <td>
//                     {isManual ? (
//                       <input onChange={(e) => handleManualChange(i - items.length, "name", e.target.value)} />
//                     ) : item.name}
//                   </td>

//                   <td>
//                     {isManual ? (
//                       <input onChange={(e) => handleManualChange(i - items.length, "count", e.target.value)} />
//                     ) : count}
//                   </td>

//                   <td>
//                     {isManual ? (
//                       <input onChange={(e) => handleManualChange(i - items.length, "weight", e.target.value)} />
//                     ) : weight}
//                   </td>

//                   <td>
//                     {isManual ? (
//                       <input onChange={(e) => handleManualChange(i - items.length, "karat", e.target.value)} />
//                     ) : karat}
//                   </td>

//                   <td>
//                     {isManual ? (
//                       <select onChange={(e) => handleManualChange(i - items.length, "type", e.target.value)}>
//                         <option value="gram">جرام</option>
//                         <option value="piece">قطعة</option>
//                       </select>
//                     ) : (item.type === "piece" ? "قطعة" : "جرام")}
//                   </td>

//                   <td>
//                     {isManual ? (
//                       <input onChange={(e) => handleManualChange(i - items.length, "workmanship", e.target.value)} />
//                     ) : workmanship}
//                   </td>

//                   <td>
//                     وزن: {fix(itemWeight)} <br />
//                     مصنعية: {fix(itemWork)}
//                   </td>

//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         <button className="add" onClick={() =>
//           setManualItems([
//             ...manualItems,
//             { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//           ])
//         }>
//           ➕ إضافة صنف
//         </button>

//         <hr />

//         <p>🟡 إجمالي وزن: {fix(totalWeight)}</p>
//         <p>🟡 إجمالي دهب (21): {fix(totalGold21FromItems)}</p>
//         <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

//       </section>

//       {/* 🔥 الجرد */}
//       <section className="card">

//         <h3>الجرد</h3>

//         <p>🟡 عندي دهب: {fix(gold21)}</p>
//         <p>💰 كاش: {fix(cash)}</p>
//         <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
//         <p>🏭 عليا للموردين: {fix(suppliersBalance)}</p>

//         <hr />

//         <h2>📊 الصافي الحقيقي: {net}</h2>

//       </section>

//     </div>
//   );
// }





































import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function StockPage() {

  const navigate = useNavigate();

  const [gold21, setGold21] = useState(0);
  const [cash, setCash] = useState(0);

  const [customersDebt, setCustomersDebt] = useState(0);
  const [suppliersBalance, setSuppliersBalance] = useState(0);

  // 🔥 أصناف الموردين
  const [items, setItems] = useState([]);
  const [suppliersWorkBalance, setSuppliersWorkBalance] = useState(0);
  // 🔥 manual
  const [manualItems, setManualItems] = useState([
    { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
  ]);

  const fix = (num) => Number(Number(num).toFixed(2));

  const allItems = [...items, ...manualItems];

  useEffect(() => {

    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const supplierRecords = JSON.parse(localStorage.getItem("supplierRecords")) || [];
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = 0;
    let supplierItems = [];

    // 🏭 الموردين (الوارد فقط)
    supplierRecords.forEach((r) => {

      currentGold += Number(r.totalGold21 || 0);

      if (r.items) {
        supplierItems.push(...r.items);
      }
    });

    // 🧾 الفواتير
    invoices.forEach((inv) => {

      currentGold -= Number(inv.totalWeight21 || 0); // بيع
      currentGold += Number(inv.totalPaid21 || 0);   // سداد عميل

    });

    // 🔥 manual يتحسب
    let manualGold = 0;

    manualItems.forEach(item => {

      const count = Number(item.count || 0);
      const weight = Number(item.weight || 0);
      const karat = Number(item.karat || 0);

      let itemWeight = count * weight;

      let weight21 =
        karat === 24
          ? (itemWeight * 999.9) / 875
          : itemWeight;

      manualGold += weight21;
    });

    setGold21(currentGold + manualGold);
    setCash(Number(stock.cash || 0));

    // 📈 العملاء
    let totalCustomers = 0;
    invoices.forEach((inv) => {
      totalCustomers += Number(inv.remainingGold || 0);
    });
    setCustomersDebt(totalCustomers);

    // 🏭 عليا للموردين (الصافي)
    let totalSuppliersGold = 0;
    let totalSuppliersWork = 0;
    
    supplierRecords.forEach((r) => {
    
      // 🟡 الذهب
      totalSuppliersGold +=
        Number(r.totalGold21 || 0) - Number(r.payGold21 || 0);
    
      // 🛠️ المصنعية
      totalSuppliersWork +=
        Number(r.totalWork || 0) - Number(r.payWork || 0);
    
    });
    
    setSuppliersBalance(totalSuppliersGold);
    setSuppliersWorkBalance(totalSuppliersWork);
    setItems(supplierItems);

  }, [manualItems]);

  // 🔥 حساب الجدول
  let totalWeight = 0;
  let totalWork = 0;
  let totalGold21FromItems = 0;

  allItems.forEach(item => {

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

  return (
    <div className="app">

      <button className="arrow" onClick={() => navigate("/")}>
        ⬅
      </button>

      <h1>📦 الخزنة</h1>

      {/* 🔥 الجدول */}
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
            {allItems.map((item, i) => {

              const isManual = i >= items.length;

              const count = Number(item.count || 0);
              const weight = Number(item.weight || 0);
              const karat = Number(item.karat || 0);
              const workmanship = Number(item.workmanship || 0);

              let itemWeight = count * weight;

              let itemWork =
                item.type === "piece"
                  ? count * workmanship
                  : itemWeight * workmanship;

              return (
                <tr key={i}>

                  <td>
                    {isManual
                      ? <input onChange={(e) => handleManualChange(i - items.length, "name", e.target.value)} />
                      : item.name}
                  </td>

                  <td>
                    {isManual
                      ? <input onChange={(e) => handleManualChange(i - items.length, "count", e.target.value)} />
                      : count}
                  </td>

                  <td>
                    {isManual
                      ? <input onChange={(e) => handleManualChange(i - items.length, "weight", e.target.value)} />
                      : weight}
                  </td>

                  <td>
                    {isManual
                      ? <input onChange={(e) => handleManualChange(i - items.length, "karat", e.target.value)} />
                      : karat}
                  </td>

                  <td>
                    {isManual
                      ? (
                        <select onChange={(e) => handleManualChange(i - items.length, "type", e.target.value)}>
                          <option value="gram">جرام</option>
                          <option value="piece">قطعة</option>
                        </select>
                      )
                      : (item.type === "piece" ? "قطعة" : "جرام")}
                  </td>

                  <td>
                    {isManual
                      ? <input onChange={(e) => handleManualChange(i - items.length, "workmanship", e.target.value)} />
                      : workmanship}
                  </td>

                  <td>
                    وزن: {fix(itemWeight)} <br />
                    مصنعية: {fix(itemWork)}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          className="add"
          onClick={() =>
            setManualItems([
              ...manualItems,
              { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
            ])
          }
        >
          ➕ إضافة صنف
        </button>

        <hr />

        <p>🟡 إجمالي وزن: {fix(totalWeight)}</p>
        <p>🟡 إجمالي دهب (21): {fix(totalGold21FromItems)}</p>
        <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

      </section>

      {/* 🔥 الجرد */}
      <section className="card">

        <h3>الجرد</h3>

        <p>🟡  عندي دهب: {fix(gold21)}</p>
        <p>📈 ليا عند العملاء: {fix(customersDebt)}</p>
        <p>🏭 عليا للموردين (ذهب): {fix(suppliersBalance)}</p>
<p>🛠️ عليا مصنعية للموردين: {fix(suppliersWorkBalance)}</p>

        <hr />

        <h2>📊 الصافي الحقيقي: {net}</h2>

      </section>

    </div>
  );
}