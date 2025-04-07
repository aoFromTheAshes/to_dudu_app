import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; // Отримуємо змінну з .env

console.log('Перевірка CLIENT_ID:', CLIENT_ID);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
console.log(CLIENT_ID)
