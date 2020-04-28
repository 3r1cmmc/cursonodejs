var http = require("http");
var url = require("url");
var querystring = require("querystring");
//var log = require("./modules/my-log"); -- Exportacion global
var { info, error } = require("./modules/my-log"); // Exportacion parcial
var { countries } = require("countries-list");

var server = http.createServer(function(request, response) {

    var parsed = url.parse(request.url);
    console.log("parsed: ",parsed);
    
    var pathname = parsed.pathname;
    var query = querystring.parse(parsed.query);
    console.log("Query: ",query);

    //console.log(pathname);
    if (pathname === "/") {
        response.writeHead(200, { "Conten-Type": "Text/html" });
        response.write("<html><body><p>Home Page</p></body></html>");
        response.end();
    } else if (pathname === "/exit") {
        response.writeHead(200, { "Conten-Type": "Text/html" });
        response.write("<html><body><p>BYE!!!</p></body></html>");
        response.end();
    } else if (pathname === "/country") {
        response.writeHead(200, { "Conten-Type": "application/json" });
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    }else if (pathname === "/info") {
        var result = info(pathname);
        //var result = log.info(pathname); -- Exportacion global
        response.writeHead(200, { "Conten-Type": "Text/html" });
        response.write(result);
        response.end();
    } else if (pathname === "/error") {
        var result = error(pathname); // Exportacion parcial
        //var result = log.error(pathname); -- Exportacion global
        response.writeHead(200, { "Conten-Type": "Text/html" });
        response.write(result);
        response.end();
    } else {
        response.writeHead(404, { "Conten-Type": "'Text/html" });
        response.write("<html><body><p>Not Found</p></body></html>");
        response.end();
    }

});

server.listen(4000);
console.log("Runing on 4000");