// import { useLocation } from "react-router-dom";

// export default function PrintPage() {
//   const { state } = useLocation();
//   const { customer, invoices } = state || {};

//   if (!customer) return <h2>مفيش بيانات</h2>;

//   return (
//     <div style={{ padding: "20px", direction: "rtl" }}>
//       <h2>اسم العميل: {customer.name}</h2>

//       <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
//         <thead>
//           <tr>
//             <th>التاريخ</th>
//             <th>عدد (جرام)</th>
//             <th>ملي (متبقي دهب)</th>
//             <th>أجر (مصنعية)</th>
//             <th>متبقي أجر</th>
//           </tr>
//         </thead>

//         <tbody>
//           {invoices.map((inv) => (
//             <tr key={inv.id}>
//               <td>{inv.date}</td>

//               {/* العدد = إجمالي الذهب */}
//               <td>{inv.totalWeight21}</td>

//               {/* الملي = المتبقي ذهب */}
//               <td>{inv.remainingGold}</td>

//               {/* الأجر = المصنعية */}
//               <td>{inv.workmanshipTotal}</td>

//               {/* المتبقي أجر */}
//               <td>{inv.remainingWorkmanship}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <br />

//       <button onClick={() => window.print()}>
//         طباعة
//       </button>
//     </div>
//   );
// }











// import { useLocation } from "react-router-dom";

// export default function PrintPage() {
//   const { state } = useLocation();
//   const { customer, invoices } = state || {};

//   if (!customer) return <h2>مفيش بيانات</h2>;

//   return (
//     <div>
//       <h2>اسم العميل: {customer.name}</h2>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>إجمالي 21</th>
//             <th>مصنعية</th>
//             <th>متبقي مصنعية</th>
//             <th>مدفوع</th>
//             <th>متبقي</th>
//             <th>تاريخ</th>
//           </tr>
//         </thead>

//         <tbody>
//           {invoices.map((inv) => (
//             <tr key={inv.id}>
//               <td>{inv.totalWeight21}</td>
//               <td>{inv.workmanshipTotal}</td>
//               <td>{inv.remainingWorkmanship}</td>
//               <td>{inv.totalPaid21}</td>
//               <td>{inv.remainingGold}</td>
//               <td>{inv.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={() => window.print()}>طباعة</button>
//     </div>
//   );
// }