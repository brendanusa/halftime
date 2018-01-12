var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    stuff: 'hello'
  }, {
    id: 2,
    stuff: 'hey'
  }])
});

module.exports = router;
