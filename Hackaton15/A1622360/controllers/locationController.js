const Location = require('../models/Location');

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const newLocation = await Location.create({ latitude, longitude });
    res.json(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
