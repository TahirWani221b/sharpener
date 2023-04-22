const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    // console.log(request.url, request.method, request.headers);
    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.setHeader('content-type', 'text/html');
        fs.readFile('main.txt', { encoding: 'utf-8' }, (error, data) => {
            if (error) {
                console.log(error);
            }
            response.write('<html>');
            response.write('<head><title>server response</title></head>');
            response.write('<body>' + data + '</body>');
            response.write('<body><form method="POST" action="/message"><input type="text" name="message"><input type="submit"></form></body>');
            response.write('</html>');
            return response.end();
        })
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        return request.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('main.txt', message, (error) => {
                if (error) console.log(error);
                else {
                    response.statusCode = 302;
                    response.setHeader('Location', '/')
                    return response.end();
                }

            });

        });

    }
    response.setHeader('content-type', 'text/html');
    response.write('<html>');
    response.write('<head><title>server response</title></head>');
    response.write('<body><h1>Welcome to node js module</h1></body>');
    response.write('</html>');
    response.end();
    //process.exit();
});

server.listen(4500, () => {
    console.log('Server listening on port 4500');
});