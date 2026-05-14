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