import { useEffect, useState } from "react";
import { getCredits, buyCredit } from "../api/api";
import type { Credit } from "../types/types";

export default function Trade() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [amount, setAmount] = useState<number | string>("");

  // Pega usuário e token do localStorage
  const userRaw = localStorage.getItem("eco_user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const token = localStorage.getItem("eco_token");
  if (!token) {
    alert("Usuário não logado");
  }

  // 🔹 Busca créditos ao montar componente
  useEffect(() => {
    if (!token) return;
    getCredits(token).then(setCredits);
  }, [token]);

  // 🔹 Função de compra de crédito
  const handleBuy = async (c: Credit) => {
    if (!token) {
      alert("Usuário não logado");
      return;
    }

    const q = Number(amount);

    if (!user || user.role !== "company") {
      alert("Apenas empresas podem comprar créditos");
      return;
    }

    if (!q || q <= 0) {
      alert("Quantidade inválida");
      return;
    }

    if (q > c.quantity) {
      alert("Quantidade maior que a disponível");
      return;
    }

    try {
      await buyCredit(c.id, user.id, q, token); // ✅ token passado
      alert("Compra registrada!");
      const updated = await getCredits(token); // ✅ token passado
      setCredits(updated);
      setAmount("");
    } catch (err: any) {
      alert(err.message || "Erro ao comprar crédito");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800/70 p-8 rounded-2xl shadow-lg border border-emerald-500">
        <h2 className="text-3xl font-semibold text-emerald-300 mb-6 text-center">
          Mercado de Créditos 💰
        </h2>

        <div className="mb-6">
          <label className="block mb-2 text-gray-300">
            Quantidade a comprar
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Ex: 50 créditos"
          />
        </div>

        <div className="space-y-4">
          {credits.map((c) => (
            <div
              key={c.id}
              className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center border border-gray-600 hover:bg-gray-700/80 transition-all"
            >
              <div>
                <div className="font-semibold text-emerald-300">
                  {c.producerName}
                </div>
                <div className="text-sm text-gray-400">
                  {c.quantity} disponíveis •{" "}
                  {new Date(c.date).toLocaleDateString("pt-BR")}
                </div>
              </div>

              <button
                onClick={() => handleBuy(c)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
