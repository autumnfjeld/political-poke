// Import necessary modules
 var url = require('url');
 var path = require('path');
 var fs = require('fs');


var getData = function(request, response){
  console.log('~~~~ in GET request in');
	 if (request.url === '/') {
    sendFiles(request, response, "/client/index.html");
  }else{
  	sendResponse(response, 404);
  }
};

var options = function(request, response){
  sendResponse(response, 200, headers);
};

// routing for handler functions
var methods = {
	'GET'			: getData,
	//'POST'		: '',
	'OPTIONS'	: options
};

// request handler function returned 
exports.handleRequest = function(request, response){
	console.log('trying to handle request', request.method);
	var method = methods[request.method];
	method ? method(request, response) : exports.sendResponse(response, 404);
}


/*** Server helper functions ********************************************/

var sendResponse = function(response, status, data){
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

var sendFiles = function(request, response, resource){
	console.log('process.cwd()', process.cwd());
  var filename = path.join (process.cwd(), resource);
  fs.readFile(filename, function(err, html){
    if (err) {
    	throw (err);
    }else{
      response.writeHead(200, {'Content-Type':'text'});
      response.write(html);
      response.end();
    }
  });
};

var headers = {
  //"Content-Type": "json/application",
  "Content-Type": "text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
