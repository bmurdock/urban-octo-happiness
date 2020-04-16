// tell our application that we want to use express
const express = require('express');

// Define the port number for our app to run on
const port = 3000;

// Define our application
const app = express();


// Middleware Goes Here
app.use(middle);

app.use(express.static('public'));

function middle(request, response, next) {
    console.log('Server has received a request...');
    next();
}


/*
    All of your custom routes should be defined here
*/

app.get('/secret', (req, res, next) => {
    const number = Math.random();
    res.send(`Your secret number is ${number}`);
});

app.get('/other', (req, res, next) => {
    // Set response header
    res.set({
        "Content-Type": "text/html"
    });

    // Define the response body as HTML (in a string)
    const body = `
        <h1>Other Route!</h1>
        <p>You have requested an HTML response</p>
    `;
    res.send(body);

});



// Tell the app to listen for requests on our port number
app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting our app: ${err}`);
    }
    console.log(`Application is running on port: ${port}....`);
});