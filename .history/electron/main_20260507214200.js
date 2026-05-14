const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

let db;

function initDB() {
  db = new Database("gold.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      type TEXT,
      total REAL,
      paid REAL
    );
  `);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  initDB();
  createWindow();
});

ipcMain.handle("addCustomer", (_, data) => {
  const result = db
    .prepare("INSERT INTO customers (name, phone) VALUES (?, ?)")
    .run(data.name, data.phone);

  return result.lastInsertRowid;
});

ipcMain.handle("getCustomers", () => {
  return db.prepare("SELECT * FROM customers").all();
});

ipcMain.handle("addInvoice", (_, data) => {
  db.prepare(
    "INSERT INTO invoices (customer_id, type, total, paid) VALUES (?, ?, ?, ?)"
  ).run(data.customer_id, data.type, data.total, data.paid);
});

ipcMain.handle("getStatement", (_, customerId) => {
  const invoices = db
    .prepare("SELECT * FROM invoices WHERE customer_id=?")
    .all(customerId);

  let balance = 0;

  invoices.forEach(i => {
    if (i.type === "sale") balance += i.total - i.paid;
    else balance -= i.total - i.paid;
  });

  return { invoices, balance };
});