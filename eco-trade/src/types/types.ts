// src/types/types.ts

export type Role = "produtor" | "empresa" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Credit {
  id: string;
  producerId: string;
  producerName: string;
  quantity: number;
  date: string; // formato ISO (ex: "2025-10-31")
  approved: boolean; // ✅ indica se o crédito foi aprovado pelo admin
}

export interface Transaction {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  date: string; // formato ISO
}
