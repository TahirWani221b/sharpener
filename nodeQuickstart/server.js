const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request.url, request.method, request.headers);
    response.setHeader('content-type', 'text/html');
    response.write('<html>');
    response.write('<head><title>server response</title></head>');
    response.write('<body><h1>');
    if (request.url == '/home') response.write('welcome home');
    if (request.url == '/about') response.write('Welcome to About Us page');
    if (request.url == '/node') response.write('Welcome to my Node Js project');
    response.write('</h1></body>');
    response.write('</html>');
    response.end();
    //process.exit();
});

server.listen(4500, () => {
    console.log('Server listening on port 4500');
});