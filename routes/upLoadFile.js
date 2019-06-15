var express = require('express');
var router = express.Router();

var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');

// app.use('/public', express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(multer({ dest: './tmp/' }).array('file'));


router.post('/file_upload', function (req, res) {

     console.log(req.files[0]);  // 上传的文件信息

     var des_file = __dirname + "/../public/upLoadFile/images/" + req.files[0].originalname;
     console.log(des_file)
     fs.readFile(req.files[0].path, function (err, data) {
          fs.writeFile(des_file, data, function (err) {
               if (err) {
                    console.log(err);
               } else {
                    response = {
                         message: 'File uploaded successfully',
                         filename: req.files[0].originalname
                    };
               }
               console.log(response);
               //   res.end( JSON.stringify( response ) );
               res.render('success', response);
          });
     });
});

module.exports = router;