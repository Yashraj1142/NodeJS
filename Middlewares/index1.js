const express = require('express');

const port = 4000;
const app = express();

//middleware 1
app.use(express.urlencoded({extended:false})); //it converts the form data into object and store them in req.body

//middleware 2
app.use((req, res, next) => {
    req.name = "Yash";
    console.log("This is middleware 2");
    next();         //this will send the request to the next available function
})

//middleware 3
app.use((req, res, next) =>{
    console.log("This is middleware 2", req.name); //changes made in one middleware will be available across the program further
    return res.json({message:"req not sent"});  //this will not send the request further next
})

//routes
app.get("/api/users", (req, res)=>{
    console.log("Get is called");
    return res.end("User Data");
})

app.listen(port, ()=>{
    console.log(`App is running on port: ${port}`);
})