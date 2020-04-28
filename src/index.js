const express = require('express');

const { info, error } = require('./modules/my-log');
const { countries } = require('countries-list');

const app = express();

app.get('/', function (request, response) {
  response.status(200).send('Hello');
});

app.get('/info', function (request, response) {
  info('Hola info');
  response.send('Info nodemon');
});

app.get('*', function (request, response) {
  response.status(404).send('NOT FOUND');
});

// var server = http.createServer(function(request, response) {

//     var parsed = url.parse(request.url);
//     console.log("parsed: ",parsed);

//     var pathname = parsed.pathname;
//     var query = querystring.parse(parsed.query);
//     console.log("Query: ",query);

//     //console.log(pathname);
//     if (pathname === "/") {
//         response.writeHead(200, { "Conten-Type": "Text/html" });
//         response.write("<html><body><p>Home Page</p></body></html>");
//         response.end();
//     } else if (pathname === "/exit") {
//         response.writeHead(200, { "Conten-Type": "Text/html" });
//         response.write("<html><body><p>BYE!!!</p></body></html>");
//         response.end();
//     } else if (pathname === "/country") {
//         response.writeHead(200, { "Conten-Type": "application/json" });
//         response.write(JSON.stringify(countries[query.code]));
//         response.end();
//     }else if (pathname === "/info") {
//         var result = info(pathname);
//         //var result = log.info(pathname); -- Exportacion global
//         response.writeHead(200, { "Conten-Type": "Text/html" });
//         response.write(result);
//         response.end();
//     } else if (pathname === "/error") {
//         var result = error(pathname); // Exportacion parcial
//         //var result = log.error(pathname); -- Exportacion global
//         response.writeHead(200, { "Conten-Type": "Text/html" });
//         response.write(result);
//         response.end();
//     } else {
//         response.writeHead(404, { "Conten-Type": "'Text/html" });
//         response.write("<html><body><p>Not Found</p></body></html>");
//         response.end();
//     }

// });

app.listen(4000, function () {
  console.log('Runing on 4000');
});
