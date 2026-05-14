import { useEffect, useState } from "react";

export default function SuppliersPage() {

  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState("");

  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [goldIn, setGoldIn] = useState(""); // وارد
  const [workmanship, setWorkmanship] = useState(""); // مصنعية
  const [paidGold, setPaidGold] = useState(""); // سداد

  const [records, setRecords] = useState([]);

  const fix = (num) => Number(Number(num).toFixed(2));

  // تحميل البيانات
  useEffect(() => {
    setSuppliers(JSON.parse(localStorage.getItem("suppliers")) || []);
    setRecords(JSON.parse(localStorage.getItem("supplierRecords")) || []);
  }, []);

  // ➕ إضافة مورد
  const addSupplier = () => {
    if (!supplierName) return;

    const newSupplier = {
      id: Date.now(),
      name: supplierName
    };

    const updated = [...suppliers, newSupplier];

    setSuppliers(updated);
    localStorage.setItem("suppliers", JSON.stringify(updated));

    setSupplierName("");
  };

  // ➕ تسجيل حركة (توريد / سداد)
  const addRecord = () => {

    if (!selectedSupplier) return alert("اختاري مورد");

    const newRecord = {
      id: Date.now(),
      supplier_id: selectedSupplier.id,
      goldIn: Number(goldIn || 0),           // دهب داخل
      workmanship: Number(workmanship || 0), // مصنعية
      paidGold: Number(paidGold || 0)        // سداد
    };

    const updated = [...records, newRecord];

    setRecords(updated);
    localStorage.setItem("supplierRecords", JSON.stringify(updated));

    // 🔥 تحديث الخزنة تلقائي
    const stock = JSON.parse(localStorage.getItem("stock")) || {};

    let currentGold = Number(stock.gold21 || 0);

    // وارد → تزود
    currentGold += Number(goldIn || 0);

    // سداد → يقلل
    currentGold -= Number(paidGold || 0);

    localStorage.setItem("stock", JSON.stringify({
      ...stock,
      gold21: currentGold
    }));

    // reset
    setGoldIn("");
    setWorkmanship("");
    setPaidGold("");
  };

  // 🧮 الحساب
  let totalGoldIn = 0;
  let totalPaid = 0;
  let totalWork = 0;

  records
    .filter(r => r.supplier_id === selectedSupplier?.id)
    .forEach(r => {
      totalGoldIn += r.goldIn;
      totalPaid += r.paidGold;
      totalWork += r.workmanship;
    });

  const remaining = fix(totalGoldIn - totalPaid); // عليكي أو ليكي

  return (
    <div className="app">
      <h1>🏭 الموردين</h1>

      {/* إضافة مورد */}
      <section className="card">
        <h3>إضافة مورد</h3>

        <input
          placeholder="اسم المورد"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <button onClick={addSupplier}>إضافة</button>
      </section>

      {/* اختيار مورد */}
      <section className="card">
        <h3>الموردين</h3>

        {suppliers.map(s => (
          <div
            key={s.id}
            onClick={() => setSelectedSupplier(s)}
            style={{ cursor: "pointer", padding: "5px" }}
          >
            {s.name}
          </div>
        ))}
      </section>

      {/* بيانات المورد */}
      {selectedSupplier && (
        <section className="card">
          <h3>{selectedSupplier.name}</h3>

          <label>دهب وارد</label>
          <input
            value={goldIn}
            onChange={(e) => setGoldIn(e.target.value)}
          />

          <label>مصنعية</label>
          <input
            value={workmanship}
            onChange={(e) => setWorkmanship(e.target.value)}
          />

          <label>سداد</label>
          <input
            value={paidGold}
            onChange={(e) => setPaidGold(e.target.value)}
          />

          <button onClick={addRecord}>تسجيل</button>

          <hr />

          <h3>الحساب</h3>

          <p>📥 إجمالي وارد: {fix(totalGoldIn)}</p>
          <p>💰 مدفوع: {fix(totalPaid)}</p>
          <p>🛠️ مصنعية: {fix(totalWork)}</p>

          <h2>
            {remaining > 0
              ? `📉 عليكي للمورد: ${remaining}`
              : `📈 ليكي عند المورد: ${fix(Math.abs(remaining))}`}
          </h2>
        </section>
      )}
    </div>
  );
}