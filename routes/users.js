var express = require('express');
var router = express.Router();
let db = require('../model/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getUserInfo', function(req, res, next) {
  console.log(req.query.user_mid);
  let param = {
    user_mid : req.query.user_mid
  };
  let sql = `SELECT * FROM user WHERE user_mid= ${param.user_mid}`;
  let connection = db.connection();
  db.select(connection, sql, function(result){
    // console.log(res);
    res.render('userInfo', result[0]);
  })
  db.close(connection);

});
router.get('/getUserList', function(req, res, next){
  let sql = 'SELECT * FROM user WHERE user_mid<10';
  let connection = db.connection();
  db.select(connection, sql, function(result){
    // console.log(result)
    res.render('userList', {"userInfo":result});
  
  })
  db.close(connection);
})

module.exports = router;
