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
import { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [customers, setCustomers] = useState([]);

  // تحميل العملاء من LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(saved);
  }, []);

  // حفظ عميل
  const saveCustomer = () => {
    if (!name || !phone) {
      alert("اكتب الاسم ورقم الموبايل");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      note,
    };

    const updated = [...customers, newCustomer];

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));

    // تفريغ الفورم
    setName("");
    setPhone("");
    setNote("");

    alert("تم حفظ العميل ✅");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>إضافة عميل</h2>

      <input
        placeholder="اسم العميل"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        placeholder="رقم الموبايل"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />

      <input
        placeholder="ملاحظات"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <br />

      <button onClick={saveCustomer}>حفظ العميل</button>

      <hr />

      <h3>العملاء:</h3>
      {customers.map((c) => (
        <div key={c.id}>
          {c.name} - {c.phone}
        </div>
      ))}
    </div>
  );
}