const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController');

router.get('/', voyageController.getVoyage);

module.exports = router;