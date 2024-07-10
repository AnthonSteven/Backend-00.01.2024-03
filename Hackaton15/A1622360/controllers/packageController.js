const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPackage = async (req, res) => {
  const { name } = req.body;

  try {
    const newPackage = await Package.create({ name });
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
