var http = require('http');
var url = require('url');
var fs = require('fs');

var out = '';

http.createServer(function(request, response) {
	var contentType = 'text/html';
	var responseCode = 200;
	var path = url.parse(request.url).path.substr(1);
	var out = '';
	if (path.length == 0) {
		path = '5.html';
	}
	if (fs.existsSync(path)) {
		console.log(path + ' exists');
		out = fs.readFileSync(path, {encoding:'utf-8'});
		var index = path.lastIndexOf('/');
		console.log(index);
		if (index != -1) {
			var ext = path.substr(0, index);
			index = ext.lastIndexOf('.');
			if (index != -1) {
				ext = ext.substr(index);
				console.log('ext = ' + ext);
				if (ext == 'svg') {
					contentType = 'image/svg';
				}
			}
		}
	} else {
		responseCode = 404;
		console.log(path + ' not exists');
	}
	
	console.log(path);

	response.writeHeader(responseCode, {"Content-Type": contentType});
	if (responseCode != 404) {
		response.write(out);	
	}
	response.end();
}).listen(8080);