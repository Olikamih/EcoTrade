import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, getUsers } from "../api/api";

interface User {
  id: string;
  email: string;
  role: string;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSuccess("");

    if (!captchaChecked) {
      setErro("Por favor, confirme que você não é um robô 🤖");
      return;
    }

    try {
      const token = localStorage.getItem("eco_token") || ""; // ✅ token
      const users = await getUsers(token); // ✅ passou token
      const exists = users.find((u: User) => u.email === email);

      if (exists) {
        setErro("E-mail já registrado!");
        return;
      }

      await registerUser({ email, password: senha, role: "empresa" });

      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErro("Erro ao registrar usuário.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Registrar Conta</h1>

        <div className="mb-4 text-left">
          <label className="block text-gray-600 mb-1 font-medium">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Digite seu e-mail" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-gray-600 mb-1 font-medium">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="Digite sua senha" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
        </div>

        <div className="mb-6 flex items-center space-x-2">
          <input type="checkbox" checked={captchaChecked} onChange={(e) => setCaptchaChecked(e.target.checked)} id="captcha" className="w-5 h-5 accent-emerald-500" />
          <label htmlFor="captcha" className="text-gray-700 text-sm select-none">Eu não sou um robô 🤖</label>
        </div>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}
        {success && <p className="text-emerald-500 text-sm mb-4">{success}</p>}

        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition">Registrar</button>

        <p className="mt-4 text-sm text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-emerald-600 hover:underline">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
