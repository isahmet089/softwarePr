const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/:type/:id',paymentController.getPayment);

module.exports = router;