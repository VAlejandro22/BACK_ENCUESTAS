// src/db.js
const nano = require('nano')('http://admin:admin@localhost:5984'); // Cambia los datos de conexión
const db = nano.db.use('surveys'); // Usa la base de datos 'survey'

module.exports = db;
