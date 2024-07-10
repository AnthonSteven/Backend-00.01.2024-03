const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/', packageController.getAllPackages);
router.post('/create', packageController.createPackage);

module.exports = router;
