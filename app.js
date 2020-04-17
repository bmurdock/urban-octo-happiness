// tell our application that we want to use express
const express = require('express');

// my fake data
const contacts = [{
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];

// Define the port number for our app to run on
const port = 3000;

// Define our application
const app = express();

// Middleware Goes Here
app.use(middle);

app.use(express.static('public'));

function middle(request, response, next) {
    console.log(`Incoming request: ${request.originalUrl}`);
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

// route to lookup contact information
app.get('/lookup/:name/:prop', (req, res, next) => {
    const {
        name,
        prop
    } = req.params;

    lookUpProfile(name, prop)
        .then((result) => {
            // Set response header
            res.set({
                "Content-Type": "application/json"
            });
            res.json(result);
        })
        .catch((err) => {
            console.log('Error fetching profile.');
            res.json(err);
        });
});

function lookUpProfile(name, prop) {
    return new Promise((resolve, reject) => {
        let found = false;
        let propExists = false;
        for (let i = 0, len = contacts.length; i < len; i++) {
            let contact = contacts[i];
            if (contact.firstName === name) {
                found = true;
                let keys = Object.keys(contact);
                if (keys.indexOf(prop) !== -1) {
                    resolve(contact[prop]);
                }
                break;
            }
        }
        if (!found) {
            reject("No such name found.");
        }
        if (!propExists) {
            reject("No such property");
        }
    });
}

// Tell the app to listen for requests on our port number
app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting our app: ${err}`);
    }
    console.log(`Application is running on port: ${port}....`);
});