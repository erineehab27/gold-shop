

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// export default function App() {
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   const [payGold, setPayGold] = useState("");
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   const addCustomer = (e) => {
//     e.preventDefault();
//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = { id: Date.now(), ...customerForm };
//     const updated = [...customers, newCustomer];

//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });
//     alert("تم حفظ العميل ✅");
//   };

//   const handleSearch = (value) => {
//     setSearch(value);
//     const all = JSON.parse(localStorage.getItem("customers")) || [];

//     if (!value) return setCustomers(all);

//     const filtered = all.filter(
//       (c) =>
//         c.name.includes(value) ||
//         c.phone.includes(value) ||
//         String(c.id).includes(value)
//     );

//     setCustomers(filtered);
//   };

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

//   // 🔥 الإجماليات (المعدلة فقط)
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

//     // 🔥 التحويل الصح (هنا بس)
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

//   // السداد
//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   let paidGold = 0;
//   let paidWork = 0;

//   customerInvoices.forEach((inv) => {
//     paidGold += Number(inv.totalPaid21 || 0);
//     paidWork +=
//       Number(inv.workmanshipTotal || 0) -
//       Number(inv.remainingWorkmanship || 0);
//   });

//   const totalPaidGold = paidGold + Number(payGold || 0);
//   const totalPaidWork = paidWork + Number(payWorkmanshipNow || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* الشمال */}
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <label>اسم العميل</label>
//             <input
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <label>رقم التليفون</label>
//             <input
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <label>ملاحظات</label>
//             <textarea
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <label>بحث</label>
//           <input value={search} onChange={(e) => handleSearch(e.target.value)} />

//           <div className="list">
//             {customers.map((c) => (
//               <div
//                 key={c.id}
//                 className="customer"
//                 onClick={() => setSelectedCustomer(c)}
//               >
//                 <strong>#{c.id} - {c.name}</strong>
//                 <span>{c.phone}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* اليمين */}
//         <section className="card">
//           <h2>الأصناف</h2>

//           {selectedCustomer && <p>{selectedCustomer.name}</p>}

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
//                 let itemWork = 0;

//                 if (item.type === "piece") {
//                   itemWork = count * workmanship;
//                 } else {
//                   itemWork = itemWeight * workmanship;
//                 }

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

//                     {/* ❗ متلمسناش هنا */}
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

//           <h3>حساب قديم</h3>
//           <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//           <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//           <hr />

//           <h3>سداد جديد</h3>
//           <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
//           <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />

//           <hr />

//           <h3>الإجماليات</h3>
//           <p>وزن 21: {fix(totalWeight21)}</p>
//           <p>مصنعية: {fix(totalWorkmanship)}</p>
//           <p>مدفوع ذهب: {fix(totalPaidGold)}</p>
//           <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

//           <h3>المتبقي</h3>
//           <p>ذهب: {remainingGold}</p>
//           <p>مصنعية: {remainingWork}</p>

//           {/* <button
//   onClick={() =>
//     navigate("/print", {
//       state: {
//         customer,
//         invoices
//       }
//     })
//   }
// >
//   🖨️ طباعة
// </button> */
// <button
//   onClick={() =>
//     navigate("/print", {
//       state: {
//         customer: selectedCustomer,
//         invoices: customerInvoices,
//         items: items, // 🔥 مهم
//         oldGold,
//         oldWorkmanship,
//         payGold,
//         payWorkmanshipNow
//       }
//     })
//   }
// >
//   🖨️ طباعة
// </button>
// }
//         </section>
//       </div>
//     </div>
//   );
// }
















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// export default function App() {
//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   const [payGold, setPayGold] = useState("");
//   const [payGold24, setPayGold24] = useState(""); // 🔥 جديد
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");
//   const [cashBack, setCashBack] = useState("");   // 🔥 جديد

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   const addCustomer = (e) => {
//     e.preventDefault();
//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = { id: Date.now(), ...customerForm };
//     const updated = [...customers, newCustomer];

//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });
//     alert("تم حفظ العميل ✅");
//   };

//   const handleSearch = (value) => {
//     setSearch(value);
//     const all = JSON.parse(localStorage.getItem("customers")) || [];

//     if (!value) return setCustomers(all);

//     const filtered = all.filter(
//       (c) =>
//         c.name.includes(value) ||
//         c.phone.includes(value) ||
//         String(c.id).includes(value)
//     );

//     setCustomers(filtered);
//   };

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

//   // 🔥 الحساب (زي ما هو + تعديل التحويل فقط)
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

//     // 🔥 التحويل الصح
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
//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   let paidGold = 0;
//   let paidWork = 0;

//   customerInvoices.forEach((inv) => {
//     paidGold += Number(inv.totalPaid21 || 0);
//     paidWork +=
//       Number(inv.workmanshipTotal || 0) -
//       Number(inv.remainingWorkmanship || 0);
//   });

//   // 🔥 تحويل سداد 24 → 21
//   const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;

//   const totalPaidGold =
//     paidGold +
//     Number(payGold || 0) +
//     payGold24_to21;

//   const totalPaidWork =
//     paidWork +
//     Number(payWorkmanshipNow || 0) +
//     Number(cashBack || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* الشمال */}
//         {/* <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <label> <h4>اسم العميل</h4></label>
//             <input
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />
//             <label> <h4>رقم التليفون</h4></label>
//             <input
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />
//             <label><h4>ملاحظات</h4></label>
//             <textarea
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />
//             <button>حفظ العميل</button>
//           </form>

//           <input value={search} onChange={(e) => handleSearch(e.target.value)} />

//           <div className="list">
//             {customers.map((c) => (
//               <div key={c.id} onClick={() => setSelectedCustomer(c)}>
//                 {c.name}
//               </div>
//             ))}
//           </div>
//         </section> */}

//         {/* اليمين */}
//         <section className="card">
//           <h2>الأصناف</h2>

//           {selectedCustomer && <p>{selectedCustomer.name}</p>}

//           {/* ❗❗❗ الجزء دا متلمسش خالص زي ما هو */}
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
//                 let itemWork = 0;

//                 if (item.type === "piece") {
//                   itemWork = count * workmanship;
//                 } else {
//                   itemWork = itemWeight * workmanship;
//                 }

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

//           <h3>حساب قديم</h3>
//           <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//           <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//           <hr />

//           <h3>سداد جديد</h3>
//           <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
//           <input placeholder="سداد دهب 24" onChange={(e) => setPayGold24(e.target.value)} />
//           <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
//           <input placeholder="كاش باك" onChange={(e) => setCashBack(e.target.value)} />

//           <hr />

//           <h3>الإجماليات</h3>
//           <p>وزن 21: {fix(totalWeight21)}</p>
//           <p>مصنعية: {fix(totalWorkmanship)}</p>
//           <p>مدفوع ذهب: {fix(totalPaidGold)}</p>
//           <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

//           <h3>المتبقي</h3>
//           <p>ذهب: {remainingGold}</p>
//           <p>مصنعية: {remainingWork}</p>

//           <button
//             onClick={() =>
//               navigate("/print", {
//                 state: {
//                   customer: selectedCustomer,
//                   invoices: customerInvoices,
//                   items,
//                   oldGold,
//                   oldWorkmanship,
//                   payGold,
//                   payGold24,
//                   payWorkmanshipNow,
//                   cashBack
//                 }
//               })
//             }
//           >
//             🖨️ طباعة
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// export default function App() {
//   const navigate = useNavigate();

//   const [showForm, setShowForm] = useState(false); // 🔥 جديد

//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

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

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   const fix = (num) => Number(Number(num).toFixed(2));

//   const addCustomer = (e) => {
//     e.preventDefault();
//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = { id: Date.now(), ...customerForm };
//     const updated = [...customers, newCustomer];

//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });
//     alert("تم حفظ العميل ✅");
//   };

//   const handleSearch = (value) => {
//     setSearch(value);
//     const all = JSON.parse(localStorage.getItem("customers")) || [];

//     if (!value) return setCustomers(all);

//     const filtered = all.filter(
//       (c) =>
//         c.name.includes(value) ||
//         c.phone.includes(value) ||
//         String(c.id).includes(value)
//     );

//     setCustomers(filtered);
//   };

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

//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   let paidGold = 0;
//   let paidWork = 0;

//   customerInvoices.forEach((inv) => {
//     paidGold += Number(inv.totalPaid21 || 0);
//     paidWork +=
//       Number(inv.workmanshipTotal || 0) -
//       Number(inv.remainingWorkmanship || 0);
//   });

//   const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;

//   const totalPaidGold =
//     paidGold +
//     Number(payGold || 0) +
//     payGold24_to21;

//   const totalPaidWork =
//     paidWork +
//     Number(payWorkmanshipNow || 0) +
//     Number(cashBack || 0);

//   const remainingGold = fix(totalWeight21 - totalPaidGold);
//   const remainingWork = fix(totalWorkmanship - totalPaidWork);

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       {/* 🔥 زرار البلس */}
//       <button className="plus" onClick={() => setShowForm(!showForm)}>
//         ➕
//       </button>

//       {/* 🔥 الفورم */}
    
//       {showForm && (
//   <div className="modal-overlay">
//     <div className="modal">

//       <button className="plus" onClick={() => setShowForm(false)}>✖</button>

//       <section className="card">
//         <h2>إضافة عميل</h2>

//         <form onSubmit={addCustomer}>
//           <label><h4>اسم العميل</h4></label>
//           <input
//             value={customerForm.name}
//             onChange={(e) =>
//               setCustomerForm({ ...customerForm, name: e.target.value })
//             }
//           />

//           <label><h4>رقم التليفون</h4></label>
//           <input
//             value={customerForm.phone}
//             onChange={(e) =>
//               setCustomerForm({ ...customerForm, phone: e.target.value })
//             }
//           />

//           <label><h4>ملاحظات</h4></label>
//           <textarea
//             value={customerForm.notes}
//             onChange={(e) =>
//               setCustomerForm({ ...customerForm, notes: e.target.value })
//             }
//           />

//           <button>حفظ العميل</button>
//         </form>

//         <input
//           value={search}
//           onChange={(e) => handleSearch(e.target.value)}
//         />

//         <div className="list">
//           {customers.map((c) => (
//             <div key={c.id} onClick={() => setSelectedCustomer(c)}>
//               {c.name}
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   </div>
// )}

//       {/* 🔥 جزء الأصناف (متلمسش خالص زي ما طلبتي) */}
//       <section className="card">
//         <h2>الأصناف</h2>

//         {selectedCustomer && <p>{selectedCustomer.name}</p>}

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

//         <button onClick={addRow}>➕ إضافة صنف</button>

//         <hr />

//         <h3>حساب قديم</h3>
//         <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//         <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//         <hr />

//         <h3>سداد جديد</h3>
//         <input placeholder="سداد دهب 21" onChange={(e) => setPayGold(e.target.value)} />
//         <input placeholder="سداد دهب 24" onChange={(e) => setPayGold24(e.target.value)} />
//         <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
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
//           onClick={() =>
//             navigate("/print", {
//               state: {
//                 customer: selectedCustomer,
//                 invoices: customerInvoices,
//                 items,
//                 oldGold,
//                 oldWorkmanship,
//                 payGold,
//                 payGold24,
//                 payWorkmanshipNow,
//                 cashBack
//               }
//             })
//           }
//         >
//           🖨️ طباعة
//         </button>
//       </section>
//     </div>
//   );
// }









import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  const [invoices, setInvoices] = useState([]);

  const [items, setItems] = useState([
    { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
  ]);

  const [oldGold, setOldGold] = useState("");
  const [oldWorkmanship, setOldWorkmanship] = useState("");

  const [payGold, setPayGold] = useState("");
  const [payGold24, setPayGold24] = useState("");
  const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");
  const [cashBack, setCashBack] = useState("");

  // 🔥 السبيكة
  const [barWeight, setBarWeight] = useState("");
  const [barKarat, setBarKarat] = useState("");

  useEffect(() => {
    const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

    setCustomers(savedCustomers);
    setInvoices(savedInvoices);
  }, []);

  const fix = (num) => Number(Number(num).toFixed(2));

  const addCustomer = (e) => {
    e.preventDefault();
    if (!customerForm.name) return alert("اكتب اسم العميل");

    const newCustomer = { id: Date.now(), ...customerForm };
    const updated = [...customers, newCustomer];

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));

    setCustomerForm({ name: "", phone: "", notes: "" });
    alert("تم حفظ العميل ✅");
  };

  const handleSearch = (value) => {
    setSearch(value);
    const all = JSON.parse(localStorage.getItem("customers")) || [];

    if (!value) return setCustomers(all);

    const filtered = all.filter(
      (c) =>
        c.name.includes(value) ||
        c.phone.includes(value) ||
        String(c.id).includes(value)
    );

    setCustomers(filtered);
  };

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

  let totalWeight21 = 0;
  let totalWorkmanship = 0;

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
    } else if (karat === 21) {
      weight21 = itemWeight;
    } else {
      weight21 = (itemWeight * karat) / 875;
    }

    totalWeight21 += weight21;
    totalWorkmanship += itemWork;
  });

  totalWeight21 += Number(oldGold || 0);
  totalWorkmanship += Number(oldWorkmanship || 0);

  const customerInvoices = invoices.filter(
    (inv) => inv.customer_id === selectedCustomer?.id
  );

  let paidGold = 0;
  let paidWork = 0;

  customerInvoices.forEach((inv) => {
    paidGold += Number(inv.totalPaid21 || 0);
    paidWork +=
      Number(inv.workmanshipTotal || 0) -
      Number(inv.remainingWorkmanship || 0);
  });

  // 🔥 تحويل 24 → 21
  const payGold24_to21 = (Number(payGold24 || 0) * 999.9) / 875;

  // 🔥 حساب السبيكة
  const barEquivalent21 = (Number(barWeight || 0) * Number(barKarat || 0)) / 875;

  const totalPaidGold =
    paidGold +
    Number(payGold || 0) +
    payGold24_to21 +
    barEquivalent21; // 🔥 خصم السبيكة

  const totalPaidWork =
    paidWork +
    Number(payWorkmanshipNow || 0) +
    Number(cashBack || 0);

  const remainingGold = fix(totalWeight21 - totalPaidGold);
  const remainingWork = fix(totalWorkmanship - totalPaidWork);

  return (
    <div className="app">
      <h1>Gold Shop System</h1>

      <button className="plus" onClick={() => setShowForm(!showForm)}>
        ➕
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="plus" onClick={() => setShowForm(false)}>✖</button>

            <section className="card">
              <h2>إضافة عميل</h2>

              <form onSubmit={addCustomer}>
                <label><h4>اسم العميل</h4></label>
                <input value={customerForm.name} onChange={(e) =>
                  setCustomerForm({ ...customerForm, name: e.target.value })} />

                <label><h4>رقم التليفون</h4></label>
                <input value={customerForm.phone} onChange={(e) =>
                  setCustomerForm({ ...customerForm, phone: e.target.value })} />

                <label><h4>ملاحظات</h4></label>
                <textarea value={customerForm.notes} onChange={(e) =>
                  setCustomerForm({ ...customerForm, notes: e.target.value })} />

                <button className="add">حفظ العميل</button>
              </form>

              <input value={search} onChange={(e) => handleSearch(e.target.value)} />

              <div className="list">
                {customers.map((c) => (
                  <div key={c.id} onClick={() => setSelectedCustomer(c)}>
                    {c.name}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* ❗ الجزء متساب زي ما هو */}
      <section className="card">
        <h2>الأصناف</h2>

        {selectedCustomer && <p>{selectedCustomer.name}</p>}

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
              let itemWork = 0;

              if (item.type === "piece") {
                itemWork = count * workmanship;
              } else {
                itemWork = itemWeight * workmanship;
              }

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
        

        <input placeholder="سداد مصنعية" onChange={(e) => setPayWorkmanshipNow(e.target.value)} />
        <input placeholder="كاش باك" onChange={(e) => setCashBack(e.target.value)} />

        <hr />

        <h3>الإجماليات</h3>
        <p>وزن 21: {fix(totalWeight21)}</p>
        <p>مصنعية: {fix(totalWorkmanship)}</p>
        <p>مدفوع ذهب: {fix(totalPaidGold)}</p>
        <p>مدفوع مصنعية: {fix(totalPaidWork)}</p>

        <h3>المتبقي</h3>
        <p>ذهب: {remainingGold}</p>
        <p>مصنعية: {remainingWork}</p>

        <button className="add"
          onClick={() =>
            navigate("/print", {
  state: {
    customer: selectedCustomer,
    invoices: customerInvoices,
    items,
    oldGold,
    oldWorkmanship,
    payGold,
    payGold24,
    payWorkmanshipNow,
    cashBack,
    barWeight,      // 🔥 لازم تضيفي دول
    barKarat        // 🔥
  }
})
                     // 🔥 لازم تضيفي دول
               
              }
           
          
        >
          🖨️ طباعة
        </button>
      </section>
    </div>
  );
}