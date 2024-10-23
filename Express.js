const http = require('http')
const express = require('express')
const port = 9000;

const app = express();

app.get('/', (req, res)=>{
    return res.send(`Hello from Home Page. Hey ${req.query.name}`);
});

app.get('/about', (req, res)=>{
    return res.send("Hello from About Page.");
});

// const myserver = http.createServer(app);


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})

//Express is just a framework which is internally using http