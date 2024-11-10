const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));     //middlware

app.get('/api/users', (req, res)=>{
    return res.json(users);
});

app.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user.first_name + " " + user.last_name);
})

app.post('/api/users', (req,res)=>{
    const reqContent = req.body;
    
    users.push({
        id : users.length + 1,
        first_name : reqContent.first_name,
        last_name : reqContent.last_name,
        email : reqContent.email,
        gender : reqContent.gender,
        job_title : reqContent.job_title
    });

    fs.appendFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        return res.json({status: "success", id: users.length});
    });
});

app.patch('/api/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user)=> user.id === id);
    const updatedData = req.body;

    users[userIndex] = {...userIndex, ...updatedData};

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
        return res.json({status: "seccess", user: users[userIndex]});
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});