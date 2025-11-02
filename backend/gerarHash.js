// geraHash.js (CommonJS) — roda com: node geraHash.js
const bcrypt = require("bcrypt");

async function gerar() {
  try {
    const senha = "123456"; // coloque aqui a senha que quer gerar
    const hash = await bcrypt.hash(senha, 10);
    console.log("Hash gerado:", hash);
  } catch (err) {
    console.error("Erro ao gerar hash:", err);
    process.exit(1);
  }
}

gerar();
