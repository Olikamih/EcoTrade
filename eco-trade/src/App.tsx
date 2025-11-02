// 🔹 Importações de bibliotecas
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Importações de componentes e páginas
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RegisterCredits from "./pages/RegisterCredits";
import Trade from "./pages/Trade";

// 🔹 Importações de assets e estilos
import bg from "./assets/bg.jpg";
import "./index.css";

// 🔹 Componente principal
export default function App() {
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
            {/* Página inicial */}
            <Route path="/" element={<Home />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Criar Conta (registro de usuário) */}
            <Route path="/register" element={<Register />} />

            {/* Registrar Créditos */}
            <Route path="/register-credits" element={<RegisterCredits />} />

            {/* Página de compra */}
            <Route path="/trade" element={<Trade />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
