


















// import { useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// export default function SuppliersPage() {

//   const navigate = useNavigate();

//   const [suppliers, setSuppliers] = useState([]);
//   const [supplierName, setSupplierName] = useState("");
//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//   ]);

//   const [payGold21, setPayGold21] = useState("");
//   const [payWork, setPayWork] = useState("");

//   const [records, setRecords] = useState([]);

//   const fix = (num) => Number(Number(num).toFixed(2));

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

//   // تعديل صنف
//   const handleItemChange = (i, field, value) => {
//     const updated = [...items];
//     updated[i][field] = value;
//     setItems(updated);
//   };

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//   };

//   // 🔥 الحساب
//   let totalGold21 = 0;
//   let totalWork = 0;

//   items.forEach((item) => {
//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;
//     let itemWork = 0;

//     if (item.type === "piece") {
//       itemWork = count * workmanship;
//     } else {
//       itemWork = itemWeight * workmanship;
//     }

//     let weight21 = 0;

//     if (karat === 24) {
//       weight21 = (itemWeight * 999.9) / 875;
//     } else {
//       weight21 = itemWeight;
//     }

//     totalGold21 += weight21;
//     totalWork += itemWork;
//   });

//   const finalGold = fix(totalGold21 - Number(payGold21 || 0));
//   const finalWork = fix(totalWork - Number(payWork || 0));

//   // ➕ تسجيل
//   const saveRecord = () => {

//     if (!selectedSupplier) return alert("اختاري مورد");

//     const newRecord = {
//       id: Date.now(),
//       supplier_id: selectedSupplier.id,
//       items,
//       totalGold21,
//       totalWork,
//       payGold21: Number(payGold21 || 0),
//       payWork: Number(payWork || 0)
//     };

//     const updated = [...records, newRecord];
//     setRecords(updated);
//     localStorage.setItem("supplierRecords", JSON.stringify(updated));

//     // 🔥 تحديث الخزنة
//     const stock = JSON.parse(localStorage.getItem("stock")) || {};

//     let currentGold = Number(stock.gold21 || 0);

//     currentGold += totalGold21;   // وارد
//     currentGold -= Number(payGold21 || 0); // سداد

//     localStorage.setItem("stock", JSON.stringify({
//       ...stock,
//       gold21: currentGold
//     }));

//     // reset
//     setItems([
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//     setPayGold21("");
//     setPayWork("");
//   };

//   return (
//     <div className="app">

//       <button className="arrow" onClick={() => navigate("/")}>⬅</button>

//       <h1>🏭 الموردين</h1>

//       {/* إضافة مورد */}
//       <section className="card">
//         <input
//           placeholder="اسم المورد"
//           value={supplierName}
//           onChange={(e) => setSupplierName(e.target.value)}
//         />
//         <button onClick={addSupplier}>إضافة</button>
//       </section>

//       {/* الموردين */}
//       <section className="card">
//         {suppliers.map(s => (
//           <div key={s.id} onClick={() => setSelectedSupplier(s)}>
//             {s.name}
//           </div>
//         ))}
//       </section>

//       {/* الأصناف */}
//       {selectedSupplier && (
//         <section className="card">

//           <h3>{selectedSupplier.name}</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>الصنف</th>
//                 <th>عدد</th>
//                 <th>وزن</th>
//                 <th>عيار</th>
//                 <th>نوع</th>
//                 <th>مصنعية</th>
//               </tr>
//             </thead>

//             <tbody>
//               {items.map((item, i) => (
//                 <tr key={i}>
//                   <td><input onChange={(e) => handleItemChange(i, "name", e.target.value)} /></td>
//                   <td><input onChange={(e) => handleItemChange(i, "count", e.target.value)} /></td>
//                   <td><input onChange={(e) => handleItemChange(i, "weight", e.target.value)} /></td>
//                   <td>
//                     <select onChange={(e) => handleItemChange(i, "karat", Number(e.target.value))}>
//                       <option value="21">21</option>
//                       <option value="24">24</option>
//                     </select>
//                   </td>
//                   <td>
//                     <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
//                       <option value="gram">جرام</option>
//                       <option value="piece">قطعة</option>
//                     </select>
//                   </td>
//                   <td><input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} /></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button onClick={addRow}>➕ إضافة صنف</button>

//           <hr />

//           {/* السداد */}
//           <h3>السداد</h3>

//           <label>سداد دهب 21</label>
//           <input value={payGold21} onChange={(e) => setPayGold21(e.target.value)} />

//           <label>سداد مصنعية</label>
//           <input value={payWork} onChange={(e) => setPayWork(e.target.value)} />

//           <hr />

//           {/* الإجماليات */}
//           <h3>الإجماليات</h3>

//           <p>🟡 إجمالي دهب (21): {fix(totalGold21)}</p>
//           <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

//           <p>بعد السداد:</p>
//           <p>ذهب: {finalGold}</p>
//           <p>مصنعية: {finalWork}</p>

//           <button onClick={saveRecord}>💾 تسجيل</button>

//         </section>
//       )}
//     </div>
//   );
// }













// import { useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// export default function SuppliersPage() {

//   const navigate = useNavigate();

//   const [suppliers, setSuppliers] = useState([]);
//   const [supplierName, setSupplierName] = useState("");
//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//   ]);

//   const [payGold21, setPayGold21] = useState("");
//   const [payWork, setPayWork] = useState("");

//   const [records, setRecords] = useState([]);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   useEffect(() => {
//     setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
//     setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
//   }, []);

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

//   const handleItemChange = (i, field, value) => {
//     const updated = [...items];
//     updated[i][field] = value;
//     setItems(updated);
//   };

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//   };

//   let totalGold21 = 0;
//   let totalWork = 0;

//   items.forEach((item) => {
//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;
//     let itemWork = 0;

//     if (item.type === "piece") {
//       itemWork = count * workmanship;
//     } else {
//       itemWork = itemWeight * workmanship;
//     }

//     let weight21 = 0;

//     if (karat === 24) {
//       weight21 = (itemWeight * 999.9) / 875;
//     } else {
//       weight21 = itemWeight;
//     }

//     totalGold21 += weight21;
//     totalWork += itemWork;
//   });

//   const finalGold = fix(totalGold21 - Number(payGold21 || 0));
//   const finalWork = fix(totalWork - Number(payWork || 0));

//   const saveRecord = () => {

//     if (!selectedSupplier) return alert("اختاري مورد");

//     const newRecord = {
//       id: Date.now(),
//       supplier_id: selectedSupplier.id,
//       items,
//       totalGold21,
//       totalWork,
//       payGold21: Number(payGold21 || 0),
//       payWork: Number(payWork || 0)
//     };

//     const updated = [...records, newRecord];
//     setRecords(updated);
//     localStorage.setItem("supplierRecords", JSON.stringify(updated));

//     const stock = JSON.parse(localStorage.getItem("stock")) || {};

//     let currentGold = Number(stock.gold21 || 0);

//     currentGold += totalGold21;
//     currentGold -= Number(payGold21 || 0);

//     localStorage.setItem("stock", JSON.stringify({
//       ...stock,
//       gold21: currentGold
//     }));

//     setItems([
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//     setPayGold21("");
//     setPayWork("");
//   };

//   return (
//     <div className="app">

//       <button className="arrow" onClick={() => navigate("/")}>⬅</button>

//       <h1>🏭 الموردين</h1>

//       <section className="card">
//         <input
//           placeholder="اسم المورد"
//           value={supplierName}
//           onChange={(e) => setSupplierName(e.target.value)}
//         />
//         <button onClick={addSupplier}>إضافة</button>
//       </section>

//       <section className="card">
//         {suppliers.map(s => (
//           <div key={s.id} onClick={() => setSelectedSupplier(s)}>
//             {s.name}
//           </div>
//         ))}
//       </section>

//       {selectedSupplier && (
//         <section className="card">

//           <h3>{selectedSupplier.name}</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>الصنف</th>
//                 <th>عدد</th>
//                 <th>وزن</th>
//                 <th>عيار</th>
//                 <th>نوع</th>
//                 <th>مصنعية</th>
//                 <th>الإجمالي</th> {/* ✅ الجديد */}
//               </tr>
//             </thead>

//             <tbody>
//             {items.map((item, i) => {
//               const count = Number(item.count || 0);
//               const weight = Number(item.weight || 0);
//               const karat = Number(item.karat || 0);
//               const workmanship = Number(item.workmanship || 0);

//               let itemWeight = count * weight;
//               let itemWork = 0;

//               if (item.type === "piece") {
//                 itemWork = count * workmanship;
//               } else {
//                 itemWork = itemWeight * workmanship;
//               }

//               return (
//                 <tr key={i}>
//                   <td><input onChange={(e) => handleItemChange(i, "name", e.target.value)} /></td>
//                   <td><input onChange={(e) => handleItemChange(i, "count", e.target.value)} /></td>
//                   <td><input onChange={(e) => handleItemChange(i, "weight", e.target.value)} /></td>
//                   <td><input onChange={(e) => handleItemChange(i, "karat", e.target.value)} /></td>
//                   <td>
//                     <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
//                       <option value="gram">جرام</option>
//                       <option value="piece">قطعة</option>
//                     </select>
//                   </td>
//                   <td><input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} /></td>
//                   <td>
//                     وزن: {fix(itemWeight)} <br />
//                     مصنعية: {fix(itemWork)} <br />
//                     عيار: {karat === 24 ? "24" : "21"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//           </table>

//           <button onClick={addRow}>➕ إضافة صنف</button>

//           <hr />

//           <h3>السداد</h3>

//           <label>سداد دهب 21</label>
//           <input value={payGold21} onChange={(e) => setPayGold21(e.target.value)} />

//           <label>سداد مصنعية</label>
//           <input value={payWork} onChange={(e) => setPayWork(e.target.value)} />

//           <hr />

//           <h3>الإجماليات</h3>

//           <p>🟡 إجمالي دهب (21): {fix(totalGold21)}</p>
//           <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

//           <p>بعد السداد:</p>
//           <p>ذهب: {finalGold}</p>
//           <p>مصنعية: {finalWork}</p>

//           <button onClick={saveRecord}>💾 تسجيل</button>

//         </section>
//       )}
//     </div>
//   );
// }




































// import { useEffect, useState } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// export default function SuppliersPage() {

//   const navigate = useNavigate();

//   const [suppliers, setSuppliers] = useState([]);
//   const [supplierName, setSupplierName] = useState("");
//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//   ]);

//   const [payGold21, setPayGold21] = useState("");
//   const [payWork, setPayWork] = useState("");

//   const [records, setRecords] = useState([]);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   useEffect(() => {
//     setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
//     setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
//   }, []);

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

//   const handleItemChange = (i, field, value) => {
//     const updated = [...items];
//     updated[i][field] = value;
//     setItems(updated);
//   };

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//   };

//   let totalGold21 = 0;
//   let totalWork = 0;

//   items.forEach((item) => {
//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;

//     let itemWork =
//       item.type === "piece"
//         ? count * workmanship
//         : itemWeight * workmanship;

//     let weight21 = karat === 24
//       ? (itemWeight * 999.9) / 875
//       : itemWeight;

//     totalGold21 += weight21;
//     totalWork += itemWork;
//   });

//   const finalGold = fix(totalGold21 - Number(payGold21 || 0));
//   const finalWork = fix(totalWork - Number(payWork || 0));

//   const saveRecord = () => {

//     if (!selectedSupplier) return alert("اختاري مورد");

//     const newRecord = {
//       id: Date.now(),
//       supplier_id: selectedSupplier.id,
//       items,
//       totalGold21,
//       totalWork,
//       payGold21: Number(payGold21 || 0),
//       payWork: Number(payWork || 0)
//     };

//     const updated = [...records, newRecord];
//     setRecords(updated);
//     localStorage.setItem("supplierRecords", JSON.stringify(updated));

//     // ✅ تعديل الخزنة (الوارد بس)
//     const stock = JSON.parse(localStorage.getItem("stock")) || {};

//     let currentGold = Number(stock.gold21 || 0);

//     // 🔥 الوارد فقط هو اللي يزود الخزنة
//     currentGold += totalGold21;

//     localStorage.setItem("stock", JSON.stringify({
//       ...stock,
//       gold21: currentGold
//     }));

//     // reset
//     setItems([
//       { name: "", count: "", weight: "", karat: "21", workmanship: "", type: "gram" }
//     ]);
//     setPayGold21("");
//     setPayWork("");
//   };

//   return (
//     <div className="app">

//       <button className="arrow" onClick={() => navigate("/")}>⬅</button>

//       <h1>🏭 الموردين</h1>

//       <section className="card">
//         <input
//           placeholder="اسم المورد"
//           value={supplierName}
//           onChange={(e) => setSupplierName(e.target.value)}
//         />
//         <button onClick={addSupplier}>إضافة</button>
//       </section>

//       <section className="card">
//         {suppliers.map(s => (
//           <div key={s.id} onClick={() => setSelectedSupplier(s)}>
//             {s.name}
//           </div>
//         ))}
//       </section>

//       {selectedSupplier && (
//         <section className="card">

//           <h3>{selectedSupplier.name}</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>الصنف</th>
//                 <th>عدد</th>
//                 <th>وزن</th>
//                 <th>عيار</th>
//                 <th>نوع</th>
//                 <th>مصنعية</th>
//                 <th>الإجمالي</th>
//               </tr>
//             </thead>

//             <tbody>
//               {items.map((item, i) => {
//                 const count = Number(item.count || 0);
//                 const weight = Number(item.weight || 0);
//                 const karat = Number(item.karat || 0);
//                 const workmanship = Number(item.workmanship || 0);

//                 let itemWeight = count * weight;

//                 let itemWork =
//                   item.type === "piece"
//                     ? count * workmanship
//                     : itemWeight * workmanship;

//                 return (
//                   <tr key={i}>
//                     <td><input onChange={(e) => handleItemChange(i, "name", e.target.value)} /></td>
//                     <td><input onChange={(e) => handleItemChange(i, "count", e.target.value)} /></td>
//                     <td><input onChange={(e) => handleItemChange(i, "weight", e.target.value)} /></td>
//                     <td><input onChange={(e) => handleItemChange(i, "karat", e.target.value)} /></td>
//                     <td>
//                       <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
//                         <option value="gram">جرام</option>
//                         <option value="piece">قطعة</option>
//                       </select>
//                     </td>
//                     <td><input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} /></td>
//                     <td>
//                       وزن: {fix(itemWeight)} <br />
//                       مصنعية: {fix(itemWork)} <br />
//                       عيار: {karat === 24 ? "24" : "21"}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <button onClick={addRow}>➕ إضافة صنف</button>

//           <hr />

//           <h3>السداد</h3>

//           <label>سداد دهب 21</label>
//           <input value={payGold21} onChange={(e) => setPayGold21(e.target.value)} />

//           <label>سداد مصنعية</label>
//           <input value={payWork} onChange={(e) => setPayWork(e.target.value)} />

//           <hr />

//           <h3>الإجماليات</h3>

//           <p>🟡 إجمالي دهب (21): {fix(totalGold21)}</p>
//           <p>🛠️ إجمالي مصنعية: {fix(totalWork)}</p>

//           <p>بعد السداد:</p>
//           <p>ذهب: {finalGold}</p>
//           <p>مصنعية: {finalWork}</p>

//           <button onClick={saveRecord}>💾 تسجيل</button>

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

    let itemWork =
      item.type === "piece"
        ? count * workmanship
        : itemWeight * workmanship;

    let weight21 = karat === 24
      ? (itemWeight * 999.9) / 875
      : itemWeight;

    totalGold21 += weight21;
    totalWork += itemWork;
  });

  const finalGold = fix(totalGold21 - Number(payGold21 || 0));
  const finalWork = fix(totalWork - Number(payWork || 0));

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

    // ✅ تعديل الخزنة (صح)
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = Number(stock.gold21 || 0);

    // 🔥 الوارد يزود
    currentGold += totalGold21;

    // 🔥 السداد يقلل
    currentGold -= Number(payGold21 || 0);

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

      <button className="arrow" onClick={() => navigate("/")}>⬅</button>

      <h1>🏭 الموردين</h1>

      <section className="card">
        <input
          placeholder="اسم المورد"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <button onClick={addSupplier}>إضافة</button>
      </section>

      <section className="card">
        {suppliers.map(s => (
          <div key={s.id} onClick={() => setSelectedSupplier(s)}>
            {s.name}
          </div>
        ))}
      </section>

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

                let itemWork =
                  item.type === "piece"
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
                      عيار: {karat === 24 ? "24" : "21"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button ؤ onClick={addRow}>➕ إضافة صنف</button>

          <hr />

          <h3>السداد</h3>

          <label>سداد دهب 21</label>
          <input value={payGold21} onChange={(e) => setPayGold21(e.target.value)} />

          <label>سداد مصنعية</label>
          <input value={payWork} onChange={(e) => setPayWork(e.target.value)} />

          <hr />

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