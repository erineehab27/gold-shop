// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [statement, setStatement] = useState(null);
//   const [search, setSearch] = useState("");

//   const [customerForm, setCustomerForm] = useState({
//     name: "",
//     phone: "",
//     notes: ""
//   });

//   const [invoiceForm, setInvoiceForm] = useState({
//     type: "sale",
//     karat: "21",
//     weight: "",
//     gram_price: "",
//     workmanship: "",
//     discount: "",
//     paid: ""
//   });

//   async function loadCustomers() {
//     const data = await window.api.getCustomers();
//     setCustomers(data);
//   }

//   async function loadStatement(customer) {
//     setSelectedCustomer(customer);
//     const data = await window.api.getCustomerStatement(customer.id);
//     setStatement(data);
//   }

//   async function addCustomer(e) {
//     e.preventDefault();

//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     await window.api.addCustomer(customerForm);

//     setCustomerForm({
//       name: "",
//       phone: "",
//       notes: ""
//     });

//     loadCustomers();
//   }

//   async function addInvoice(e) {
//     e.preventDefault();

//     if (!selectedCustomer) return alert("اختار عميل الأول");

//     await window.api.addInvoice({
//       customer_id: selectedCustomer.id,
//       ...invoiceForm,
//       weight: Number(invoiceForm.weight),
//       gram_price: Number(invoiceForm.gram_price),
//       workmanship: Number(invoiceForm.workmanship || 0),
//       discount: Number(invoiceForm.discount || 0),
//       paid: Number(invoiceForm.paid || 0)
//     });

//     setInvoiceForm({
//       type: "sale",
//       karat: "21",
//       weight: "",
//       gram_price: "",
//       workmanship: "",
//       discount: "",
//       paid: ""
//     });

//     loadStatement(selectedCustomer);
//   }

//   async function handleSearch(value) {
//     setSearch(value);

//     if (!value) {
//       loadCustomers();
//       return;
//     }

//     const data = await window.api.searchCustomers(value);
//     setCustomers(data);
//   }

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <input
//               placeholder="اسم العميل"
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="رقم التليفون"
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="ملاحظات"
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <h2>بحث العملاء</h2>

//           <input
//             placeholder="ابحث بالاسم أو التليفون أو ID"
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//           />

//           <div className="list">
//             {customers.map((customer) => (
//               <div
//                 key={customer.id}
//                 className="customer"
//                 onClick={() => loadStatement(customer)}
//               >
//                 <strong>#{customer.id} - {customer.name}</strong>
//                 <span>{customer.phone}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="card">
//           <h2>فاتورة جديدة</h2>

//           {selectedCustomer ? (
//             <p>
//               العميل المختار: <strong>{selectedCustomer.name}</strong>
//             </p>
//           ) : (
//             <p>اختار عميل من القائمة</p>
//           )}

//           <form onSubmit={addInvoice}>
//             <select
//               value={invoiceForm.type}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, type: e.target.value })
//               }
//             >
//               <option value="sale">بيع للعميل - عليه فلوس</option>
//               <option value="purchase">شراء من العميل - ليه فلوس</option>
//             </select>

//             <select
//               value={invoiceForm.karat}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, karat: e.target.value })
//               }
//             >
//               <option value="18">عيار 18</option>
//               <option value="21">عيار 21</option>
//               <option value="24">عيار 24</option>
//             </select>

//             <input
//               type="number"
//               step="0.001"
//               placeholder="الوزن بالجرام"
//               value={invoiceForm.weight}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, weight: e.target.value })
//               }
//             />

//             <input
//               type="number"
//               placeholder="سعر الجرام"
//               value={invoiceForm.gram_price}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, gram_price: e.target.value })
//               }
//             />

//             <input
//               type="number"
//               placeholder="المصنعية"
//               value={invoiceForm.workmanship}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, workmanship: e.target.value })
//               }
//             />

//             <input
//               type="number"
//               placeholder="الخصم"
//               value={invoiceForm.discount}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, discount: e.target.value })
//               }
//             />

//             <input
//               type="number"
//               placeholder="المدفوع"
//               value={invoiceForm.paid}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, paid: e.target.value })
//               }
//             />

//             <button>حفظ الفاتورة</button>
//           </form>
//         </section>
//       </div>

//       <section className="card">
//         <h2>كشف حساب العميل</h2>

//         {statement && (
//           <>
//             <h3>
//               الرصيد النهائي:{" "}
//               <span className={statement.balance >= 0 ? "debt" : "credit"}>
//                 {Math.abs(statement.balance).toLocaleString()} جنيه
//               </span>
//             </h3>

//             <p>
//               {statement.balance > 0
//                 ? "العميل عليه فلوس"
//                 : statement.balance < 0
//                 ? "العميل ليه فلوس"
//                 : "الحساب متصفي"}
//             </p>

//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>النوع</th>
//                   <th>العيار</th>
//                   <th>الوزن</th>
//                   <th>سعر الجرام</th>
//                   <th>الإجمالي</th>
//                   <th>المدفوع</th>
//                   <th>التاريخ</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {statement.invoices.map((inv) => (
//                   <tr key={inv.id}>
//                     <td>{inv.id}</td>
//                     <td>{inv.type === "sale" ? "بيع" : "شراء"}</td>
//                     <td>{inv.karat}</td>
//                     <td>{inv.weight}</td>
//                     <td>{inv.gram_price}</td>
//                     <td>{inv.total}</td>
//                     <td>{inv.paid}</td>
//                     <td>{inv.created_at}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </section>
//     </div>
//   );
// }

// export default App;






// مهم جدا اخر ابديت

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

//   // تحميل من LocalStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("customers")) || [];
//     setCustomers(saved);
//   }, []);

//   // حفظ عميل
//   const addCustomer = (e) => {
//     e.preventDefault();

//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = {
//       id: Date.now(),
//       ...customerForm,
//     };

//     const updated = [...customers, newCustomer];
//     setCustomers(updated);

//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({
//       name: "",
//       phone: "",
//       notes: "",
//     });

//     alert("تم حفظ العميل ✅");
//   };

//   // اختيار عميل
//   const selectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//   };

//   // بحث
//   const handleSearch = (value) => {
//     setSearch(value);

//     const all = JSON.parse(localStorage.getItem("customers")) || [];

//     if (!value) {
//       setCustomers(all);
//       return;
//     }

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
//         {/* إضافة عميل */}
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <input
//               placeholder="اسم العميل"
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="رقم التليفون"
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="ملاحظات"
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <h2>بحث العملاء</h2>

//           <input
//             placeholder="ابحث..."
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//           />

//           <div className="list">
//             {customers.map((customer) => (
//               <div
//                 key={customer.id}
//                 className="customer"
//                 onClick={() => selectCustomer(customer)}
//               >
//                 <strong>
//                   #{customer.id} - {customer.name}
//                 </strong>
//                 <span>{customer.phone}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* تفاصيل العميل */}
//         <section className="card">
//           <h2>تفاصيل العميل</h2>

//           {selectedCustomer ? (
//             <>
//               <p>
//                 <strong>الاسم:</strong> {selectedCustomer.name}
//               </p>
//               <p>
//                 <strong>الموبايل:</strong> {selectedCustomer.phone}
//               </p>
//               <p>
//                 <strong>ملاحظات:</strong> {selectedCustomer.notes}
//               </p>
//             </>
//           ) : (
//             <p>اختار عميل من القائمة</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }


// // ابديت اخر حاجه
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
//     karat: "21",
//     weight: "",
//     gram_price: "",
//     workmanship: "",
//     discount: "",
//     paid: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   // تحميل البيانات
//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   // حفظ عميل
//   const addCustomer = (e) => {
//     e.preventDefault();

//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = {
//       id: Date.now(),
//       ...customerForm,
//     };

//     const updated = [...customers, newCustomer];
//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });

//     alert("تم حفظ العميل ✅");
//   };

//   // حفظ فاتورة
//   const addInvoice = (e) => {
//     e.preventDefault();

//     if (!selectedCustomer) return alert("اختار عميل الأول");

//     const total =
//       invoiceForm.weight * invoiceForm.gram_price +
//       Number(invoiceForm.workmanship || 0) -
//       Number(invoiceForm.discount || 0);

//     const newInvoice = {
//       id: Date.now(),
//       customer_id: selectedCustomer.id,
//       ...invoiceForm,
//       weight: Number(invoiceForm.weight),
//       gram_price: Number(invoiceForm.gram_price),
//       total,
//       paid: Number(invoiceForm.paid || 0),
//       date: new Date().toLocaleString(),
//     };

//     const updated = [...invoices, newInvoice];
//     setInvoices(updated);
//     localStorage.setItem("invoices", JSON.stringify(updated));

//     setInvoiceForm({
//       type: "sale",
//       karat: "21",
//       weight: "",
//       gram_price: "",
//       workmanship: "",
//       discount: "",
//       paid: "",
//     });

//     alert("تم حفظ الفاتورة ✅");
//   };

//   // فلترة فواتير العميل
//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   // حساب الرصيد
//   const balance = customerInvoices.reduce((acc, inv) => {
//     if (inv.type === "sale") {
//       return acc + (inv.total - inv.paid);
//     } else {
//       return acc - (inv.total - inv.paid);
//     }
//   }, 0);

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

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* العملاء */}
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <input
//               placeholder="اسم العميل"
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="رقم التليفون"
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="ملاحظات"
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <h2>بحث العملاء</h2>

//           <input
//             placeholder="ابحث..."
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

//         {/* الفواتير */}
//         <section className="card">
//           <h2>فاتورة جديدة</h2>

//           {selectedCustomer ? (
//             <p>العميل: {selectedCustomer.name}</p>
//           ) : (
//             <p>اختار عميل</p>
//           )}

//           <form onSubmit={addInvoice}>
//             <select
//               value={invoiceForm.type}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, type: e.target.value })
//               }
//             >
//               <option value="sale">بيع</option>
//               <option value="purchase">شراء</option>
//             </select>

//             <input
//               placeholder="الوزن"
//               value={invoiceForm.weight}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, weight: e.target.value })
//               }
//             />

//             <input
//               placeholder="سعر الجرام"
//               value={invoiceForm.gram_price}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   gram_price: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="المصنعية"
//               value={invoiceForm.workmanship}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   workmanship: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="الخصم"
//               value={invoiceForm.discount}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   discount: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="المدفوع"
//               value={invoiceForm.paid}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, paid: e.target.value })
//               }
//             />

//             <button>حفظ الفاتورة</button>
//           </form>
//         </section>
//       </div>

//       {/* كشف الحساب */}
//       <section className="card">
//         <h2>كشف الحساب</h2>

//         {selectedCustomer && (
//           <>
//             <h3>الرصيد: {Math.abs(balance)} جنيه</h3>

//             <p>
//               {balance > 0
//                 ? "العميل عليه فلوس"
//                 : balance < 0
//                 ? "العميل ليه فلوس"
//                 : "متصفي"}
//             </p>

//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>نوع</th>
//                   <th>وزن</th>
//                   <th>سعر</th>
//                   <th>إجمالي</th>
//                   <th>مدفوع</th>
//                   <th>تاريخ</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {customerInvoices.map((inv) => (
//                   <tr key={inv.id}>
//                     <td>{inv.id}</td>
//                     <td>{inv.type}</td>
//                     <td>{inv.weight}</td>
//                     <td>{inv.gram_price}</td>
//                     <td>{inv.total}</td>
//                     <td>{inv.paid}</td>
//                     <td>{inv.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </section>
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

//   const [invoiceForm, setInvoiceForm] = useState({
//     type: "sale",
//     karat: "21",
//     weight: "",
//     gram_price: "",
//     workmanship: "",
//     discount: "",
//     paid: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   // تحميل البيانات
//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   // 🔥 تحويل لأي عيار 21
//   const getEquivalent21 = (weight, karat) => {
//     if (karat === "24") return weight * (999.9 / 875);
//     if (karat === "21") return weight;
//     if (karat === "18") return weight * (750 / 875);
//     return weight;
//   };

//   // حفظ عميل
//   const addCustomer = (e) => {
//     e.preventDefault();

//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = {
//       id: Date.now(),
//       ...customerForm,
//     };

//     const updated = [...customers, newCustomer];
//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });

//     alert("تم حفظ العميل ✅");
//   };

//   // حفظ فاتورة
//   const addInvoice = (e) => {
//     e.preventDefault();

//     if (!selectedCustomer) return alert("اختار عميل الأول");

//     const weight = Number(invoiceForm.weight);
//     const gramPrice = Number(invoiceForm.gram_price);

//     const equivalent21 = getEquivalent21(weight, invoiceForm.karat);

//     const total =
//       equivalent21 * gramPrice +
//       Number(invoiceForm.workmanship || 0) -
//       Number(invoiceForm.discount || 0);

//     const newInvoice = {
//       id: Date.now(),
//       customer_id: selectedCustomer.id,
//       ...invoiceForm,
//       weight,
//       equivalent21,
//       gram_price: gramPrice,
//       total,
//       paid: Number(invoiceForm.paid || 0),
//       date: new Date().toLocaleString(),
//     };

//     const updated = [...invoices, newInvoice];
//     setInvoices(updated);
//     localStorage.setItem("invoices", JSON.stringify(updated));

//     setInvoiceForm({
//       type: "sale",
//       karat: "21",
//       weight: "",
//       gram_price: "",
//       workmanship: "",
//       discount: "",
//       paid: "",
//     });

//     alert("تم حفظ الفاتورة ✅");
//   };

//   // فلترة فواتير العميل
//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   // 🧮 إجمالي الوزن عيار 21
//   const total21Weight = customerInvoices.reduce(
//     (acc, inv) => acc + (inv.equivalent21 || inv.weight),
//     0
//   );

//   // حساب الرصيد
//   const balance = customerInvoices.reduce((acc, inv) => {
//     if (inv.type === "sale") {
//       return acc + (inv.total - inv.paid);
//     } else {
//       return acc - (inv.total - inv.paid);
//     }
//   }, 0);

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

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* العملاء */}
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <input
//               placeholder="اسم العميل"
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="رقم التليفون"
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="ملاحظات"
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <h2>بحث العملاء</h2>

//           <input
//             placeholder="ابحث..."
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

//         {/* الفواتير */}
//         <section className="card">
//           <h2>فاتورة جديدة</h2>

//           {selectedCustomer ? (
//             <p>العميل: {selectedCustomer.name}</p>
//           ) : (
//             <p>اختار عميل</p>
//           )}

//           <form onSubmit={addInvoice}>
//             <select
//               value={invoiceForm.type}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, type: e.target.value })
//               }
//             >
//               <option value="sale">بيع</option>
//               <option value="purchase">شراء</option>
//             </select>

//             <select
//               value={invoiceForm.karat}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, karat: e.target.value })
//               }
//             >
//               <option value="18">عيار 18</option>
//               <option value="21">عيار 21</option>
//               <option value="24">عيار 24</option>
//             </select>

//             <input
//               placeholder="الوزن"
//               value={invoiceForm.weight}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, weight: e.target.value })
//               }
//             />

//             <input
//               placeholder="سعر الجرام"
//               value={invoiceForm.gram_price}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   gram_price: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="المصنعية"
//               value={invoiceForm.workmanship}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   workmanship: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="الخصم"
//               value={invoiceForm.discount}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   discount: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="المدفوع"
//               value={invoiceForm.paid}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, paid: e.target.value })
//               }
//             />

//             <button>حفظ الفاتورة</button>
//           </form>
//         </section>
//       </div>

//       {/* كشف الحساب */}
//       <section className="card">
//         <h2>كشف الحساب</h2>

//         {selectedCustomer && (
//           <>
//             <h3>الرصيد: {Math.abs(balance)} جنيه</h3>

//             <p>
//               {balance > 0
//                 ? "العميل عليه فلوس"
//                 : balance < 0
//                 ? "العميل ليه فلوس"
//                 : "متصفي"}
//             </p>

//             <h3>
//               إجمالي الوزن عيار 21: {total21Weight.toFixed(2)} جرام
//             </h3>

//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>نوع</th>
//                   <th>عيار</th>
//                   <th>وزن</th>
//                   <th>مكافئ 21</th>
//                   <th>سعر</th>
//                   <th>إجمالي</th>
//                   <th>مدفوع</th>
//                   <th>تاريخ</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {customerInvoices.map((inv) => (
//                   <tr key={inv.id}>
//                     <td>{inv.id}</td>
//                     <td>{inv.type}</td>
//                     <td>{inv.karat}</td>
//                     <td>{inv.weight}</td>
//                     <td>{inv.equivalent21?.toFixed(2)}</td>
//                     <td>{inv.gram_price}</td>
//                     <td>{inv.total}</td>
//                     <td>{inv.paid}</td>
//                     <td>{inv.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </section>
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

//   const [invoiceForm, setInvoiceForm] = useState({
//     type: "sale",
//     weight21: "",
//     weight24: "",
//     workmanship21: "",
//     workmanship24: "",
//     paid: "",
//   });

//   const [invoices, setInvoices] = useState([]);

//   // تحميل البيانات
//   useEffect(() => {
//     const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     setCustomers(savedCustomers);
//     setInvoices(savedInvoices);
//   }, []);

//   // تحويل 24 → 21
//   const convert24to21 = (w24) => w24 * (999.9 / 875);

//   // حفظ عميل
//   const addCustomer = (e) => {
//     e.preventDefault();

//     if (!customerForm.name) return alert("اكتب اسم العميل");

//     const newCustomer = {
//       id: Date.now(),
//       ...customerForm,
//     };

//     const updated = [...customers, newCustomer];
//     setCustomers(updated);
//     localStorage.setItem("customers", JSON.stringify(updated));

//     setCustomerForm({ name: "", phone: "", notes: "" });

//     alert("تم حفظ العميل ✅");
//   };

//   // حفظ فاتورة
//   const addInvoice = (e) => {
//     e.preventDefault();

//     if (!selectedCustomer) return alert("اختار عميل الأول");

//     const w21 = Number(invoiceForm.weight21 || 0);
//     const w24 = Number(invoiceForm.weight24 || 0);

//     const eq24 = convert24to21(w24);

//     const totalWeight21 = w21 + eq24;

//     const totalWorkmanship =
//       Number(invoiceForm.workmanship21 || 0) +
//       Number(invoiceForm.workmanship24 || 0);

//     const newInvoice = {
//       id: Date.now(),
//       customer_id: selectedCustomer.id,

//       weight21: w21,
//       weight24: w24,
//       eq24,
//       totalWeight21,

//       workmanship21: Number(invoiceForm.workmanship21 || 0),
//       workmanship24: Number(invoiceForm.workmanship24 || 0),
//       totalWorkmanship,

//       paid: Number(invoiceForm.paid || 0),

//       date: new Date().toLocaleString(),
//     };

//     const updated = [...invoices, newInvoice];
//     setInvoices(updated);
//     localStorage.setItem("invoices", JSON.stringify(updated));

//     setInvoiceForm({
//       type: "sale",
//       weight21: "",
//       weight24: "",
//       workmanship21: "",
//       workmanship24: "",
//       paid: "",
//     });

//     alert("تم حفظ الفاتورة ✅");
//   };

//   // فواتير العميل
//   const customerInvoices = invoices.filter(
//     (inv) => inv.customer_id === selectedCustomer?.id
//   );

//   // إجمالي الوزن 21
//   const total21Weight = customerInvoices.reduce(
//     (acc, inv) => acc + inv.totalWeight21,
//     0
//   );

//   // إجمالي المصنعيات
//   const totalWork = customerInvoices.reduce(
//     (acc, inv) => acc + inv.totalWorkmanship,
//     0
//   );

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

//   return (
//     <div className="app">
//       <h1>Gold Shop System</h1>

//       <div className="grid">
//         {/* العملاء */}
//         <section className="card">
//           <h2>إضافة عميل</h2>

//           <form onSubmit={addCustomer}>
//             <input
//               placeholder="اسم العميل"
//               value={customerForm.name}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="رقم التليفون"
//               value={customerForm.phone}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, phone: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="ملاحظات"
//               value={customerForm.notes}
//               onChange={(e) =>
//                 setCustomerForm({ ...customerForm, notes: e.target.value })
//               }
//             />

//             <button>حفظ العميل</button>
//           </form>

//           <h2>بحث</h2>

//           <input
//             placeholder="ابحث..."
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
//                 <strong>
//                   #{c.id} - {c.name}
//                 </strong>
//                 <span>{c.phone}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* الفاتورة */}
//         <section className="card">
//           <h2>فاتورة جديدة</h2>

//           {selectedCustomer ? (
//             <p>العميل: {selectedCustomer.name}</p>
//           ) : (
//             <p>اختار عميل</p>
//           )}

//           <form onSubmit={addInvoice}>
//             <h4>عيار 21</h4>

//             <input
//               placeholder="وزن 21"
//               value={invoiceForm.weight21}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, weight21: e.target.value })
//               }
//             />

//             <input
//               placeholder="مصنعية 21"
//               value={invoiceForm.workmanship21}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   workmanship21: e.target.value,
//                 })
//               }
//             />

//             <h4>عيار 24</h4>

//             <input
//               placeholder="وزن 24"
//               value={invoiceForm.weight24}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, weight24: e.target.value })
//               }
//             />

//             <input
//               placeholder="مصنعية 24"
//               value={invoiceForm.workmanship24}
//               onChange={(e) =>
//                 setInvoiceForm({
//                   ...invoiceForm,
//                   workmanship24: e.target.value,
//                 })
//               }
//             />

//             <input
//               placeholder="المدفوع"
//               value={invoiceForm.paid}
//               onChange={(e) =>
//                 setInvoiceForm({ ...invoiceForm, paid: e.target.value })
//               }
//             />

//             <button>حفظ الفاتورة</button>
//           </form>
//         </section>
//       </div>

//       {/* كشف الحساب */}
//       <section className="card">
//         <h2>كشف الحساب</h2>

//         {selectedCustomer && (
//           <>
//             <h3>
//               إجمالي الوزن عيار 21: {total21Weight.toFixed(2)} جرام
//             </h3>

//             <h3>
//               إجمالي المصنعيات: {totalWork.toFixed(2)}
//             </h3>

//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>وزن 21</th>
//                   <th>وزن 24</th>
//                   <th>مكافئ 24 → 21</th>
//                   <th>الإجمالي 21</th>
//                   <th>المصنعية</th>
//                   <th>مدفوع</th>
//                   <th>تاريخ</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {customerInvoices.map((inv) => (
//                   <tr key={inv.id}>
//                     <td>{inv.id}</td>
//                     <td>{inv.weight21}</td>
//                     <td>{inv.weight24}</td>
//                     <td>{inv.eq24.toFixed(2)}</td>
//                     <td>{inv.totalWeight21.toFixed(2)}</td>
//                     <td>{inv.totalWorkmanship}</td>
//                     <td>{inv.paid}</td>
//                     <td>{inv.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </section>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  const [invoiceForm, setInvoiceForm] = useState({
    weight21: "",
    weight24: "",
    workmanship21: "",
    workmanship24: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    goldPaid: "",
    goldKarat: "21",
    moneyPaid: "",
  });

  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")) || []);
    setInvoices(JSON.parse(localStorage.getItem("invoices")) || []);
    setPayments(JSON.parse(localStorage.getItem("payments")) || []);
  }, []);

  const convertTo21 = (weight, karat) => {
    if (karat === "24") return weight * (999.9 / 875);
    if (karat === "18") return weight * (750 / 875);
    return weight;
  };

  // إضافة عميل
  const addCustomer = (e) => {
    e.preventDefault();

    if (!customerForm.name) return alert("اكتب اسم العميل");

    const newCustomer = { id: Date.now(), ...customerForm };

    const updated = [...customers, newCustomer];
    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));

    setCustomerForm({ name: "", phone: "", notes: "" });
  };

  // إضافة فاتورة
  const addInvoice = (e) => {
    e.preventDefault();

    if (!selectedCustomer) return alert("اختار عميل");

    const w21 = Number(invoiceForm.weight21 || 0);
    const w24 = Number(invoiceForm.weight24 || 0);

    const eq24 = convertTo21(w24, "24");

    const newInvoice = {
      id: Date.now(),
      customer_id: selectedCustomer.id,
      weight21: w21,
      weight24: w24,
      eq24,
      totalWeight21: w21 + eq24,
      workmanship21: Number(invoiceForm.workmanship21 || 0),
      workmanship24: Number(invoiceForm.workmanship24 || 0),
      totalWorkmanship:
        Number(invoiceForm.workmanship21 || 0) +
        Number(invoiceForm.workmanship24 || 0),
      date: new Date().toLocaleString(),
    };

    const updated = [...invoices, newInvoice];
    setInvoices(updated);
    localStorage.setItem("invoices", JSON.stringify(updated));

    setInvoiceForm({
      weight21: "",
      weight24: "",
      workmanship21: "",
      workmanship24: "",
    });
  };

  // إضافة سداد
  const addPayment = (e) => {
    e.preventDefault();

    if (!selectedCustomer) return alert("اختار عميل");

    const gold = convertTo21(
      Number(paymentForm.goldPaid || 0),
      paymentForm.goldKarat
    );

    const newPayment = {
      id: Date.now(),
      customer_id: selectedCustomer.id,
      goldPaid: gold,
      moneyPaid: Number(paymentForm.moneyPaid || 0),
    };

    const updated = [...payments, newPayment];
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));

    setPaymentForm({
      goldPaid: "",
      goldKarat: "21",
      moneyPaid: "",
    });
  };

  const customerInvoices = invoices.filter(
    (i) => i.customer_id === selectedCustomer?.id
  );

  const customerPayments = payments.filter(
    (p) => p.customer_id === selectedCustomer?.id
  );

  const totalGold = customerInvoices.reduce(
    (acc, i) => acc + i.totalWeight21,
    0
  );

  const totalWork = customerInvoices.reduce(
    (acc, i) => acc + i.totalWorkmanship,
    0
  );

  const paidGold = customerPayments.reduce(
    (acc, p) => acc + p.goldPaid,
    0
  );

  const paidMoney = customerPayments.reduce(
    (acc, p) => acc + p.moneyPaid,
    0
  );

  const remainGold = totalGold - paidGold;
  const remainMoney = totalWork - paidMoney;

  const handleSearch = (v) => {
    setSearch(v);
    const all = JSON.parse(localStorage.getItem("customers")) || [];

    if (!v) return setCustomers(all);

    setCustomers(
      all.filter(
        (c) =>
          c.name.includes(v) ||
          c.phone.includes(v) ||
          String(c.id).includes(v)
      )
    );
  };

  return (
    <div className="app">
      <h1>Gold Shop</h1>

      <div className="grid">
        {/* العملاء */}
        <section className="card">
          <form onSubmit={addCustomer}>
            <input
              placeholder="اسم"
              value={customerForm.name}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, name: e.target.value })
              }
            />
            <input
              placeholder="موبايل"
              value={customerForm.phone}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, phone: e.target.value })
              }
            />
            <button>حفظ</button>
          </form>

          <input
            placeholder="بحث"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {customers.map((c) => (
            <div key={c.id} onClick={() => setSelectedCustomer(c)}>
              {c.name}
            </div>
          ))}
        </section>

        {/* الفاتورة */}
        <section className="card">
          <h3>فاتورة</h3>

          <form onSubmit={addInvoice}>
            <input
              placeholder="وزن 21"
              value={invoiceForm.weight21}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, weight21: e.target.value })
              }
            />

            <input
              placeholder="مصنعية 21"
              value={invoiceForm.workmanship21}
              onChange={(e) =>
                setInvoiceForm({
                  ...invoiceForm,
                  workmanship21: e.target.value,
                })
              }
            />

            <input
              placeholder="وزن 24"
              value={invoiceForm.weight24}
              onChange={(e) =>
                setInvoiceForm({ ...invoiceForm, weight24: e.target.value })
              }
            />

            <input
              placeholder="مصنعية 24"
              value={invoiceForm.workmanship24}
              onChange={(e) =>
                setInvoiceForm({
                  ...invoiceForm,
                  workmanship24: e.target.value,
                })
              }
            />

            <button>حفظ فاتورة</button>
          </form>
        </section>

        {/* السداد */}
        <section className="card">
          <h3>سداد</h3>

          <form onSubmit={addPayment}>
            <input
              placeholder="دهب مدفوع"
              value={paymentForm.goldPaid}
              onChange={(e) =>
                setPaymentForm({
                  ...paymentForm,
                  goldPaid: e.target.value,
                })
              }
            />

            <select
              value={paymentForm.goldKarat}
              onChange={(e) =>
                setPaymentForm({
                  ...paymentForm,
                  goldKarat: e.target.value,
                })
              }
            >
              <option value="21">21</option>
              <option value="24">24</option>
              <option value="18">18</option>
            </select>

            <input
              placeholder="فلوس مدفوعة"
              value={paymentForm.moneyPaid}
              onChange={(e) =>
                setPaymentForm({
                  ...paymentForm,
                  moneyPaid: e.target.value,
                })
              }
            />

            <button>تسجيل سداد</button>
          </form>
        </section>
      </div>

      {/* النتيجة */}
      {selectedCustomer && (
        <section className="card">
          <h3>الحساب</h3>

          <p>إجمالي دهب: {totalGold.toFixed(2)} جرام</p>
          <p>مدفوع دهب: {paidGold.toFixed(2)} جرام</p>
          <p>الباقي دهب: {remainGold.toFixed(2)} جرام</p>

          <hr />

          <p>إجمالي أجر: {totalWork.toFixed(2)}</p>
          <p>مدفوع أجر: {paidMoney.toFixed(2)}</p>
          <p>الباقي أجر: {remainMoney.toFixed(2)}</p>
        </section>
      )}
    </div>
  );
}