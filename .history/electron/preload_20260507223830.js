const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addCustomer: (customer) => ipcRenderer.invoke("add-customer", customer),
  getCustomers: () => ipcRenderer.invoke("get-customers"),
  searchCustomers: (keyword) => ipcRenderer.invoke("search-customers", keyword),
  addInvoice: (invoice) => ipcRenderer.invoke("add-invoice", invoice),
  getCustomerStatement: (customerId) =>
    ipcRenderer.invoke("get-customer-statement", customerId)
});