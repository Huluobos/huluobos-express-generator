var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require( "marked" );

router.post('/', function(req, res) {
    var path="./font-end/ts-china/ts-link.md";
    fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.send("文件不存在！");
        }else{
            console.log(data);
            str = marked(data.toString());
            // console.log(str);
            res.json(str) ;
        } 
    });
});
module.exports = router;
