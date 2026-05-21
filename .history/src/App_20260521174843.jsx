// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// export default function App() {
//   const navigate = useNavigate();

//   const [showForm, setShowForm] = useState(false);

//   // ✅ بيانات العميل manual
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [customerNotes, setCustomerNotes] = useState("");

//   const [invoices, setInvoices] = useState([]);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   const [payGold, setPayGold] = useState("");
//   const [payGold24, setPayGold24] = useState("");
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");
//   const [cashBack, setCashBack] = useState("");

//   const [barWeight, setBarWeight] = useState("");
//   const [barKarat, setBarKarat] = useState("");

//   const fix = (num) => Number(Number(num).toFixed(2));

//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//     ]);
//   };

//   let totalWeight21 = 0;
//   let totalWorkmanship = 0;

//   items.forEach((item) => {
//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;
//     let itemWork = item.type === "piece"
//       ? count * workmanship
//       : itemWeight * workmanship;

//     let weight21 = 0;

//     if (karat === 24) weight21 = (itemWeight * 999.9) / 875;
//     else if (karat === 21) weight21 = itemWeight;
//     else weight21 = (itemWeight * karat) / 875;

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;
//   const barEquivalent21 = (Number(barWeight || 0) * Number(barKarat || 0)) / 875;

//   const totalPaidGold =
//     Number(payGold || 0) +
//     payGold24_to21 +
//     barEquivalent21;

//   const totalPaidWork =
//     Number(payWorkmanshipNow || 0) +
//     Number(cashBack || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div className="app">
//       <h1>العفاريتي لتجاره الدهب و المجوهرات</h1>

//       {/* ✅ بيانات العميل */}
//       <section className="card">
//         <h2>بيانات العميل</h2>

//         <label>اسم العميل</label>
//         <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

//         <label>رقم التليفون</label>
//         <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

//         <label>ملاحظات</label>
//         <textarea value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} />
//       </section>

//       <section className="card">
//         <h2>الأصناف</h2>

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
//         </table>

//         <button className="add" onClick={addRow}>➕ إضافة صنف</button>

//         <hr />
        
//         <h3>حساب قديم</h3>
//         <label>وزن 21</label>
//         <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//         <label> مصنعيه</label>
//         <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//         <hr />

//         <h3>سداد جديد</h3>
//         <label> سداد دهب 21</label>
//         <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
//         <label>سداد دهب 24</label>
//         <input placeholder="سداد دهب 24" onChange={(e) => setPayGold24(e.target.value)} />

//         {/* 🔥 السبيكة */}
//         <label>وزن سبيكه</label>
//         <input placeholder="وزن سبيكة" onChange={(e) => setBarWeight(e.target.value)} />
//         <label>عيار سبيكه</label>
//         <input placeholder="عيار سبيكة" onChange={(e) => setBarKarat(e.target.value)} />
//         <label>مكافئ 21</label>
//         <input value={fix(barEquivalent21)} readOnly placeholder="مكافئ 21" />

//         <label>سداد مصنعيه</label>
//         <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
//         <label>كاش باك</label>
//         <input placeholder="كاش باك" onChange={(e) => setCashBack(e.target.value)} />

//         <hr />

//         <h3>الإجماليات</h3>
//         <p>وزن 21: {fix(totalWeight21)}</p>
//         <p>مصنعية: {fix(totalWorkmanship)}</p>
//         <p>مدفوع ذهب: {fix(totalPaidGold)}</p>
//         <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

//         <h3>المتبقي</h3>
//         <p>ذهب: {remainingGold}</p>
//         <p>مصنعية: {remainingWork}</p>

//         <button
//           className="add"
//           onClick={() => {

//             // 🔥 نروح للطباعة بالبيانات manual
//             navigate("/print", {
//               state: {
//                 customer: {
//                   name: customerName,
//                   phone: customerPhone,
//                   notes: customerNotes
//                 },
//                 items,
//                 oldGold,
//                 oldWorkmanship,
//                 payGold,
//                 payGold24,
//                 payWorkmanshipNow,
//                 cashBack,
//                 barWeight,
//                 barKarat
//               }
//             });

//           }}
//         >
//           🖨️ طباعة
//         </button>
//       </section>
//     </div>
//   );
// }





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// export default function App() {
//   const navigate = useNavigate();

//   const [showForm, setShowForm] = useState(false);

//   // ✅ بيانات العميل manual
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [customerNotes, setCustomerNotes] = useState("");

//   const [invoices, setInvoices] = useState([]);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   const [payGold, setPayGold] = useState("");
//   const [payGold24, setPayGold24] = useState("");
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");
//   const [cashBack, setCashBack] = useState("");

//   const [barWeight, setBarWeight] = useState("");
//   const [barKarat, setBarKarat] = useState("");

//   const fix = (num) => Number(Number(num).toFixed(2));

//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//     ]);
//   };

//   let totalWeight21 = 0;
//   let totalWorkmanship = 0;

//   items.forEach((item) => {
//     const count = Number(item.count || 0);
//     const weight = Number(item.weight || 0);
//     const karat = Number(item.karat || 0);
//     const workmanship = Number(item.workmanship || 0);

//     let itemWeight = count * weight;
//     let itemWork = item.type === "piece"
//       ? count * workmanship
//       : itemWeight * workmanship;

//     let weight21 = 0;

//     if (karat === 24) weight21 = (itemWeight * 999.9) / 875;
//     else if (karat === 21) weight21 = itemWeight;
//     else weight21 = (itemWeight * karat) / 875;

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;
//   const barEquivalent21 = (Number(barWeight || 0) * Number(barKarat || 0)) / 875;
//   const barWorkmanship = Number(barEquivalent21 || 0) * 8;

//   const totalPaidGold =
//     Number(payGold || 0) +
//     payGold24_to21 +
//     barEquivalent21;

//     const totalPaidWork =
//     Number(payWorkmanshipNow || 0) +
//     Number(cashBack || 0) +
//     barWorkmanship;

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(
//     totalWorkmanship - totalPaidWork
//   );

//   return (
//     <div className="app">
//       <h1>العفاريتي لتجاره الدهب و المجوهرات</h1>

//       {/* ✅ بيانات العميل */}
//       <section className="card">
//         <h2>بيانات العميل</h2>

//         <label>اسم العميل</label>
//         <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

//         <label>رقم التليفون</label>
//         <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

//         <label>ملاحظات</label>
//         <textarea value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} />
//       </section>

//       <section className="card">
//         <h2>الأصناف</h2>

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
//         </table>

//         <button className="add" onClick={addRow}>➕ إضافة صنف</button>

//         <hr />
        
//         <h3>حساب قديم</h3>
//         <label>وزن 21</label>
//         <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//         <label> مصنعيه</label>
//         <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//         <hr />

//         <h3>سداد جديد</h3>
//         <label> سداد دهب 21</label>
//         <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
//         <label>سداد دهب 24</label>
//         <input placeholder="سداد دهب 24" onChange={(e) => setPayGold24(e.target.value)} />

//         {/* 🔥 السبيكة */}
//         <label>وزن سبيكه</label>
//         <input placeholder="وزن سبيكة" onChange={(e) => setBarWeight(e.target.value)} />
//         <label>عيار سبيكه</label>
//         <input placeholder="عيار سبيكة" onChange={(e) => setBarKarat(e.target.value)} />
//         <label>مكافئ 21</label>
//         <input value={fix(barEquivalent21)} readOnly placeholder="مكافئ 21" />
//         <label>أجرة السبيكة</label>
// <input
//   value={fix(barWorkmanship)}
//   readOnly
//   placeholder="أجرة السبيكة"
// />

//         <label>سداد مصنعيه</label>
//         <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
//         <label>كاش باك</label>
//         <input placeholder="كاش باك" onChange={(e) => setCashBack(e.target.value)} />

//         <hr />

//         <h3>الإجماليات</h3>
//         <p>وزن (21): {fix(totalWeight21)}</p>
//         <p>مصنعية: {fix(totalWorkmanship)}</p>
//         <p>مدفوع ذهب عيار (21) : {fix(totalPaidGold)}</p>
//         <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

//         <h3>المتبقي</h3>
//         <p>ذهب عيار (21) : {remainingGold}</p>
//         <p>مصنعية: {remainingWork}</p>

//         <button
//           className="add"
//           onClick={() => {

//             // 🔥 نروح للطباعة بالبيانات manual
//             navigate("/print", {
//               state: {
//                 customer: {
//                   name: customerName,
//                   phone: customerPhone,
//                   notes: customerNotes
//                 },
//                 items,
//                 oldGold,
//                 oldWorkmanship,
//                 payGold,
//                 payGold24,
//                 payWorkmanshipNow,
//                 cashBack,
//                 barWeight,
//                 barKarat,
//                 barWorkmanship, 
//                 itemWeight, 
//               }
//             });

//           }}
//         >
//           🖨️ طباعة
//         </button>
//       </section>
//     </div>
//   );
// }












import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [items, setItems] = useState([
    { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
  ]);

  const [oldGold, setOldGold] = useState("");
  const [oldWorkmanship, setOldWorkmanship] = useState("");

  const [payGold, setPayGold] = useState("");
  const [payGold24, setPayGold24] = useState("");
  const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");
  const [cashBack, setCashBack] = useState("");

  const [barWeight, setBarWeight] = useState("");
  const [barKarat, setBarKarat] = useState("");

  const fix = (num) => Number(Number(num).toFixed(2));

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
    ]);
  };

  // 🔥 نحسب الوزن والمصنعية لكل صنف ونخزنهم
  const itemsWithTotals = items.map((item) => {
    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = count * weight;

    let itemWork =
      item.type === "piece"
        ? count * workmanship
        : itemWeight * workmanship;

    return {
      ...item,
      itemWeight,
      itemWork
    };
  });

  // 🔥 الإجماليات
  let totalWeight21 = 0;
  let totalWorkmanship = 0;

  itemsWithTotals.forEach((item) => {
    const karat = Number(item.karat || 0);

    let weight21 = 0;

    if (karat === 24) weight21 = (item.itemWeight * 999.9) / 875;
    else if (karat === 21) weight21 = item.itemWeight;
    else weight21 = (item.itemWeight * karat) / 875;

    totalWeight21 += weight21;
    totalWorkmanship += item.itemWork;
  });

  totalWeight21 += Number(oldGold || 0);
  totalWorkmanship += Number(oldWorkmanship || 0);

  const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;
  const barEquivalent21 = (Number(barWeight || 0) * Number(barKarat || 0)) / 875;
  const barWorkmanship = Number(barEquivalent21 || 0) * 8;

  const totalPaidGold =
    Number(payGold || 0) +
    payGold24_to21 +
    barEquivalent21;

  const totalPaidWork =
    Number(payWorkmanshipNow || 0) +
    Number(cashBack || 0) +
    barWorkmanship;

  const remainingGold = fix(totalWeight21 - totalPaidGold);
  const remainingWork = fix(totalWorkmanship - totalPaidWork);

  return (
    <div className="app">
      <h1>العفاريتي لتجاره الدهب و المجوهرات</h1>

      <section className="card">
        <h2>بيانات العميل</h2>

        <input placeholder="اسم العميل" onChange={(e) => setCustomerName(e.target.value)} />
        <input placeholder="رقم التليفون" onChange={(e) => setCustomerPhone(e.target.value)} />
        <textarea placeholder="ملاحظات" onChange={(e) => setCustomerNotes(e.target.value)} />
      </section>

      <section className="card">
        <h2>الأصناف</h2>

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
            {itemsWithTotals.map((item, i) => (
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
                  وزن: {fix(item.itemWeight)} <br />
                  مصنعية: {fix(item.itemWork)} <br/>
                  عيار: {karat === 24 ? "24" : "21"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add" onClick={addRow}>➕ إضافة صنف</button>

        <hr />
     
        
         <h3>حساب قديم</h3>
         <label>وزن 21</label>
         <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
         <label> مصنعيه</label>
        <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

       <hr />

         <h3>سداد جديد</h3>
         <label> سداد دهب 21</label>
         <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
         <label>سداد دهب 24</label>
        <input placeholder="سداد دهب 24" onChange={(e) => setPayGold24(e.target.value)} />

         {/* 🔥 السبيكة */}
         <label>وزن سبيكه</label>
        <input placeholder="وزن سبيكة" onChange={(e) => setBarWeight(e.target.value)} />
         <label>عيار سبيكه</label>
         <input placeholder="عيار سبيكة" onChange={(e) => setBarKarat(e.target.value)} />
         <label>مكافئ 21</label>
         <input value={fix(barEquivalent21)} readOnly placeholder="مكافئ 21" />
         <label>أجرة السبيكة</label>
 <input
  value={fix(barWorkmanship)}
  readOnly
  placeholder="أجرة السبيكة"
/>

        <label>سداد مصنعيه</label>
        <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
        <label>كاش باك</label>
        <input placeholder="كاش باك" onChange={(e) => setCashBack(e.target.value)} />

        <hr />

        <h3>الإجماليات</h3>
        <p>وزن (21): {fix(totalWeight21)}</p>
        <p>مصنعية: {fix(totalWorkmanship)}</p>
        <p>مدفوع ذهب عيار (21) : {fix(totalPaidGold)}</p>
        <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

        <h3>المتبقي</h3>
        <p>ذهب عيار (21) : {remainingGold}</p>
        <p>مصنعية: {remainingWork}</p>

        <button className="add"
          onClick={() => {
            navigate("/print", {
              state: {
                customer: {
                  name: customerName,
                  phone: customerPhone,
                  notes: customerNotes
                },
                items: itemsWithTotals,
                oldGold,
                oldWorkmanship,
                payGold,
                payGold24,
                payWorkmanshipNow,
                cashBack,
                barWeight,
                barKarat,
                barWorkmanship
              }
            });
          }}
        >
          🖨️ طباعة
        </button>
      </section>
    </div>
  );
}














