import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { OrderContextProvider } from "./Context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <OrderContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </OrderContextProvider>
    </BrowserRouter>
  </StrictMode>
);
