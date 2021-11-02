var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:3001/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Top Orders API' });
});

module.exports = router;
