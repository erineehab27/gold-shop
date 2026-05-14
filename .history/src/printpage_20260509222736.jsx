
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


import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function PrintPage() {
  const { state } = useLocation();
  const { customer, invoices } = state || {};

  const [items, setItems] = useState([
    { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
  ]);

  const [oldGold, setOldGold] = useState("");
  const [oldWorkmanship, setOldWorkmanship] = useState("");

  if (!customer) return <h2>مفيش بيانات</h2>;

  const fix = (num) => Number(Number(num).toFixed(2));

  const to21 = (w, k) => fix((w * k) / 875);

  const handleChange = (index, field, value) => {
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

  // الحساب
  let totalWeight21 = 0;
  let totalWorkmanship = 0;

  items.forEach((item) => {
    const count = Number(item.count || 0);
    const weight = Number(item.weight || 0);
    const karat = Number(item.karat || 0);
    const workmanship = Number(item.workmanship || 0);

    let itemWeight = 0;
    let itemWork = 0;

    if (item.type === "piece") {
      itemWeight = count * weight;
      itemWork = count * workmanship;
    } else {
      itemWeight = count * weight;
      itemWork = itemWeight * workmanship;
    }

    const weight21 = to21(itemWeight, karat);

    totalWeight21 += weight21;
    totalWorkmanship += itemWork;
  });

  // إضافة الحساب القديم
  totalWeight21 += Number(oldGold || 0);
  totalWorkmanship += Number(oldWorkmanship || 0);

  // إضافة الفواتير (السدادات)
  let paidGold = 0;
  let paidWork = 0;

  invoices.forEach((inv) => {
    paidGold += Number(inv.totalPaid21 || 0);
    paidWork += Number(inv.workmanshipTotal || 0) - Number(inv.remainingWorkmanship || 0);
  });

  const remainingGold = fix(totalWeight21 - paidGold);
  const remainingWork = fix(totalWorkmanship - paidWork);

  return (
    <div>
      <h2>اسم العميل: {customer.name}</h2>

      <h3>الأصناف</h3>

      <table border="1" cellPadding="10">
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
              <td>
                <input onChange={(e) => handleChange(i, "name", e.target.value)} />
              </td>

              <td>
                <input onChange={(e) => handleChange(i, "count", e.target.value)} />
              </td>

              <td>
                <input onChange={(e) => handleChange(i, "weight", e.target.value)} />
              </td>

              <td>
                <input onChange={(e) => handleChange(i, "karat", e.target.value)} />
              </td>

              <td>
                <select onChange={(e) => handleChange(i, "type", e.target.value)}>
                  <option value="gram">جرام</option>
                  <option value="piece">قطعة</option>
                </select>
              </td>

              <td>
                <input onChange={(e) => handleChange(i, "workmanship", e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>➕ إضافة صنف</button>

      <hr />

      <h3>حساب قديم</h3>

      <label>وزن 21 متبقي</label>
      <input onChange={(e) => setOldGold(e.target.value)} />

      <label>مصنعية متبقية</label>
      <input onChange={(e) => setOldWorkmanship(e.target.value)} />

      <hr />

      <h3>الإجماليات</h3>

      <p>إجمالي الوزن (21): {fix(totalWeight21)}</p>
      <p>إجمالي المصنعية: {fix(totalWorkmanship)}</p>

      <p>المدفوع ذهب: {fix(paidGold)}</p>
      <p>المدفوع مصنعية: {fix(paidWork)}</p>

      <h3>المتبقي</h3>

      <p>متبقي ذهب (21): {remainingGold}</p>
      <p>متبقي مصنعية: {remainingWork}</p>

      <button onClick={() => window.print()}>🖨️ طباعة</button>
    </div>
  );
}






