// backend/routes/driverRoutes.js

const express = require('express');
const router = express.Router();
const { updateLocation, getNearbyServices, getCurrentLocation } = require('../controllers/driverController');

router.put('/update-location', updateLocation);
router.post('/nearby-services', getNearbyServices);
router.get('/current-location/:id_usuario', getCurrentLocation);

module.exports = router;