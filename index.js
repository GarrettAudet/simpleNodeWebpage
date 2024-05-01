// Imports the Express, A Way to Interact with the Server File System, and Utilities for working with File/Directory Path Modules 
const express = require("express");
const fs = require('fs');
const path = require('path');

// Creates a Server with Express
const app = express();

// Listens for HTTP Requests on Port 3000
const port = 3000; 

// Responds to Get Requests 
app.get("/", (request, response) => {
    // Determine the Base File on the URL Path
    let baseFileName;
    if (request.url === '/') {
        baseFileName = 'index.html';

    // Appends HTML if Needed
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
});
  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

