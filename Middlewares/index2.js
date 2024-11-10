const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

//middleware 1
app.use(express.urlencoded({extended:false}));

//middleware 2
app.use((req, res, next)=>{
    console.log("Middleware 1 called");
    //creating a file to track the record of users
    fs.appendFile('./log.txt', `Request sent - ${Date.now()} : ${req.url} : ${req.ip}`, (err,data)=>{
        next();
    });
});

//middleware 3
app.use((req, res, next) =>{
    console.log("Middleware 2 is called");
    next();
})

//routes
app.get("/api/users", (req, res)=>{
    console.log("Get is called");
    return res.end("User Data");
})

app.listen(port, ()=>{
    console.log(`App is running on port: ${port}`);
})