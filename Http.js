//build a http server
//input user's activity in a file

const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res)=>{
    if(req.url==='/favicon.ico'){
        return res.end();
    }
    const log = `The request is made through ${req.url} at ${Date.now()}\n`
    fs.appendFile('./pracInfo.txt', log, ()=>{
        switch (req.url){
            case "/":
                res.end("Welcome to home page");
                break;
            case "/about":
                res.end("Welcome to About page.");
                break;
            case "/contact":
                res.end("Welcome to contacts page.");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myserver.listen(2000, ()=>{
    console.log("Server is running.");
});