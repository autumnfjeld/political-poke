var express = require('express');
var pokeServer = express();
var url = require('url');
var path = require('path');
var fs = require('fs');

console.log('__dirname', __dirname)
//experss.static takes a path, makes it public
pokeServer.use(express.static(__dirname + '/client'));

// pokeServer.get('/', function(req, res){
     
// });

pokeServer.listen(8080);
console.log('Listening on port 8080');
