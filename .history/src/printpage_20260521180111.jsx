
// import { useState } from "react";

// export default function PrintPage() {
//   const [items, setItems] = useState([
//     { name: "", count: "", karat: "", weight: "", workmanship: "" },
//   ]);

//   const addRow = () => {
//     setItems([
//       ...items,
//       { name: "", count: "", karat: "", weight: "", workmanship: "" },
//     ]);
//   };

//   const updateItem = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const fix = (num) => Number(num.toFixed(2));

//   // حساب الوزن الكلي
//   const totalWeight = fix(
//     items.reduce((sum, item) => {
//       const count = Number(item.count || 0);
//       const weight = Number(item.weight || 0);
//       return sum + count * weight;
//     }, 0)
//   );

//   // حساب المصنعية
//   const totalWorkmanship = fix(
//     items.reduce((sum, item) => {
//       const count = Number(item.count || 0);
//       const weight = Number(item.weight || 0);
//       const workmanship = Number(item.workmanship || 0);

//       // لو الوزن صغير (قطعة) → المصنعية للقطعة
//       if (weight <= 1) {
//         return sum + count * workmanship;
//       }

//       // غير كده → المصنعية للجرام
//       return sum + count * weight * workmanship;
//     }, 0)
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>فاتورة أصناف</h2>

//       <table border="1" cellPadding="10" width="100%">
//         <thead>
//           <tr>
//             <th>الصنف</th>
//             <th>العدد</th>
//             <th>العيار</th>
//             <th>وزن القطعة (جرام)</th>
//             <th>المصنعية</th>
//             <th>الوزن الكلي</th>
//             <th>مصنعية الصنف</th>
//           </tr>
//         </thead>

//         <tbody>
//           {items.map((item, i) => {
//             const count = Number(item.count || 0);
//             const weight = Number(item.weight || 0);
//             const workmanship = Number(item.workmanship || 0);

//             const itemWeight = fix(count * weight);

//             let itemWorkmanship = 0;

//             if (weight <= 1) {
//               itemWorkmanship = fix(count * workmanship);
//             } else {
//               itemWorkmanship = fix(count * weight * workmanship);
//             }

//             return (
//               <tr key={i}>
//                 <td>
//                   <input
//                     value={item.name}
//                     onChange={(e) =>
//                       updateItem(i, "name", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     value={item.count}
//                     onChange={(e) =>
//                       updateItem(i, "count", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <input
//                     value={item.karat}
//                     onChange={(e) =>
//                       updateItem(i, "karat", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     value={item.weight}
//                     onChange={(e) =>
//                       updateItem(i, "weight", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     value={item.workmanship}
//                     onChange={(e) =>
//                       updateItem(i, "workmanship", e.target.value)
//                     }
//                   />
//                 </td>

//                 <td>{itemWeight}</td>
//                 <td>{itemWorkmanship}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <br />

//       <button onClick={addRow}>+ إضافة صنف</button>

//       <h3>إجمالي الوزن: {totalWeight} جرام</h3>
//       <h3>إجمالي المصنعية: {totalWorkmanship} جنيه</h3>

//       <br />

//       <button onClick={() => window.print()}>طباعة</button>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState } from "react";

// export default function PrintPage() {
//   const { state } = useLocation();

//   const {
//     customer,
//     invoices,
//     items: initialItems,
//     oldGold: initialOldGold,
//     oldWorkmanship: initialOldWorkmanship,
//     payGold: initialPayGold,
//     payWorkmanshipNow: initialPayWorkmanship
//   } = state || {};

//   if (!customer) return <h2>مفيش بيانات</h2>;

//   const [items, setItems] = useState(initialItems || []);
//   const [oldGold, setOldGold] = useState(initialOldGold || "");
//   const [oldWorkmanship, setOldWorkmanship] = useState(initialOldWorkmanship || "");
//   const [payGold, setPayGold] = useState(initialPayGold || "");
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState(initialPayWorkmanship || "");

//   const fix = (num) => Number(Number(num).toFixed(2));

//   // 🔥 الحساب
//   let totalWeight21 = 0;
//   let totalWorkmanship = 0;

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

//     // 🔥 تحويل العيارات
//     let weight21 = 0;

//     if (karat === 24) {
//       weight21 = (itemWeight * 999.9) / 875;
//     } else if (karat === 21) {
//       weight21 = itemWeight;
//     } else {
//       weight21 = (itemWeight * karat) / 875;
//     }

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   // حساب قديم
//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   // السداد القديم من الفواتير
//   let paidGold = 0;
//   let paidWork = 0;

//   (invoices || []).forEach((inv) => {
//     paidGold += Number(inv.totalPaid21 || 0);
//     paidWork +=
//       Number(inv.workmanshipTotal || 0) -
//       Number(inv.remainingWorkmanship || 0);
//   });

//   // سداد جديد
//   const totalPaidGold = paidGold + Number(payGold || 0);
//   const totalPaidWork = paidWork + Number(payWorkmanshipNow || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>اسم العميل: {customer.name}</h2>

//       <h3>الأصناف</h3>

//       <table border="1" cellPadding="10" width="100%">
//         <thead>
//           <tr>
//             <th>الصنف</th>
//             <th>عدد</th>
//             <th>وزن</th>
//             <th>عيار</th>
//             <th>نوع</th>
//             <th>مصنعية</th>
//           </tr>
//         </thead>

//         <tbody>
//           {items.map((item, i) => (
//             <tr key={i}>
//               <td>{item.name}</td>
//               <td>{item.count}</td>
//               <td>{item.weight}</td>
//               <td>{item.karat}</td>
//               <td>{item.type === "piece" ? "قطعة" : "جرام"}</td>
//               <td>{item.workmanship}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <hr />

//       <h3>حساب قديم</h3>
//       <p>وزن 21: {oldGold}</p>
//       <p>مصنعية: {oldWorkmanship}</p>

//       <hr />

//       <h3>سداد جديد</h3>
//       <p>دهب 21: {payGold}</p>
//       <p>مصنعية: {payWorkmanshipNow}</p>

//       <hr />

//       <h3>الإجماليات</h3>
//       <p>إجمالي الوزن (21): {fix(totalWeight21)}</p>
//       <p>إجمالي المصنعية: {fix(totalWorkmanship)}</p>

//       <p>المدفوع ذهب: {fix(totalPaidGold)}</p>
//       <p>المدفوع مصنعية: {fix(totalPaidWork)}</p>

//       <h3>المتبقي</h3>
//       <p>متبقي ذهب (21): {remainingGold}</p>
//       <p>متبقي مصنعية: {remainingWork}</p>

//       <br />

//       <button onClick={() => window.print()}>🖨️ طباعة</button>
//     </div>
//   );
// }















// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// export default function PrintPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const {
//     customer,
//     invoices,
//     items: initialItems,
//     oldGold: initialOldGold,
//     oldWorkmanship: initialOldWorkmanship,
//     payGold: initialPayGold,
//     payGold24: initialPayGold24,
//     payWorkmanshipNow: initialPayWorkmanship,
//     cashBack: initialCashBack,
//     barWeight: initialBarWeight,
//     barKarat: initialBarKarat,
    

//   } = state || {};
  
// const { barWorkmanship } = state || {};

//   if (!customer) return <h2>مفيش بيانات</h2>;

//   const [items] = useState(initialItems || []);
//   const [oldGold] = useState(initialOldGold || "");
//   const [oldWorkmanship] = useState(initialOldWorkmanship || "");
//   const [payGold] = useState(initialPayGold || "");
//   const [payGold24] = useState(initialPayGold24 || "");
//   const [payWorkmanshipNow] = useState(initialPayWorkmanship || "");
//   const [cashBack] = useState(initialCashBack || "");

//   const [barWeight] = useState(initialBarWeight || "");
//   const [barKarat] = useState(initialBarKarat || "");

//   const fix = (num) => Number(Number(num).toFixed(2));

//   // 🔥 حساب السبيكة
//   const barEquivalent21 =
//     (Number(barWeight || 0) * Number(barKarat || 0)) / 875;

//   // 🔥 الحساب
//   let totalWeight21 = 0;
//   let totalWorkmanship = 0;

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
//     } else if (karat === 21) {
//       weight21 = itemWeight;
//     } else {
//       weight21 = (itemWeight * karat) / 875;
//     }

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   // حساب قديم
//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   // السداد القديم
//   let paidGold = 0;
//   let paidWork = 0;

//   (invoices || []).forEach((inv) => {
//     paidGold += Number(inv.totalPaid21 || 0);
//     paidWork +=
//       Number(inv.workmanshipTotal || 0) -
//       Number(inv.remainingWorkmanship || 0);
//   });

//   // 🔥 تحويل 24 → 21
//   const payGold24_to21 =
//     (Number(payGold24 || 0) * 999.9) / 875;

//   const totalPaidGold =
//     paidGold +
//     Number(payGold || 0) +
//     payGold24_to21 +
//     barEquivalent21;

//   const totalPaidWork =
//     paidWork +
//     Number(payWorkmanshipNow || 0) +
//     Number(cashBack || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div style={{ padding: "20px" }}>
//       <div >
//   <h1> العفاريتي</h1>
//   <p className="textp">لتجارة الذهب و المجوهرات</p>
//   <button className="arrow" onClick={() => navigate("/")}>⬅</button>
 
// </div>
// <div style={{ marginBottom: "15px"  }}>
//         <h2>اسم العميل: {customer.name}</h2>
//         {/* <p>📞 رقم التليفون: {customer.phone}</p>
//         <p>📝 ملاحظات: {customer.notes}</p> */}
//       </div>

//       <h3>الأصناف</h3>

//       <table border="1" cellPadding="10" width="100%">
//         <thead>
//           <tr>
//             <th>الصنف</th>
//             <th>عدد</th>
//             <th>وزن</th>
//             <th>عيار</th>
//             <th>نوع</th>
//             <th>مصنعية</th>
//             <th>الاجمالي</th>
//           </tr>
//         </thead>

//         <tbody>
//           {items.map((item, i) => (
//             <tr key={i}>
//               <td>{item.name}</td>
//               <td>{item.count}</td>
//               <td>{item.weight}</td>
//               <td>{item.karat}</td>
//               <td>{item.type === "piece" ? "قطعة" : "جرام"}</td>
//               <td>{item.workmanship}</td>
              
              

//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <hr />

//       {/* 🔥 حساب قديم */}
//       {oldGold && <p>وزن قديم 21: {oldGold}</p>}
//       {oldWorkmanship && <p>مصنعية قديمة: {oldWorkmanship}</p>}

//       <hr />

//       <h3>سداد جديد</h3>

//       {payGold && <p>دهب (21): {payGold}</p>}
//       {payGold24 && <p>دهب 24: {payGold24}</p>}

//       {/* 🔥 السبيكة */}
//       {barWeight && <p>وزن سبيكة: {barWeight}</p>}
//       {barKarat && <p>عيار سبيكة: {barKarat}</p>}
//       {barEquivalent21 ? (
//         <p>مكافئ 21: {fix(barEquivalent21)}</p>
//       ) : null}
//       {Number(barWorkmanship) > 0 && (
//   <p>أجرة السبيكة: {fix(barWorkmanship)}</p>
// )}
//       {/* {barWorkmanship && <p>أجرة السبيكة: {fix(barWorkmanship)}</p>} */}

//       {payWorkmanshipNow && <p>مصنعية: {payWorkmanshipNow}</p>}
//       {cashBack && <p>كاش باك: {cashBack}</p>}

//       <hr />

//       <h3>الإجماليات</h3>
//       <p>إجمالي الوزن (21): {fix(totalWeight21)}</p>
//       <p>إجمالي المصنعية: {fix(totalWorkmanship)}</p>

//       <p>المدفوع ذهب (21): {fix(totalPaidGold)}</p>
//       <p>المدفوع مصنعية: {fix(totalPaidWork)}</p>

//       <h3>المتبقي</h3>
//       <p>متبقي ذهب (21): {remainingGold}</p>
//       <p>متبقي مصنعية: {remainingWork}</p>

//       <br />

//       <button className="add print-btn" onClick={() => window.print()}>🖨️ طباعة</button>
//       <div className="print-header">
//       <p>العنوان: ٣ عاطفه الهمشري -  الباب الثاني - الصاغة - القاهرة</p>
//   <p>📞whatsapp:01211014438 </p>
//   <hr />
//       </div>
//     </div>
//   );
// }








import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function PrintPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    customer,
    invoices,
    items: initialItems,
    oldGold: initialOldGold,
    oldWorkmanship: initialOldWorkmanship,
    payGold: initialPayGold,
    payGold24: initialPayGold24,
    payWorkmanshipNow: initialPayWorkmanship,
    cashBack: initialCashBack,
    barWeight: initialBarWeight,
    barKarat: initialBarKarat,
    barWorkmanship
  } = state || {};

  if (!customer) return <h2>مفيش بيانات</h2>;

  const [items] = useState(initialItems || []);
  const [oldGold] = useState(initialOldGold || "");
  const [oldWorkmanship] = useState(initialOldWorkmanship || "");
  const [payGold] = useState(initialPayGold || "");
  const [payGold24] = useState(initialPayGold24 || "");
  const [payWorkmanshipNow] = useState(initialPayWorkmanship || "");
  const [cashBack] = useState(initialCashBack || "");
  const [barWeight] = useState(initialBarWeight || "");
  const [barKarat] = useState(initialBarKarat || "");

  const fix = (num) => Number(Number(num).toFixed(2));

  // 🔥 حساب السبيكة
  const barEquivalent21 =
    (Number(barWeight || 0) * Number(barKarat || 0)) / 875;

  // 🔥 الحساب
  let totalWeight21 = 0;
  let totalWorkmanship = 0;

  items.forEach((item) => {
    const karat = Number(item.karat || 0);

    let weight21 = 0;

    if (karat === 24) weight21 = (item.itemWeight * 999.9) / 875;
    else if (karat === 21) weight21 = item.itemWeight;
    else weight21 = (item.itemWeight * karat) / 875;

    totalWeight21 += weight21;
    totalWorkmanship += item.itemWork;
  });

  // حساب قديم
  totalWeight21 += Number(oldGold || 0);
  totalWorkmanship += Number(oldWorkmanship || 0);

  // السداد القديم
  let paidGold = 0;
  let paidWork = 0;

  (invoices || []).forEach((inv) => {
    paidGold += Number(inv.totalPaid21 || 0);
    paidWork +=
      Number(inv.workmanshipTotal || 0) -
      Number(inv.remainingWorkmanship || 0);
  });

  // 🔥 تحويل 24 → 21
  const payGold24_to21 =
    (Number(payGold24 || 0) * 999.9) / 875;

  const totalPaidGold =
    paidGold +
    Number(payGold || 0) +
    payGold24_to21 +
    barEquivalent21;

  const totalPaidWork =
    paidWork +
    Number(payWorkmanshipNow || 0) +
    Number(cashBack || 0) +
    Number(barWorkmanship || 0); // ✅ مهم

  const remainingGold = fix(totalWeight21 - totalPaidGold);
  const remainingWork = fix(totalWorkmanship - totalPaidWork);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h1>العفاريتي</h1>
        <p className="textp">لتجارة الذهب و المجوهرات</p>
        <button className="arrow" onClick={() => navigate("/")}>⬅</button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <h2>اسم العميل: {customer.name}</h2>
      </div>

      <h3>الأصناف</h3>

      <table border="1" cellPadding="10" width="100%">
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
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.weight}</td>
              <td>{item.karat}</td>
              <td>{item.type === "piece" ? "قطعة" : "جرام"}</td>
              <td>{item.workmanship}</td>

              {/* ✅ الجزء المهم */}
              <td>
                وزن: {fix(item.itemWeight)} <br />
                مصنعية: {fix(item.itemWork)}
                عيار:{fix(item.i)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {oldGold && <p>وزن قديم 21: {oldGold}</p>}
      {oldWorkmanship && <p>مصنعية قديمة: {oldWorkmanship}</p>}

      <hr />

      <h3>سداد جديد</h3>

      {payGold && <p>دهب (21): {payGold}</p>}
      {payGold24 && <p>دهب 24: {payGold24}</p>}

      {barWeight && <p>وزن سبيكة: {barWeight}</p>}
      {barKarat && <p>عيار سبيكة: {barKarat}</p>}

      {barEquivalent21 ? (
        <p>مكافئ 21: {fix(barEquivalent21)}</p>
      ) : null}

      {Number(barWorkmanship) > 0 && (
        <p>أجرة السبيكة: {fix(barWorkmanship)}</p>
      )}

      {payWorkmanshipNow && <p>مصنعية: {payWorkmanshipNow}</p>}
      {cashBack && <p>كاش باك: {cashBack}</p>}

      <hr />

      <h3>الإجماليات</h3>
      <p>إجمالي الوزن (21): {fix(totalWeight21)}</p>
      <p>إجمالي المصنعية: {fix(totalWorkmanship)}</p>

      <p>المدفوع ذهب (21): {fix(totalPaidGold)}</p>
      <p>المدفوع مصنعية: {fix(totalPaidWork)}</p>

      <h3>المتبقي</h3>
      <p>متبقي ذهب (21): {remainingGold}</p>
      <p>متبقي مصنعية: {remainingWork}</p>

      <br />

      <button className="add print-btn" onClick={() => window.print()}>🖨️ طباعة</button>

      <div className="print-header">
        <p>العنوان: ٣ عاطفه الهمشري - الباب الثاني - الصاغة - القاهرة</p>
        <p>📞 whatsapp:01211014438</p>
        <hr />
      </div>
    </div>
  );
}

