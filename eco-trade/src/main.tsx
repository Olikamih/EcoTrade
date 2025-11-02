import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Importações de componentes e páginas
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RegisterCredits from "./pages/RegisterCredits";
import Trade from "./pages/Trade";
import PublicCredits from "./pages/PublicCredits"; // 🔹 nova página

// 🔹 Importações de assets e estilos
import bg from "./assets/bg.jpg";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Fundo com overlay e leve animação */}
      <div
        className="min-h-screen bg-cover bg-center bg-fixed relative animate-parallax"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* Conteúdo das rotas */}
        <main className="relative pt-24 px-6 md:px-12 text-center text-white transition-opacity duration-700 ease-in-out">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-credits" element={<RegisterCredits />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/public-credits" element={<PublicCredits />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// 🔹 Renderização principal
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
