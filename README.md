EcoTrade 🌿

Sistema de gerenciamento de créditos de carbono, com frontend moderno em React + TypeScript e backend escalável em NestJS + TypeScript.

⚡ Tecnologias

Frontend: React, TypeScript, TailwindCSS, Recharts

Backend: NestJS, TypeScript, TypeORM

Banco de dados: PostgreSQL (ou MySQL)

Controle de versão: Git + GitHub

📂 Estrutura do Projeto
EcoTrade/
├─ backend/        # Código do backend (NestJS)
├─ eco-trade/      # Código do frontend (React)
├─ README.md       # Este arquivo
└─ .gitignore

🚀 Rodando o projeto localmente
1️⃣ Backend
cd backend
npm install


Configure o banco de dados local (PostgreSQL ou MySQL).

Crie .env com:

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=eco_trade
PORT=1818

npm run typeorm:migrate
npm run start:dev


O backend rodará em http://localhost:1818
.

2️⃣ Frontend
cd eco-trade
npm install
npm run dev


O frontend estará disponível em http://localhost:5173
.

🔗 Sobre api.ts

Responsável por conectar frontend e backend.

Depende do backend rodando na URL correta e do token de login (eco_token) salvo no localStorage.

⚠️ Possíveis erros:

Erro	Significado
401 Unauthorized	Login falhou ou token inválido
403 Forbidden	Tentativa de acessar rota restrita (admin)
Cannot read property X of undefined	Backend não retornou dados esperados

💡 Dicas:

Sempre inicie o backend primeiro, depois o frontend.

Verifique se o .env está correto.

Se mudar host ou porta do backend, atualize api.ts.

📝 Observações

Banco de dados não enviado para o GitHub.

Quem clonar deve criar o banco e configurar .env.

Ordem de execução: backend → frontend → login → funcionalidades.              


SEMANA UBIQUA UNAMA ALCINDO CACELA - Belém/ Kamila Ferreira de Oliveira, João Paulo, Victor Davi e Malvo. Veteranos. 31/11/2025
