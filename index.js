const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.set('view engine', 'ejs');

// Define routes
const mapsRoutes = require('./routes/maps');
app.use('/api/maps', mapsRoutes);

// Renderizar la página principal
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
