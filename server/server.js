var http = require("http"),
	AWS = require('aws-sdk');

http.createServer(function (request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}).listen(process.env.PORT || 8888);
