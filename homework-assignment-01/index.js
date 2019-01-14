/*
**   The Node.js Masterclass
**   ------------------------
**   Homework Assignment 01
**
*/

// Dependencies
var http          = require('http'),
    url           = require('url'),
    StringDecoder = require('string_decoder').StringDecoder;

// Get request's info.
var server            = http.createServer(function(req,res){
var parsedUrl         = url.parse(req.url,true);
var path              = parsedUrl.pathname;
var trimmedPath       = path.replace(/^\/+|\/+$/g,'');
var queryStringObject = parsedUrl.query;
var method            = req.method.toLowerCase();    
var headers           = req.headers;
    
// Get request's payload, if any. Buffer it.
var decoder = new StringDecoder('utf-8');
var requestPayloadBuffer = '';

req.on('data',function(requestPayload){
       requestPayloadBuffer += decoder.write(requestPayload); 
});

// Process the request and send the response
req.on('end',function(){
        
        // Buffer the request payload's tail.
        requestPayloadBuffer += decoder.end();
        
        // Select a handler for this request.
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        
        // Construct the data object to send to the handler.
        var data = {
            'trimmedPath'       : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method'            : method,
            'headers'           : headers,
            'payload'           : requestPayloadBuffer          
        };
        
        // Route the request to the handler chosen from the router.
        chosenHandler(data,function(statusCode,responsePayload){
        
            // Set defaults for the handler.
            statusCode = typeof(statusCode) ===  'number' ? statusCode : 200;
            responsePayload = typeof(responsePayload) === 'object' ? responsePayload : {};
            
            // Convert the response payload to a string.
            var responsePayloadString = JSON.stringify(responsePayload);
            
            // Send the reponse
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(responsePayloadString);
        
            // Log the request response.
            console.log('Returning this response: ', statusCode,responsePayloadString);
        });
    });
});

// Start the server on port 3000
server.listen(3000, function(){
    console.log('\n\nThe server is listening on port 3000 now.\n\n');
});
   
// Define the handlers
var handlers={};

handlers.hello = function(data,callback){

    // Callback an http status code, and a payload object
    callback(200,{'greeting' : 'Hello world! I fully understand this code and that feels awesome!'});
};

handlers.notFound = function(data,callback) {
    callback(404);
};

// Define a request router
var router = {
  'hello' : handlers.sample  
};

    
    
    
    
    