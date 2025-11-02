import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCredits, getTransactions, getPublicCredits } from "../api/api";
import type { Credit, Transaction } from "../types/types";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<"pizza" | "piramide">("pizza");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("eco_token");

      try {
        let creditsData: Credit[] = [];
        let txData: Transaction[] = [];

        if (token) {
          [creditsData, txData] = await Promise.all([
            getCredits(token),
            getTransactions(token),
          ]);
        } else {
          creditsData = await getPublicCredits();
          txData = []; // visitante não vê transações
        }

        setCredits(creditsData);
        setTransactions(txData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Carregando dados...
      </div>
    );

  const totalCredits = credits.reduce((sum, c) => sum + Number(c.quantity), 0);

  const creditsByProducer = credits.reduce<Record<string, number>>((acc, c) => {
    const name = c.producerName || "Produtor desconhecido";
    acc[name] = (acc[name] || 0) + Number(c.quantity);
    return acc;
  }, {});

  const chartData = Object.entries(creditsByProducer).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold text-emerald-300 mb-6">
          Painel de Controle 🌿
        </h1>

        <section className="bg-emerald-700/20 border border-emerald-500 rounded-2xl p-6 mb-10 shadow-lg">
          <h2 className="text-xl mb-2 font-medium">Saldo Total</h2>
          <p className="text-5xl font-bold text-emerald-300">
            {totalCredits} ECO
          </p>
          <p className="text-gray-400 mt-2">
            Créditos registrados por todos os produtores.
          </p>
        </section>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setChartType("pizza")}
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all ${
              chartType === "pizza"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            🍕 Gráfico de Pizza
          </button>
          <button
            onClick={() => setChartType("piramide")}
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all ${
              chartType === "piramide"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            🏔️ Gráfico de Pirâmide
          </button>
        </div>

        <section className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4 text-center">
            Distribuição de Créditos por Produtor
          </h2>

          {chartData.length > 0 ? (
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "pizza" ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10B981" barSize={30} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-400">Nenhum crédito disponível para exibir.</p>
          )}
        </section>

        {transactions.length > 0 && (
          <section className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Transações Recentes
            </h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-2">Comprador</th>
                  <th className="py-2">Vendedor</th>
                  <th className="py-2">Quantidade</th>
                  <th className="py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-700">
                    <td className="py-2">{tx.buyerName}</td>
                    <td className="py-2">{tx.sellerName}</td>
                    <td className="py-2">{tx.quantity} ECO</td>
                    <td className="py-2">
                      {tx.date
                        ? new Date(tx.date).toLocaleDateString("pt-BR")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
