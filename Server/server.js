const http = require("http");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

const port = 3000;

const server = http.createServer((req,res)=>{
    // __direname -- gives the current file path
    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url); 
    
    // getting the extention of the current file path
    const extName = String(path.extname(filePath).toLowerCase());

    //supportable files
    const mimeTypes = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'text/png',
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (err, content)=>{
        if(err){
            res.writeHead(404, {"content-type" : "text/html"});
            res.end("404 - Page Not Found Buddy");
        } else{
            res.writeHead(200, {"content-type" : contentType});
            res.end(content, "utf-8");
        }
    })
    //res has 2 parts - head (metadata) and body/end (content)
});

server.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`);
})