// updateSingleUser.js (ESM)
import pkg from 'pg';
import bcrypt from 'bcrypt';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',       // seu usuário do Postgres
  host: 'localhost',
  database: 'ecotrade',
  password: '0',       // sua senha do Postgres
  port: 5432,
});

await client.connect();

const senhaNova = '123456';
const hash = await bcrypt.hash(senhaNova, 10);

await client.query('UPDATE "user" SET password = $1 WHERE email = $2', [
  hash,
  'kamila@teste.com'
]);

console.log('Senha atualizada com sucesso!');
await client.end();
