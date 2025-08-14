const express = require('express');
const { createCause } = require('../controllers/authController');
const router = express.Router();

// POST /api/causes
router.post('/', createCause);

module.exports = router;
