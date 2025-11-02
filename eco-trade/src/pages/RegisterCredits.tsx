import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function RegisterCredits() {
  const [quantity, setQuantity] = useState<number>(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("eco_token");

  const handleSubmit = async () => {
    if (!token) {
      alert("⚠️ Faça login primeiro.");
      return;
    }
    if (quantity <= 0) {
      alert("⚠️ Quantidade inválida.");
      return;
    }

    try {
      await api.post(
        "/credits",
        { amount: quantity },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ envia token
      );

      alert("✅ Crédito registrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar crédito:", error);
      alert("❌ Erro ao registrar crédito.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="bg-gradient-to-b from-emerald-900/80 to-emerald-950/70 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-emerald-700/30">
        <h2 className="text-3xl font-extrabold text-emerald-300 mb-6 text-center">Registrar Créditos</h2>
        <div className="mb-6 text-left">
          <label htmlFor="quantity" className="block text-lg text-gray-200 mb-2 font-medium">Quantidade de créditos</label>
          <input id="quantity" type="number" min="1" placeholder="Ex: 50" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        <button onClick={handleSubmit} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out w-full">Registrar</button>
      </div>
    </div>
  );
}
