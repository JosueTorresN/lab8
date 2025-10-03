const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyApiKey = require('../middleware/apiKey');

// POST /auth/login: Protegido con API Key
router.post('/login', verifyApiKey, authController.login);

module.exports = router;