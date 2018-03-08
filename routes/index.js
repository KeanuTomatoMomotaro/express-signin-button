var express = require('express');
var router = express.Router();
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign in to Google', google_client_id: process.env.GOOGLE_CLIENT_ID });
});

module.exports = router;
