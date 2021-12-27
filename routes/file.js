var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require( "marked" );
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

router.get('/', function(req, res) {
    const {type,path} = req.query
    var paths ="file/"+ path;
    console.log(paths)
    fs.readFile(paths, function(err, data){
        if(err){
            console.log(err);
            res.send("文件不存在！");
        }else{
            str = marked.marked(data.toString());
            if(type==='JSON'){
                res.json({
                    data:str,
                    success:true,
                    // req:req
                })
            }else{
                res.render('mark-down',{str});
            }
            
           
        } 
    });
});
module.exports = router;
