const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/geocode', async (req, res) => {
  try {
    const address = req.query.address;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Google Maps API' });
  }
});

router.get('/directions', async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin: origin,
        destination: destination,
        key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Google Maps API' });
  }
});

router.get('/restaurants', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: '-0.1806532,-78.4678382', // Coordenadas de Quito
        radius: 5500, // Radio en metros
        type: 'restaurant',
        key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Google Places API' });
  }
});

router.get('/restaurantsGYE', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: '-2.1850615,-80.0489018', // Coordenadas de Quito
        radius: 5500, // Radio en metros
        type: 'restaurant',
        key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Google Places API' });
  }
});

module.exports = router;
