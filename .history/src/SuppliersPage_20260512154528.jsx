// import { useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// export default function SuppliersPage() {

//   const [suppliers, setSuppliers] = useState([]);
//   const [supplierName, setSupplierName] = useState("");
//   const navigate = useNavigate();

//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const [goldIn, setGoldIn] = useState(""); // وارد
//   const [workmanship, setWorkmanship] = useState(""); // مصنعية
//   const [paidGold, setPaidGold] = useState(""); // سداد

//   const [records, setRecords] = useState([]);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   // تحميل البيانات
//   useEffect(() => {
//     setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
//     setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
//   }, []);

//   // ➕ إضافة مورد
//   const addSupplier = () => {
//     if (!supplierName) return;

//     const newSupplier = {
//       id: Date.now(),
//       name: supplierName
//     };

//     const updated = [...suppliers, newSupplier];

//     setSuppliers(updated);
//     localStorage.setItem("suppliers", JSON.stringify(updated));

//     setSupplierName("");
//   };

//   // ➕ تسجيل حركة (توريد / سداد)
//   const addRecord = () => {

//     if (!selectedSupplier) return alert("اختاري مورد");

//     const newRecord = {
//       id: Date.now(),
//       supplier_id: selectedSupplier.id,
//       goldIn: Number(goldIn || 0),           // دهب داخل
//       workmanship: Number(workmanship || 0), // مصنعية
//       paidGold: Number(paidGold || 0)        // سداد
//     };

//     const updated = [...records, newRecord];

//     setRecords(updated);
//     localStorage.setItem("supplierRecords", JSON.stringify(updated));

//     // 🔥 تحديث الخزنة تلقائي
//     const stock = JSON.parse(localStorage.getItem("stock")) || {};

//     let currentGold = Number(stock.gold21 || 0);

//     // وارد → تزود
//     currentGold += Number(goldIn || 0);

//     // سداد → يقلل
//     currentGold -= Number(paidGold || 0);

//     localStorage.setItem("stock", JSON.stringify({
//       ...stock,
//       gold21: currentGold
//     }));

//     // reset
//     setGoldIn("");
//     setWorkmanship("");
//     setPaidGold("");
//   };

//   // 🧮 الحساب
//   let totalGoldIn = 0;
//   let totalPaid = 0;
//   let totalWork = 0;

//   records
//     .filter(r => r.supplier_id === selectedSupplier?.id)
//     .forEach(r => {
//       totalGoldIn += r.goldIn;
//       totalPaid += r.paidGold;
//       totalWork += r.workmanship;
//     });

//   const remaining = fix(totalGoldIn - totalPaid); // عليكي أو ليكي

//   return (
//     <div className="app">
//        <button className="arrow" onClick={() => navigate("/")}>
//       ⬅
//     </button>
//       <h1>🏭 الموردين</h1>

//       {/* إضافة مورد */}
//       <section className="card">
//         <h3>إضافة مورد</h3>

//         <input
//           placeholder="اسم المورد"
//           value={supplierName}
//           onChange={(e) => setSupplierName(e.target.value)}
//         />

//         <button onClick={addSupplier}>إضافة</button>
//       </section>

//       {/* اختيار مورد */}
//       <section className="card">
//         <h3>الموردين</h3>

//         {suppliers.map(s => (
//           <div
//             key={s.id}
//             onClick={() => setSelectedSupplier(s)}
//             style={{ cursor: "pointer", padding: "5px" }}
//           >
//             {s.name}
//           </div>
//         ))}
//       </section>

//       {/* بيانات المورد */}
//       {selectedSupplier && (
//         <section className="card">
//           <h3>{selectedSupplier.name}</h3>

//           <label>دهب وارد</label>
//           <input
//             value={goldIn}
//             onChange={(e) => setGoldIn(e.target.value)}
//           />

//           <label>مصنعية</label>
//           <input
//             value={workmanship}
//             onChange={(e) => setWorkmanship(e.target.value)}
//           />

//           <label>سداد</label>
//           <input
//             value={paidGold}
//             onChange={(e) => setPaidGold(e.target.value)}
//           />

//           <button onClick={addRecord}>تسجيل</button>

//           <hr />

//           <h3>الحساب</h3>

//           <p>📥 إجمالي وارد: {fix(totalGoldIn)}</p>
//           <p>💰 مدفوع: {fix(totalPaid)}</p>
//           <p>🛠️ مصنعية: {fix(totalWork)}</p>

//           <h2>
//             {remaining > 0
//               ? `📉 عليكي للمورد: ${remaining}`
//               : `📈 ليكي عند المورد: ${fix(Math.abs(remaining))}`}
//           </h2>
//         </section>
//       )}
//     </div>
//   );
// }




























import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function SuppliersPage() {

  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [items, setItems] = useState([
    { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
  ]);

  const [payGold21, setPayGold21] = useState("");
  const [payWork, setPayWork] = useState("");

  const [records, setRecords] = useState([]);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {
    setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
    setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
  }, []);

  // ➕ إضافة مورد
  const addSupplier = () => {
    if (!supplierName) return;

    const newSupplier = {
      id: Date.now(),
      name: supplierName
    };

    const updated = [...suppliers, newSupplier];

    setSuppliers(updated);
    localStorage.setItem("suppliers", JSON.stringify(updated));

    setSupplierName("");
  };

  // تعديل صنف
  const handleItemChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
    ]);
  };

  // 🔥 الحساب
  let totalGold21 = 0;
  let totalWork = 0;

  items.forEach((item) => {
    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const karat = Number(item.karat || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = count * weight;
    let itemWork = 0;

    if (item.type === "piece") {
      itemWork = count * workmanship;
    } else {
      itemWork = itemWeight * workmanship;
    }

    let weight21 = 0;

    if (karat === 24) {
      weight21 = (itemWeight * 999.9) / 875;
    } else {
      weight21 = itemWeight;
    }

    totalGold21 += weight21;
    totalWork += itemWork;
  });

  const finalGold = fix(totalGold21 - Number(payGold21 || 0));
  const finalWork = fix(totalWork - Number(payWork || 0));

  // ➕ تسجيل
  const saveRecord = () => {

    if (!selectedSupplier) return alert("اختاري مورد");

    const newRecord = {
      id: Date.now(),
      supplier_id: selectedSupplier.id,
      items,
      totalGold21,
      totalWork,
      payGold21: Number(payGold21 || 0),
      payWork: Number(payWork || 0)
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem("supplierRecords", JSON.stringify(updated));

    // 🔥 تحديث الخزنة
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = Number(stock.gold21 || 0);

    currentGold += totalGold21;   // وارد
    currentGold -= Number(payGold21 || 0); // سداد

    localStorage.setItem("stock", JSON.stringify({
      ...stock,
      gold21: currentGold
    }));

    // reset
    setItems([
      { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
    ]);
    setPayGold21("");
    setPayWork("");
  };

  return (
    <div className="app">

      <button onClick={() => navigate("/")}>⬅</button>

      <h1>🏭 الموردين</h1>

      {/* إضافة مورد */}
      <section className="card">
        <input
          placeholder="اسم المورد"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <button onClick={addSupplier}>إضافة</button>
      </section>

      {/* الموردين */}
      <section className="card">
        {suppliers.map(s => (
          <div key={s.id} onClick={() => setSelectedSupplier(s)}>
            {s.name}
          </div>
        ))}
      </section>

      {/* الأصناف */}
      {selectedSupplier && (
        <section className="card">

          <h3>{selectedSupplier.name}</h3>

          <table>
            <thead>
              <tr>
                <th>الصنف</th>
                <th>عدد</th>
                <th>وزن</th>
                <th>عيار</th>
                <th>نوع</th>
                <th>مصنعية</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td><input onChange={(e) => handleItemChange(i, "name", e.target.value)} /></td>
                  <td><input onChange={(e) => handleItemChange(i, "count", e.target.value)} /></td>
                  <td><input onChange={(e) => handleItemChange(i, "weight", e.target.value)} /></td>
                  <td>
                    <select onChange={(e) => handleItemChange(i, "karat", Number(e.target.value))}>
                      <option value="21">21</option>
                      <option value="24">24</option>
                    </select>
                  </td>
                  <td>
                    <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
                      <option value="gram">جرام</option>
                      <option value="piece">قطعة</option>
                    </select>
                  </td>
                  <td><input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addRow}>➕ إضافة صنف</button>

          <hr />

          {/* السداد */}
          <h3>السداد</h3>

          <label>سداد دهب 21</label>
          <input value={payGold21} onChange={(e) => setPayGold21(e.target.value)} />

          <label>سداد مصنعية</label>
          <input value={payWork} onChange={(e) => setPayWork(e.target.value)} />

          <hr />

          {/* الإجماليات */}
          <h3>الإجماليات</h3>

          <p>🟡 إجمالي دهب (21): {fix(totalGold21)}</p>
          <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

          <p>بعد السداد:</p>
          <p>ذهب: {finalGold}</p>
          <p>مصنعية: {finalWork}</p>

          <button onClick={saveRecord}>💾 تسجيل</button>

        </section>
      )}
    </div>
  );
}