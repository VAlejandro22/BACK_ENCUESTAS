// src/index.js
const express = require('express');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 3011;

app.use(express.json());

app.get('/encuestas', async (req, res) => {
  try {
    const { rows } = await db.list({ include_docs: true });
    const encuestas = rows.map(row => row.doc);
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/encuestas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await db.get(id);
    res.json(encuesta);
  } catch (error) {
    res.status(404).json({ error: 'Encuesta no encontrada' });
  }
});

app.post('/encuestas', async (req, res) => {
    const nuevaEncuesta = req.body;
    try {
      const response = await db.insert(nuevaEncuesta);
      res.status(201).json({ id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/encuestasAREAS', async (req, res) => {
    const nuevaEncuesta = req.body;
    try {
      const response = await db.insert(nuevaEncuesta);
      res.status(201).json({ id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.put('/encuestas/:id', async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const encuesta = await db.get(id);
    encuesta.survey = datosActualizados;
    const response = await db.insert(encuesta);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/encuestasFormI/:id', async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const encuesta = await db.get(id);
    encuesta.form = datosActualizados;
    const response = await db.insert(encuesta);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/encuestas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await db.get(id);
    const response = await db.destroy(encuesta._id, encuesta._rev);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
