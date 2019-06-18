var express = require('express');
var router = express.Router();
let db = require('../model/db');
/* GET home page. */
let login = require('./login')

// router.use(function (req,res,next) {
//   console.log(req.session)
//   if(!req.session.ID || !req.session.name){
//     return res.redirect('../login');
//   }
//   next();
// })

router.get('/home', function(req, res, next) {
  let page=req.query.page?req.query.page:1;
  let size=10;
  let start = (page-1)*10;
  let sql = `SELECT *,(SELECT COUNT(*) FROM user) AS count FROM user LIMIT ${start},${size}`;
  console.log(sql);
  let connection = db.connection();
  db.query(connection,sql,function(result){
    // console.log(result)
    res.render('index', { title: 'home',userList: result,pages: Math.ceil(result[0].count/10),page:page ,startPage: page-10>0?page-3:page,endPage: Number(page)+9<Math.ceil(result[0].count/10)?Number(page)+6:Math.ceil(result[0].count/10)});
  })
  db.close(connection);
});
router.get('/news', function(req,res,nex){
  res.render('news', {title: 'news'})
});
router.get('/form', function(req, res, next){
  res.render('form', {title: 'form'})
})
router.post('/insert', function(req,res,next){
  console.log(req.body)
  let name = req.body.name;
  let password = req.body.password;
  let connection = db.connection();
  let sql = `INSERT INTO admin(name,password) VALUES('${name}','${password}');`;
  db.query(connection,sql,function(result){
    console.log(result.insertId);
  })
  db.close(connection);
  res.json(result.toString());
})
router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('../login');
})

router.get('/api/:id/:name', function(req,res,nex){
  let data = {
    a: 1,
    n: 2
  }
  console.log(req.params)
  console.log(req.query)
  res.json(data)
})


router.route('/test')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  let data = {
    a: 'all'
  }
  next();
  // res.json(data)
})
.get(function(req, res, next) {
  let data = {
    a: 'get'
  }
  res.json(data)
})
.post(function(req, res, next) {
  let data = {
    a: 'post'
  }
  res.status(404).json(data)
})
.put(function (req,res,next) {
  let data = {
    a: 'put'
  }
  res.json(data)
})
;
module.exports = router;
