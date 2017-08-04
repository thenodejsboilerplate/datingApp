"use strict";
const express = require('express');
const router = express.Router();

const expat = require('../../controllers/expat'),
      user = require('../../controllers/user'),
      auth = require('../../middlewares/auth');

/* GET home page. */
router.get('/expatInfo', expat.getExpatInfo);
router.post('/expatInfo',auth.isLoggedIn, expat.postExpatInfo);
router.get('/expatUpload',auth.isLoggedIn, expat.expatUpload);
router.post('/expatUpload',auth.isLoggedIn, expat.expatUploadPost);
// router.get('/uploadJson',auth.isLoggedIn, expat.uploadJson);

router.get('/', expat.expatProfile)
module.exports = router;