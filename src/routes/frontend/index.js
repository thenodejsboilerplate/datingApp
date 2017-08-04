"use strict";
const express = require('express');
const router = express.Router();

const main = require('../../controllers/main');

/* GET home page. */
router.get('/', main.home);
router.post('/filter', main.filter)
router.get('/expatsData', main.expatsData)
//router.get('/about', main.about);

module.exports = router;
