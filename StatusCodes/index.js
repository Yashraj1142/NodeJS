const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));     

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if(!user){
        return res.status(404).json({error: "User Not Found"});     //User Not Found error
    }

    return res.json(user.first_name + " " + user.last_name);
})

app.post('/api/users', (req, res) => {
    const reqContent = req.body;

    if (!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" });    //client-error 
    }

    users.push({
        id: users.length + 1,
        first_name: reqContent.first_name,
        last_name: reqContent.last_name,
        email: reqContent.email,
        gender: reqContent.gender,
        job_title: reqContent.job_title
    });

    fs.appendFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "success", id: users.length });   //success
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});