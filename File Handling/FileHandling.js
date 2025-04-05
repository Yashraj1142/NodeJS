const fs = require('fs');
const filePath = "./todo.txt";

//node .\todo.js add "Learn OOPs"
const command = process.argv[2];
const argument = process.argv[3];

//functionality
const loadTask = () => {
    try{
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error){
        return [];
    }
}

const saveTask = (tasks) => {
    const data = JSON.stringify(tasks); //array to string
    fs.writeFileSync(filePath, data);
}

//add tasks functions
const addTask = (task) => {
    const tasks = loadTask();
    tasks.push(task);
    saveTask(tasks);

    console.log("Task added successfully !");
}

//list tasks function
const listTask = () => {
    const tasks = loadTask();
    tasks.forEach((element, index) => {
        console.log(index, " - ", element);
    });
}

//remove tasks function
const removeTask = (argument) => {
    const tasks = loadTask();
    if(tasks.length < 1){
        console.log("List is already empty !");
    }
    
    tasks.splice(argument, 1);
    saveTask(tasks);
}

if(command === "add"){
    addTask(argument);
} else if(command === "list"){
    listTask();
} else if(command === "remove"){
    removeTask(argument);
} else{
    console.log("Command not found !");
}