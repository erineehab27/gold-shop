// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );





import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PrintPage from "./printpage.jsx";
import StockPage from "./StockPage";

<Route path="/stock" element={<StockPage />} />
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/print" element={<PrintPage />} />
    </Routes>
  </BrowserRouter>
);