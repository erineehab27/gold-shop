
import { useState } from "react";

export default function PrintPage() {
  const [items, setItems] = useState([
    { name: "", count: "", karat: "", weight: "", workmanship: "" },
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { name: "", count: "", karat: "", weight: "", workmanship: "" },
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const fix = (num) => Number(num.toFixed(2));

  // حساب الوزن الكلي
  const totalWeight = fix(
    items.reduce((sum, item) => {
      const count = Number(item.count || 0);
      const weight = Number(item.weight || 0);
      return sum + count * weight;
    }, 0)
  );

  // حساب المصنعية
  const totalWorkmanship = fix(
    items.reduce((sum, item) => {
      const count = Number(item.count || 0);
      const weight = Number(item.weight || 0);
      const workmanship = Number(item.workmanship || 0);

      // لو الوزن صغير (قطعة) → المصنعية للقطعة
      if (weight <= 1) {
        return sum + count * workmanship;
      }

      // غير كده → المصنعية للجرام
      return sum + count * weight * workmanship;
    }, 0)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>فاتورة أصناف</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>الصنف</th>
            <th>العدد</th>
            <th>العيار</th>
            <th>وزن القطعة (جرام)</th>
            <th>المصنعية</th>
            <th>الوزن الكلي</th>
            <th>مصنعية الصنف</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => {
            const count = Number(item.count || 0);
            const weight = Number(item.weight || 0);
            const workmanship = Number(item.workmanship || 0);

            const itemWeight = fix(count * weight);

            let itemWorkmanship = 0;

            if (weight <= 1) {
              itemWorkmanship = fix(count * workmanship);
            } else {
              itemWorkmanship = fix(count * weight * workmanship);
            }

            return (
              <tr key={i}>
                <td>
                  <input
                    value={item.name}
                    onChange={(e) =>
                      updateItem(i, "name", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={item.count}
                    onChange={(e) =>
                      updateItem(i, "count", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={item.karat}
                    onChange={(e) =>
                      updateItem(i, "karat", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) =>
                      updateItem(i, "weight", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={item.workmanship}
                    onChange={(e) =>
                      updateItem(i, "workmanship", e.target.value)
                    }
                  />
                </td>

                <td>{itemWeight}</td>
                <td>{itemWorkmanship}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />

      <button onClick={addRow}>+ إضافة صنف</button>

      <h3>إجمالي الوزن: {totalWeight} جرام</h3>
      <h3>إجمالي المصنعية: {totalWorkmanship} جنيه</h3>

      <br />

      <button onClick={() => window.print()}>طباعة</button>
    </div>
  );
}









