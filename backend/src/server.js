require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { series } = require('./data');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  });
};

const buildSeriesResponse = (seriesItem) => ({
  ...seriesItem,
  chaptersCount: seriesItem.chapters.length,
  chapterList: seriesItem.chapters
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MangaManhwa Hub API is running' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Email already registered' });
        }
        return res.status(500).json({ message: 'Failed to create user' });
      }

      const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        token,
        user: { id: this.lastID, name, email }
      });
    }
  );
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

app.get('/api/profile', authenticateToken, (req, res) => {
  db.get('SELECT id, name, email FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  });
});

app.get('/api/catalog', (req, res) => {
  const filtered = series.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    type: item.type,
    status: item.status,
    score: item.score,
    cover: item.cover,
    description: item.description,
    genres: item.genres,
    chaptersCount: item.chapters.length
  }));

  return res.json({ items: filtered });
});

app.get('/api/catalog/:id', (req, res) => {
  const item = series.find((entry) => entry.id === req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Series not found' });
  }

  return res.json({ item: buildSeriesResponse(item) });
});

app.get('/api/favorites', authenticateToken, (req, res) => {
  db.all('SELECT series_id FROM favorites WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to load favorites' });
    }

    const favoriteSeries = rows.map((row) => row.series_id);
    return res.json({ items: favoriteSeries });
  });
});

app.post('/api/favorites/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.get('SELECT * FROM favorites WHERE user_id = ? AND series_id = ?', [userId, id], (err, existing) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (existing) {
      db.run('DELETE FROM favorites WHERE user_id = ? AND series_id = ?', [userId, id], function () {
        return res.json({ message: 'Removed from favorites', isFavorite: false });
      });
      return;
    }

    db.run('INSERT INTO favorites (user_id, series_id) VALUES (?, ?)', [userId, id], function () {
      return res.status(201).json({ message: 'Added to favorites', isFavorite: true });
    });
  });
});

app.get('/api/progress', authenticateToken, (req, res) => {
  db.all('SELECT series_id, chapter_number FROM progress WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to load reading progress' });
    }

    return res.json({ items: rows });
  });
});

app.post('/api/progress/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { chapter_number } = req.body;

  if (!chapter_number) {
    return res.status(400).json({ message: 'Chapter number is required' });
  }

  db.run(
    `INSERT INTO progress (user_id, series_id, chapter_number)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, series_id)
     DO UPDATE SET chapter_number = excluded.chapter_number, updated_at = CURRENT_TIMESTAMP`,
    [req.user.id, id, chapter_number],
    function () {
      return res.json({ message: 'Reading progress updated', chapter_number });
    }
  );
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
