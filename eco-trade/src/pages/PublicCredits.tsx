import { useEffect, useState } from "react";
import axios from "axios";

interface PublicCredit {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  generatedAt: string;
}

export default function PublicCredits() {
  const [credits, setCredits] = useState<PublicCredit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get("http://localhost:1818/public-credits");
        setCredits(res.data);
      } catch (err) {
        console.error("Erro ao carregar créditos públicos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Carregando créditos públicos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Créditos Públicos 🌱</h1>

      {credits.length === 0 ? (
        <p className="text-gray-400">Nenhum crédito público registrado.</p>
      ) : (
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Quantidade</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Gerado em</th>
            </tr>
          </thead>
          <tbody>
            {credits.map((c) => (
              <tr key={c.id} className="border-b border-gray-700">
                <td className="p-3">{c.id}</td>
                <td className="p-3">{c.amount} ECO</td>
                <td className="p-3 capitalize">{c.status}</td>
                <td className="p-3">
                  {new Date(c.generatedAt).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
