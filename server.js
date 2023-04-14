//imports
var express = require('express');
var bodyParser=require('body-parser');
var apiRouter=require('./apiRouter').router
const cors=require('cors');
//instanciation server
var server=express();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }

  
server.use(cors(corsOptions));
//body parser configuration,retrieving all the field in a request body
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

//configure route

// server.get('/',function(req,res){
//     res.setHeader('Content-Type','text/html')
//     res.status(200).send('<h3>bonjour</h3>')
// });

server.use('/api/',apiRouter)

server.listen(5000,function(){
    console.log('server is listening');
});