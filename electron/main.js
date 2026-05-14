const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require("better-sqlite3");

let db;

function initDatabase() {
  db = new Database("gold_shop.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      type TEXT NOT NULL, 
      karat TEXT NOT NULL,
      weight REAL NOT NULL,
      gram_price REAL NOT NULL,
      workmanship REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      paid REAL DEFAULT 0,
      total REAL NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(customer_id) REFERENCES customers(id)
    );
  `);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  initDatabase();
  createWindow();
});

ipcMain.handle("add-customer", (event, customer) => {
  const stmt = db.prepare(`
    INSERT INTO customers (name, phone, notes)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(customer.name, customer.phone, customer.notes);
  return { id: result.lastInsertRowid };
});

ipcMain.handle("get-customers", () => {
  return db.prepare(`SELECT * FROM customers ORDER BY id DESC`).all();
});

ipcMain.handle("search-customers", (event, keyword) => {
  return db.prepare(`
    SELECT * FROM customers
    WHERE name LIKE ? OR phone LIKE ? OR id LIKE ?
    ORDER BY id DESC
  `).all(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
});

ipcMain.handle("add-invoice", (event, invoice) => {
  const total =
    invoice.weight * invoice.gram_price +
    Number(invoice.workmanship || 0) -
    Number(invoice.discount || 0);

  const stmt = db.prepare(`
    INSERT INTO invoices
    (customer_id, type, karat, weight, gram_price, workmanship, discount, paid, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    invoice.customer_id,
    invoice.type,
    invoice.karat,
    invoice.weight,
    invoice.gram_price,
    invoice.workmanship || 0,
    invoice.discount || 0,
    invoice.paid || 0,
    total
  );

  return { id: result.lastInsertRowid, total };
});

ipcMain.handle("get-customer-statement", (event, customerId) => {
  const invoices = db.prepare(`
    SELECT * FROM invoices
    WHERE customer_id = ?
    ORDER BY id DESC
  `).all(customerId);

  let balance = 0;

  invoices.forEach(inv => {
    if (inv.type === "sale") {
      balance += inv.total - inv.paid;
    }

    if (inv.type === "purchase") {
      balance -= inv.total - inv.paid;
    }
  });

  return {
    invoices,
    balance
  };
});