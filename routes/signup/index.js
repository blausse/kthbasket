const express = require('express');
const router = express.Router();
const controller = require('./signup.controller');

router.get('/',controller.signup);

module.exports = router;