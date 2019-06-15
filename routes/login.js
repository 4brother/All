var express = require('express');
var router = express.Router();
var utility = require('utility');
let db = require('../model/db');

/* GET home page. */
router.get('/',function(req,res,next){
  res.render('login')
});
router.post('/submit',function(req,res,next){
    console.log(req.body)
    let name = req.body.name;
    let password = utility.md5(req.body.password);
    let sql = `SELECT * FROM admin WHERE name=${name} AND password="${password}"`;
    console.log(sql)
    let connection = db.connection();
    db.query(connection,sql,(result)=>{
      if(result.length > 0){
        req.session.ID = result[0].ID;
        req.session.name = result[0].name;
        res.redirect('../index/home');
      }else {
        res.send(`<script>
                    alert('登录失败，请重新登录');
                    location.href="../login";
                  </script>`);
      }
    });
    db.close(connection);
});
module.exports = router;