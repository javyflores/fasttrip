// backend/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const { requestService } = require('../controllers/clientController');

router.post('/request', requestService);

module.exports = router;