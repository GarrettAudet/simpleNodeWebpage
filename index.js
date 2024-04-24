// Used to create an HTTP Server
const http = require('http');

// Provides a way to interact with the server's file system
const fs = require('fs');

// Provided utilities for working with file and directory paths
const path = require('path');

const server = http.createServer((request, response) => {

    // Determine the Base File on the URL Path
    let baseFileName;
    if (request.url === '/') {
        baseFileName = 'index.html';
    } else {
        baseFileName = request.url + '.html'
    }
    
    // Combine the directory of the current script and the file name 
    let filePath = path.join(__dirname, baseFileName);

    fs.readFile(filePath, (err, content) =>  {
        if (err) {

        } else {

        }
    });

// Tells the Server to Listen at Port 8080 for Requests
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
