import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("eco_current_user");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-black/90 backdrop-blur-lg shadow-lg"
          : "bg-black/70 backdrop-blur-md"
      } text-white`}
    >
      <div className="w-full h-20 flex items-center justify-center px-10 max-w-screen-xl mx-auto">
        {/* Container central com todos os itens alinhados horizontalmente */}
        <div className="flex items-center justify-between w-full max-w-5xl">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-emerald-300 hover:text-emerald-200 transition duration-300 tracking-wide"
          >
            EcoSystem 🌿
          </Link>

          {/* Links centrais */}
          <div className="flex items-center justify-center gap-10 text-lg font-medium">
            <Link
              to="/dashboard"
              className={`transition duration-300 ${
                location.pathname === "/dashboard"
                  ? "text-emerald-300 border-b-2 border-emerald-300 pb-1"
                  : "text-white/90 hover:text-emerald-200"
              }`}
            >
              Dashboard
            </Link>

            {/* 🔹 Registrar Créditos */}
            <Link
              to="/register-credits"
              className={`transition duration-300 ${
                location.pathname === "/register-credits"
                  ? "text-emerald-300 border-b-2 border-emerald-300 pb-1"
                  : "text-white/90 hover:text-emerald-200"
              }`}
            >
              Registrar Créditos
            </Link>

            {/* 🔹 Criar Conta */}
            <Link
              to="/register"
              className={`transition duration-300 ${
                location.pathname === "/register"
                  ? "text-emerald-300 border-b-2 border-emerald-300 pb-1"
                  : "text-white/90 hover:text-emerald-200"
              }`}
            >
              Criar Conta
            </Link>

            {/* 🔹 Comprar */}
            <Link
              to="/trade"
              className={`transition duration-300 ${
                location.pathname === "/trade"
                  ? "text-emerald-300 border-b-2 border-emerald-300 pb-1"
                  : "text-white/90 hover:text-emerald-200"
              }`}
            >
              Comprar
            </Link>
          </div>

          {/* Botão "Entrar" */}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="bg-white text-black font-semibold px-5 py-2 rounded-xl shadow-lg hover:bg-emerald-500 hover:text-white hover:scale-105 transition-all duration-300"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
