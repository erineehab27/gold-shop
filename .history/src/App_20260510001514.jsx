

// import { useEffect, useState } from "react";
// import "./App.css";

// export default function App() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

//   const [invoiceForm, setInvoiceForm] = useState({
//     type: "sale",

//     weight21: "",
//     workmanship21: "",

//     weight24: "",
//     workmanship24: "",

//     discount: "",

//     pay21: "",
//     pay24: "",
//     payCash: "",
//     goldPrice21: "",
//     payNugget: "",
//     payBarWeight: "",
//     payBarKarat: "",

//     payWorkmanship: "", // 🔥 سداد المصنعية
//   });

//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   // 🔥 تقريب لرقمين عشري
//   const fix = (num) => Number(num.toFixed(2));

//   const to21_from24 = (w) => fix(w * (999.9 / 875));
//   const nuggetTo21 = (w) => fix(w * (991 / 875));
//   const barTo21 = (w, k) => fix((w * k) / 875);
//   const cashTo21 = (cash, price) => fix(price ? cash / price : 0);

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

//   const addInvoice = (e) => {
//     e.preventDefault();

//     if (!selectedCustomer) return alert("اختار عميل");

//     const w21 = Number(invoiceForm.weight21 || 0);
//     const w24 = Number(invoiceForm.weight24 || 0);

//     const eq21_from24 = to21_from24(w24);
//     const totalWeight21 = fix(w21 + eq21_from24);

//     // المصنعيات
//     const workmanshipTotal = fix(
//       Number(invoiceForm.workmanship21 || 0) +
//         Number(invoiceForm.workmanship24 || 0) -
//         Number(invoiceForm.discount || 0)
//     );

//     const payWorkmanship = Number(invoiceForm.payWorkmanship || 0);
//     const remainingWorkmanship = fix(workmanshipTotal - payWorkmanship);

//     // السداد
//     const pay21 = Number(invoiceForm.pay21 || 0);
//     const pay24 = to21_from24(Number(invoiceForm.pay24 || 0));
//     const payNuggetVal = nuggetTo21(Number(invoiceForm.payNugget || 0));
//     const payBarVal = barTo21(
//       Number(invoiceForm.payBarWeight || 0),
//       Number(invoiceForm.payBarKarat || 0)
//     );
//     const payCashVal = cashTo21(
//       Number(invoiceForm.payCash || 0),
//       Number(invoiceForm.goldPrice21 || 0)
//     );

//     const totalPaid21 = fix(
//       pay21 + pay24 + payNuggetVal + payBarVal + payCashVal
//     );

//     const remainingGold = fix(totalWeight21 - totalPaid21);

//     const newInvoice = {
//       id: Date.now(),
//       customer_id: selectedCustomer.id,
//       totalWeight21,
//       workmanshipTotal,
//       totalPaid21,
//       remainingGold,
//       remainingWorkmanship, // 🔥 المتبقي مصنعية
//       date: new Date().toLocaleString(),
//     };

//     const updated = [...invoices, newInvoice];
//     setInvoices(updated);
//     localStorage.setItem("invoices", JSON.stringify(updated));

//     alert("تم حفظ الفاتورة ✅");
//   };

//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

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

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
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
//           <input
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//           />

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

//         <section className="card">
//           <h2>فاتورة جديدة</h2>

//           {selectedCustomer && <p>{selectedCustomer.name}</p>}

//           <form onSubmit={addInvoice}>
//             <label>وزن عيار 21</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, weight21: e.target.value })
//             } />

//             <label>مصنعية 21</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, workmanship21: e.target.value })
//             } />

//             <label>وزن عيار 24</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, weight24: e.target.value })
//             } />

//             <label>مصنعية 24</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, workmanship24: e.target.value })
//             } />

//             <label>الخصم</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, discount: e.target.value })
//             } />

//             <label>سداد مصنعية</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, payWorkmanship: e.target.value })
//             } />

//             <hr />

//             <label>سداد عيار 21</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, pay21: e.target.value })
//             } />

//             <label>سداد عيار 24</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, pay24: e.target.value })
//             } />

//             <label>بندقي</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, payNugget: e.target.value })
//             } />

//             <label>وزن سبيكة</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, payBarWeight: e.target.value })
//             } />

//             <label>عيار السبيكة</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, payBarKarat: e.target.value })
//             } />

//             <label>نقدي</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, payCash: e.target.value })
//             } />

//             <label>سعر ذهب 21</label>
//             <input onChange={(e) =>
//               setInvoiceForm({ ...invoiceForm, goldPrice21: e.target.value })
//             } />

//             <button>حفظ الفاتورة</button>
//           </form>
//         </section>
//       </div>

//       <section className="card">
//         <h2>كشف الحساب</h2>

//         {selectedCustomer && (
//           <table>
//             <thead>
//               <tr>
//                 <th>إجمالي 21</th>
//                 <th>مصنعية</th>
//                 <th>المتبقي مصنعية</th>
//                 <th>مدفوع 21</th>
//                 <th>المتبقي</th>
//                 <th>تاريخ</th>
//               </tr>
//             </thead>

//             <tbody>
//               {customerInvoices.map((inv) => (
//                 <tr key={inv.id}>
//                   <td>{inv.totalWeight21}</td>
//                   <td>{inv.workmanshipTotal}</td>
//                   <td>{inv.remainingWorkmanship}</td>
//                   <td>{inv.totalPaid21}</td>
//                   <td>{inv.remainingGold}</td>
//                   <td>{inv.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>
//     </div>
//   );
// }




//اخر تعديل

// import { useEffect, useState } from "react";
// import "./App.css";

// export default function App() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   // 🔥 الأصناف
//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   const fix = (num) => Number(Number(num).toFixed(2));
//   const to21 = (w, k) => fix((w * k) / 875);

//   // ✅ إضافة عميل
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

//   // 🔍 بحث
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

//   // 🔥 الأصناف
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

//     const weight21 = to21(itemWeight, karat);

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   // حساب قديم
//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   // السدادات من الفواتير
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

//   const remainingGold = fix(totalWeight21 - paidGold);
//   const remainingWork = fix(totalWorkmanship - paidWork);

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* 👈 الشمال */}
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
//           <input
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//           />

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

//         {/* 👉 اليمين (الأصناف + الحساب) */}
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
//               </tr>
//             </thead>

//             <tbody>
//               {items.map((item, i) => (
//                 <tr key={i}>
//                   <td>
//                     <input onChange={(e) => handleItemChange(i, "name", e.target.value)} />
//                   </td>

//                   <td>
//                     <input onChange={(e) => handleItemChange(i, "count", e.target.value)} />
//                   </td>

//                   <td>
//                     <input onChange={(e) => handleItemChange(i, "weight", e.target.value)} />
//                   </td>

//                   <td>
//                     <input onChange={(e) => handleItemChange(i, "karat", e.target.value)} />
//                   </td>

//                   <td>
//                     <select onChange={(e) => handleItemChange(i, "type", e.target.value)}>
//                       <option value="gram">جرام</option>
//                       <option value="piece">قطعة</option>
//                     </select>
//                   </td>

//                   <td>
//                     <input onChange={(e) => handleItemChange(i, "workmanship", e.target.value)} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button onClick={addRow}>➕ إضافة صنف</button>

//           <hr />

//           <h3>حساب قديم</h3>

//           <input placeholder="وزن 21" onChange={(e) => setOldGold(e.target.value)} />
//           <input placeholder="مصنعية" onChange={(e) => setOldWorkmanship(e.target.value)} />

//           <hr />

//           <h3>الإجماليات</h3>

//           <p>وزن 21: {fix(totalWeight21)}</p>
//           <p>مصنعية: {fix(totalWorkmanship)}</p>

//           <p>مدفوع ذهب: {fix(paidGold)}</p>
//           <p>مدفوع مصنعية: {fix(paidWork)}</p>

//           <h3>المتبقي</h3>

//           <p>ذهب: {remainingGold}</p>
//           <p>مصنعية: {remainingWork}</p>

//           <button onClick={() => window.print()}>🖨️ طباعة</button>
//         </section>
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";
// import "./App.css";

// export default function App() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   // 🔥 الأصناف
//   const [items, setItems] = useState([
//     { name: "", count: "", weight: "", karat: "", workmanship: "", type: "gram" }
//   ]);

//   const [oldGold, setOldGold] = useState("");
//   const [oldWorkmanship, setOldWorkmanship] = useState("");

//   // 🔥 السداد الجديد
//   const [payGold, setPayGold] = useState("");
//   const [payWorkmanshipNow, setPayWorkmanshipNow] = useState("");

//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   const fix = (num) => Number(Number(num).toFixed(2));
//   const to21 = (w, k) => fix((w * k) / 875);

//   // إضافة عميل
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

//   // بحث
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

//   // الأصناف
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

//   // الحساب
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

//     const weight21 = to21(itemWeight, karat);

//     totalWeight21 += weight21;
//     totalWorkmanship += itemWork;
//   });

//   // حساب قديم
//   totalWeight21 += Number(oldGold || 0);
//   totalWorkmanship += Number(oldWorkmanship || 0);

//   // الفواتير
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

//   // 🔥 إجمالي السداد (قديم + جديد)
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
//           <input
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//           />

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
//               </tr>
//             </thead>

//             <tbody>
//               {items.map((item, i) => (
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
//                 </tr>
//               ))}
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

//           <button onClick={() => window.print()}>🖨️ طباعة</button>
//         </section>
//       </div>
//     </div>
//   );
// }








