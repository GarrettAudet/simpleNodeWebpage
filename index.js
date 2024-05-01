// Imports the Express, A Way to Interact with the Server File System, and Utilities for working with File/Directory Path Modules 
const express = require("express");
const path = require('path');

// Creates a Server with Express
const app = express();

// Listens for HTTP Requests on Port 3000
const port = 3000; 

// Serves static files from a directory named 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Custom 404 Handler as middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Starts the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

