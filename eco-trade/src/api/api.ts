import axios from "axios";
import type { Credit, Transaction, User } from "../types/types";

export const api = axios.create({
  baseURL: "http://localhost:1818",
});

// AUTENTICAÇÃO
export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("eco_token", res.data.access_token);
  localStorage.setItem("eco_user", JSON.stringify(res.data.user));
  return res.data;
}

export async function registerUser(data: { email: string; password: string; role?: string }) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

// USUÁRIOS
export async function getUsers(token: string): Promise<User[]> {
  const res = await api.get("/users", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}

// CRÉDITOS
export async function getCredits(token: string): Promise<Credit[]> {
  const res = await api.get("/credits", { headers: { Authorization: `Bearer ${token}` } });
  return res.data.map((c: any) => ({
    id: c.id,
    producerId: c.producerId,
    producerName: c.origin || "Produtor desconhecido",
    quantity: Number(c.amount),
    date: c.generatedAt ?? new Date().toISOString(),
    approved: c.status === "approved",
  }));
}

export async function getPublicCredits(): Promise<Credit[]> {
  const res = await api.get("/credits/public-credits");
  return res.data.map((c: any) => ({
    id: c.id,
    producerId: c.producerId ?? "public",
    producerName: c.producerName ?? c.origin ?? "Produtor desconhecido",
    quantity: Number(c.amount ?? 0),
    date: c.generatedAt ?? new Date().toISOString(),
    approved: true,
  }));
}

// COMPRA DE CRÉDITOS
export async function buyCredit(
  creditId: string,
  buyerId: string,
  quantity: number,
  token: string
) {
  const res = await api.post(
    "/transactions",
    { creditId, buyerId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// TRANSAÇÕES
export async function getTransactions(token: string): Promise<Transaction[]> {
  const res = await api.get("/transactions", { headers: { Authorization: `Bearer ${token}` } });
  return res.data.map((tx: any) => ({
    id: tx.id,
    buyerId: tx.buyerId,
    buyerName: tx.buyerName ?? "ECO",
    sellerId: tx.sellerId,
    sellerName: tx.sellerName ?? "ECO",
    quantity: Number(tx.quantity),
    date: tx.generatedAt ?? tx.date ?? new Date().toISOString(),
  }));
}
