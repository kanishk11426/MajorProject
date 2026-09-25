const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');

// app.use((req, res, next) => {
//     console.log("Hi I am 1st  middleware");
//     next();
//     console.log("this is after next()");
// });

// app.use((req, res, next) => {
//     console.log("Hi I am 2nd middleware");
//     next();
// });

console.log("Checking is done and everything seems FINE.");
console.log("From my -------------------->>>>>------------------personal system");
    
app.use("/random", (req, res, next) => {
    req.time = new Date(Date.now());
    console.log(req.method, req.path, req.hostname, req.time);
    console.log("I'm only for /random route");
    next();
});

const checkToken =  (req, res, next) => {
    let {token} = req.query;
    if (token === "giveaccess") {
        console.log("Token is correct");
        next();
    } else {
        throw new ExpressError(401, "Access Denied");
    }
};

app.get("/api", checkToken, (req, res) => {
    res.send("Hi I am api");
});

app.get("/",(req,res)=>{
    console.log("Root was called");
    res.send("Hi I am root");
});

app.get('/random', (req,res)=>{
    console.log("Random route was called");
    res.send("Hi I am random");
});

app.get("/err", (req, res) => {
    abcd = abcd;
});

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Access to ADMIN is forbidden");
});

app.use((err, req, res, next) => {
    let {status = 500, message = "Some error occured"} = err;
    res.status(status).send(message);
});

app.use((err, req, res, next) => {
    console.log("-----------------ERROR 2 MIDDLEWARE-----------------");
    next(err);
});

// 404
app.use( (req, res) => {
    res.status(404).send("404 page not found");
});

app.listen(8081,()=>{
    console.log("Server listening on port 8081");
});

// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// Testing GitHub from friend's laptop
// RISHIKESH

