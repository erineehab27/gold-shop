const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addCustomer: (data) => ipcRenderer.invoke("addCustomer", data),
  getCustomers: () => ipcRenderer.invoke("getCustomers"),
  addInvoice: (data) => ipcRenderer.invoke("addInvoice", data),
  getStatement: (id) => ipcRenderer.invoke("getStatement", id)
});