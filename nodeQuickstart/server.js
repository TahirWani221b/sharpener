const http = require('http');

const server = http.createServer((request, response) => {
    console.log('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});