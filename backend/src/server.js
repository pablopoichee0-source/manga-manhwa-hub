require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const { series: demoSeries } = require('./data');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir, limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadDir));

const tokenFor = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; next();
  });
};
const admin = (req, res, next) => req.user?.role === 'admin'
  ? next() : res.status(403).json({ message: 'Administrator access required' });
const parseItem = (row) => row ? ({ ...row, genres: JSON.parse(row.genres || '[]'), chapters: JSON.parse(row.chapters || '[]') }) : null;
const selectCatalog = 'SELECT id,title,slug,type,status,score,cover,description,author,genres,chapters FROM catalog';

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Nombre, correo y contraseña de 6 caracteres son obligatorios' });
  const hash = await bcrypt.hash(password, 12);
  db.run('INSERT INTO users (name,email,password,role) VALUES (?,?,?,\'user\')', [name, email.toLowerCase(), hash], function (error) {
    if (error) return res.status(error.code === 'SQLITE_CONSTRAINT' ? 409 : 500).json({ message: 'No se pudo crear la cuenta' });
    const user = { id: this.lastID, name, email: email.toLowerCase(), role: 'user' };
    res.status(201).json({ token: tokenFor(user), user });
  });
});

app.post('/api/auth/login', (req, res) => {
  db.get('SELECT id,name,email,password,role FROM users WHERE email=?', [req.body.email?.toLowerCase()], async (error, user) => {
    if (error || !user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Credenciales inválidas' });
    const { password, ...safeUser } = user;
    res.json({ token: tokenFor(safeUser), user: safeUser });
  });
});

app.get('/api/profile', auth, (req, res) => db.get('SELECT id,name,email,role FROM users WHERE id=?', [req.user.id], (error, user) => error || !user ? res.status(404).json({ message: 'Usuario no encontrado' }) : res.json({ user })));

app.get('/api/catalog', (req, res) => {
  db.all(`${selectCatalog} WHERE status='published' ORDER BY updated_at DESC`, [], (error, rows) => {
    if (error || !rows.length) return res.json({ items: demoSeries.map((item) => ({ ...item, chaptersCount: item.chapters.length })) });
    res.json({ items: rows.map((row) => ({ ...parseItem(row), chaptersCount: parseItem(row).chapters.length })) });
  });
});
app.get('/api/catalog/:id', (req, res) => db.get(`${selectCatalog} WHERE id=? AND status='published'`, [req.params.id], (error, row) => {
  if (row) return res.json({ item: parseItem(row) });
  const item = demoSeries.find((entry) => entry.id === req.params.id);
  return item ? res.json({ item }) : res.status(404).json({ message: 'Serie no encontrada' });
}));

app.get('/api/favorites', auth, (req, res) => db.all('SELECT series_id FROM favorites WHERE user_id=? ORDER BY created_at DESC', [req.user.id], (e, rows) => res.json({ items: rows?.map((r) => r.series_id) || [] })));
app.post('/api/favorites/:id', auth, (req, res) => db.get('SELECT id FROM favorites WHERE user_id=? AND series_id=?', [req.user.id, req.params.id], (e, row) => {
  if (row) return db.run('DELETE FROM favorites WHERE id=?', [row.id], () => res.json({ isFavorite: false }));
  db.run('INSERT INTO favorites (user_id,series_id) VALUES (?,?)', [req.user.id, req.params.id], () => res.status(201).json({ isFavorite: true }));
}));
app.get('/api/progress', auth, (req, res) => db.all('SELECT series_id,chapter_number FROM progress WHERE user_id=? ORDER BY updated_at DESC', [req.user.id], (e, rows) => res.json({ items: rows || [] })));
app.post('/api/progress/:id', auth, (req, res) => db.run(`INSERT INTO progress(user_id,series_id,chapter_number) VALUES(?,?,?) ON CONFLICT(user_id,series_id) DO UPDATE SET chapter_number=excluded.chapter_number,updated_at=CURRENT_TIMESTAMP`, [req.user.id, req.params.id, req.body.chapter_number], () => res.json({ message: 'Progreso guardado' })));

// Admin API: all routes below require a JWT with role=admin.
app.get('/api/admin/stats', auth, admin, (req, res) => {
  db.get('SELECT COUNT(*) AS users FROM users', (_, users) => db.get("SELECT COUNT(*) AS series FROM catalog WHERE status='published'", (_, published) => db.get('SELECT COUNT(*) AS chapters FROM catalog', (_, chapters) => res.json({ users: users?.users || 0, series: published?.series || 0, chapters: chapters?.chapters || 0 }))));
});
app.get('/api/admin/series', auth, admin, (req, res) => db.all(`${selectCatalog} ORDER BY updated_at DESC`, [], (e, rows) => res.json({ items: (rows || []).map(parseItem) })));
app.post('/api/admin/series', auth, admin, (req, res) => {
  const { title, type, status='draft', score=0, cover='', description='', author='', genres=[] } = req.body;
  if (!title || !type) return res.status(400).json({ message: 'Título y tipo son obligatorios' });
  const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`;
  db.run('INSERT INTO catalog (id,title,slug,type,status,score,cover,description,author,genres,chapters) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id,title,id,type,status,score,cover,description,author,JSON.stringify(genres), '[]'], function (e) {
    if (e) return res.status(500).json({ message: 'No se pudo crear la serie' });
    db.get(`${selectCatalog} WHERE id=?`, [id], (_, row) => res.status(201).json({ item: parseItem(row) }));
  });
});
app.put('/api/admin/series/:id', auth, admin, (req, res) => {
  const { title, type, status, score, cover, description, author, genres } = req.body;
  db.run('UPDATE catalog SET title=?,type=?,status=?,score=?,cover=?,description=?,author=?,genres=?,updated_at=CURRENT_TIMESTAMP WHERE id=?', [title,type,status,score,cover,description,author,JSON.stringify(genres || []),req.params.id], function (e) {
    if (!this.changes) return res.status(404).json({ message: 'Serie no encontrada' });
    db.get(`${selectCatalog} WHERE id=?`, [req.params.id], (_, row) => res.json({ item: parseItem(row) }));
  });
});
app.delete('/api/admin/series/:id', auth, admin, (req, res) => db.run('DELETE FROM catalog WHERE id=?', [req.params.id], function () { res.json({ deleted: Boolean(this.changes) }); }));
app.post('/api/admin/series/:id/chapters', auth, admin, (req, res) => {
  db.get(`${selectCatalog} WHERE id=?`, [req.params.id], (e, row) => {
    if (!row) return res.status(404).json({ message: 'Serie no encontrada' });
    const chapters = JSON.parse(row.chapters || '[]');
    const chapter = { number: Number(req.body.number), title: req.body.title, pages: req.body.pages || [], published: Boolean(req.body.published) };
    if (!chapter.number || !chapter.title) return res.status(400).json({ message: 'Número y título son obligatorios' });
    const next = [...chapters.filter((item) => item.number !== chapter.number), chapter].sort((a,b) => a.number-b.number);
    db.run('UPDATE catalog SET chapters=?,updated_at=CURRENT_TIMESTAMP WHERE id=?', [JSON.stringify(next), req.params.id], () => res.status(201).json({ chapter }));
  });
});
app.delete('/api/admin/series/:id/chapters/:number', auth, admin, (req, res) => db.get(`${selectCatalog} WHERE id=?`, [req.params.id], (_, row) => {
  if (!row) return res.status(404).json({ message: 'Serie no encontrada' });
  const chapters = JSON.parse(row.chapters || '[]').filter((item) => item.number !== Number(req.params.number));
  db.run('UPDATE catalog SET chapters=?,updated_at=CURRENT_TIMESTAMP WHERE id=?', [JSON.stringify(chapters), req.params.id], () => res.json({ deleted: true }));
}));
app.post('/api/admin/upload', auth, admin, upload.array('pages', 100), (req, res) => res.status(201).json({ files: (req.files || []).map((file) => `/uploads/${file.filename}`) }));
app.get('/api/admin/users', auth, admin, (req, res) => db.all('SELECT id,name,email,role,created_at FROM users ORDER BY created_at DESC', [], (_, rows) => res.json({ items: rows || [] })));
app.patch('/api/admin/users/:id/role', auth, admin, (req, res) => db.run('UPDATE users SET role=? WHERE id=?', [req.body.role === 'admin' ? 'admin' : 'user', req.params.id], function () { res.json({ updated: Boolean(this.changes) }); }));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
