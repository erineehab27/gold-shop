import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PrintPage() {
  const { state } = useLocation();
  const { invoices, selectedCustomer } = state || {};

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  if (!selectedCustomer) return <p>لا يوجد بيانات</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>فاتورة العميل</h2>
      <h3>{selectedCustomer.name}</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>عيار</th>
            <th>وزن</th>
            <th>مصنعية</th>
          </tr>
        </thead>
        <tbody>
          {invoices
            .filter((i) => i.customer_id === selectedCustomer.id)
            .map((inv) => (
              <tr key={inv.id}>
                <td>{inv.karat}</td>
                <td>{inv.weight}</td>
                <td>{inv.workmanship}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}



