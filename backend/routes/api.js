// backend/routes/api.js
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/usuarios', getUsers);

module.exports = router;