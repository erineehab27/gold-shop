import { useEffect, useState } from "react";

export default function SuppliersPage() {

  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");

  const [goldIn, setGoldIn] = useState("");
  const [paidGold, setPaidGold] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [records, setRecords] = useState([]);

  const fix = (num) => Number(Number(num).toFixed(2));

  useEffect(() => {
    setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
    setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
  }, []);

  // ➕ إضافة مورد
  const addSupplier = () => {
    if (!name) return;

    const newSupplier = { id: Date.now(), name };
    const updated = [...suppliers, newSupplier];

    setSuppliers(updated);
    localStorage.setItem("suppliers", JSON.stringify(updated));

    setName("");
  };

  // ➕ تسجيل توريد
  const addRecord = () => {
    if (!selectedSupplier) return alert("اختاري مورد");

    const newRecord = {
      id: Date.now(),
      supplier_id: selectedSupplier.id,
      goldIn: Number(goldIn || 0),
      paidGold: Number(paidGold || 0)
    };

    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem("supplierRecords", JSON.stringify(updated));

    // 🔥 تزود الخزنة بالدهب
    const stock = JSON.parse(localStorage.getItem("stock")) || {};
    let currentGold = Number(stock.gold21 || 0);

    currentGold += Number(goldIn || 0);

    localStorage.setItem("stock", JSON.stringify({
      ...stock,
      gold21: currentGold
    }));

    setGoldIn("");
    setPaidGold("");
  };

  // 🧮 الحساب
  let totalIn = 0;
  let totalPaid = 0;

  records
    .filter(r => r.supplier_id === selectedSupplier?.id)
    .forEach(r => {
      totalIn += r.goldIn;
      totalPaid += r.paidGold;
    });

  const remaining = fix(totalIn - totalPaid);

  return (
    <div className="app">
      <h1>🏭 الموردين</h1>

      <section className="card">
        <h3>إضافة مورد</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={addSupplier}>إضافة</button>
      </section>

      <section className="card">
        <h3>اختيار مورد</h3>

        {suppliers.map(s => (
          <div key={s.id} onClick={() => setSelectedSupplier(s)}>
            {s.name}
          </div>
        ))}
      </section>

      {selectedSupplier && (
        <section className="card">
          <h3>{selectedSupplier.name}</h3>

          <label>دهب داخل</label>
          <input value={goldIn} onChange={(e) => setGoldIn(e.target.value)} />

          <label>سداد</label>
          <input value={paidGold} onChange={(e) => setPaidGold(e.target.value)} />

          <button onClick={addRecord}>تسجيل</button>

          <hr />

          <p>📥 إجمالي وارد: {fix(totalIn)}</p>
          <p>💰 مدفوع: {fix(totalPaid)}</p>
          <p>📉 المتبقي: {remaining}</p>
        </section>
      )}
    </div>
  );
}