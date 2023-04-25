const http = require('http');
const route = require('./route');

http.createServer(route.requestHandler).listen(4500, () => {
    console.log('Server listening on port 4500');
});