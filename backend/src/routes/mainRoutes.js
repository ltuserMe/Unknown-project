// src/routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getHome);
router.post('/data', mainController.postData);
router.get('/getMsg', mainController.getMessage);

module.exports = router;