const bcrypt = require('bcryptjs');
const db = require('./db');

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || 'Administrador';

if (!email || !password) {
  console.error('Define ADMIN_EMAIL y ADMIN_PASSWORD antes de crear el administrador.');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  db.run(
    `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')
     ON CONFLICT(email) DO UPDATE SET name=excluded.name, password=excluded.password, role='admin'`,
    [name, email, hash],
    (error) => {
      if (error) throw error;
      console.log(`Administrador listo: ${email}`);
      db.close();
    }
  );
});
