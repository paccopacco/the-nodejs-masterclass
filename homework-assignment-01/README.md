#The Node.js Masterclass - Homework Assignment 01

This is a minimal routing app that will provide a greeting response from a single path in the form of a JSON object.

##INSTRUCTIONS

* On the command line execute:

    ```node index.js```
    
* Use Postman to issue a request to:

    ```localhost:5000/hello```
    
    or
    
    ```localhost:5000/hello/```
    
    This will send back a JSON object with a greeting and a 200 'OK' HTTP Status Code.

* A request to the same path with a query string, such as:

    ```localhost:5000/hello/?fizz=buzz```
    
    will also issue the same response since the query string is being handled separately from the path.

* Any other route will issue a 404 'Not Found' HTTP Status Code.