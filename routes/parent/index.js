const express = require('express');
const router = express.Router();
const controller = require('./parent.controller');

router.get('/',controller.parent);

module.exports = router;