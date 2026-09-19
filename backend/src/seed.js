require('dotenv').config();
const db = require('./db');
const { seedSeries } = require('./seed');

seedSeries();

console.log('Seed complete. Database is ready.');

db.close();
