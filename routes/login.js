var express = require('express');
var router = express.Router();
let db = require('../model/db');
/* GET home page. */
router.get('/',function(req,res,next){
  res.render('login')
});
router.post('/submit',function(req,res,next){
    console.log(req.body)
    let name = req.body.name;
    let password = req.body.password;
    let sql = `SELECT * FROM admin WHERE name=${name} AND password="${password}"`;
    console.log(sql)
    let connection = db.connection();
    db.query(connection,sql,(result)=>{
      if(result.length > 0){
        req.session.ID = result[0].ID;
        req.session.name = result[0].name;
      }
        res.redirect('../index/home');
    });
    db.close(connection);
});
module.exports = router;