import { useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [statement, setStatement] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");

  async function loadCustomers() {
    const data = await window.api.getCustomers();
    setCustomers(data);
  }

  async function addCustomer() {
    if (!name) return alert("اكتب اسم");

    await window.api.addCustomer({ name, phone });
    setName("");
    setPhone("");
    loadCustomers();
  }

  async function selectCustomer(c) {
    setSelected(c);
    const data = await window.api.getStatement(c.id);
    setStatement(data);
  }

  async function addInvoice(type) {
    if (!selected) return alert("اختار عميل");

    await window.api.addInvoice({
      customer_id: selected.id,
      type,
      total: Number(amount),
      paid: Number(paid)
    });

    setAmount("");
    setPaid("");

    selectCustomer(selected);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Gold Shop System</h1>

      <h2>إضافة عميل</h2>
      <input
        placeholder="اسم العميل"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="رقم التليفون"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button onClick={addCustomer}>إضافة</button>

      <h2>العملاء</h2>
      {customers.map(c => (
        <div
          key={c.id}
          style={{ cursor: "pointer", marginBottom: 5 }}
          onClick={() => selectCustomer(c)}
        >
          {c.name} ({c.phone})
        </div>
      ))}

      {selected && (
        <>
          <h2>العميل: {selected.name}</h2>

          <input
            placeholder="المبلغ"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <input
            placeholder="المدفوع"
            value={paid}
            onChange={e => setPaid(e.target.value)}
          />

          <button onClick={() => addInvoice("sale")}>بيع</button>
          <button onClick={() => addInvoice("purchase")}>شراء</button>

          <h3>الرصيد: {statement?.balance}</h3>

          {statement?.invoices.map(i => (
            <div key={i.id}>
              {i.type} | {i.total} | {i.paid}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;