import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api"; // ✅ importa a função do api.ts

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const data = await login(email, senha); // ✅ usa login do api.ts
      // token já salvo automaticamente no localStorage pelo api.ts
      navigate("/dashboard");
    } catch (error) {
      setErro("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Acesso ao Sistema
        </h1>

        <div className="mb-4 text-left">
          <label className="block text-gray-600 mb-1 font-medium">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu e-mail"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-gray-600 mb-1 font-medium">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="Digite sua senha"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none text-black bg-white"
          />
        </div>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-gray-600 text-sm">
          Ainda não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-medium hover:underline"
          >
            Registrar-se
          </Link>
        </p>
      </form>
    </div>
  );
}
