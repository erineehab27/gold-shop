




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