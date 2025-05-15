// backend/models/user.js
const db = require('./db');

async function findUserByEmail(email) {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
}

module.exports = {
  findUserByEmail
};