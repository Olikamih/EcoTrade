import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 px-6">
      {/* Título animado */}
      <motion.h1
        className="text-5xl font-extrabold text-emerald-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bem-vindo ao <span className="text-white">EcoSystem 🌿</span>
      </motion.h1>

      {/* Texto descritivo */}
      <motion.p
        className="max-w-2xl text-lg text-gray-200 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Plataforma de gestão e negociação de créditos ecológicos.  
        Registre, acompanhe e negocie seus créditos de sustentabilidade.  
        Juntos, construímos um futuro mais verde. 💚
      </motion.p>

      {/* Botão de acesso */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Link
          to="/login"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          Entrar e Ver Créditos
        </Link>
      </motion.div>
    </div>
  );
}
