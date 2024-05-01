// Imports the Express Module 
const express = require("express");

// Creates a Server with Express
const app = express();

// Listens for HTTP Requests on Port 3000
const port = 3000; 

// Responds to Get Requests 
app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });

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

    // A Script for the File System to Handle Errors and Content Requests (Callback Function)
    fs.readFile(filePath, (err, content) =>  {

        // Send a 404 Error if There was an Error During the File Read
        if (err) {

            // Join the Directed File Path for the 404 HTML File, Read that File, Callback Function for Reading the File
            fs.readFile(path.join(__dirname, '404.html'), (err, content) => {

                // File Not Found
                if (err) {
                    // Handle the case where the 404.html file could not be read
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.end('<h1>500 Internal Server Error</h1><p>The error page could not be displayed.</p>', 'utf-8');

                // File Found
                } else {
                    // If the file is found and read successfully, send it as the response
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.end(content, 'utf-8');
                }
            });
        
        // Send the Requested File with a 200 Status Code
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(content, 'utf-8');
        }
    });

// Tells the Server to Listen at Port 8080 for Requests
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
