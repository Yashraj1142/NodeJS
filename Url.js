//create a http server
//use an URL that uses name and age as query
//parse the url and display Welcome <user>. I know you are <ageOfUser> years old.

const http = require('http');
const url = require('url');

const myserver = http.createServer((req,res)=>{
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch(myUrl.pathname){
        case "/":
            const q1 = myUrl.query.name;
            const q2 = myUrl.query.age;
            res.end(`<h1>Welcome ${q1}.\nI know you are ${q2} years old.</h1>`);
            break;
        case "/about":
            res.end("Welcome to home page.");
            break;
        default:
            res.end("404 Not Found");
    }
});

myserver.listen(3000, ()=>{
    console.log("Server is in running state.");
});