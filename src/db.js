// src/db.js
const nano = require('nano')('http://admin:EnErGy1@couchdb_ENERGY:5984'); // Cambia los datos de conexión
const db = nano.db.use('survey'); // Usa la base de datos 'survey'

module.exports = db;
