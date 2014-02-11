// Import http module
var http = require("http");
var handler = require("./request-handler.js");
var url = require('url');

var port = 8080;
var ip = "127.0.0.1";

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
var pokeServer = http.createServer(handler.handleRequest);

pokeServer.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.



 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
