const express = require('express');
const table = require("@makeitrealcamp/db-mock")
const cors = require("cors")

const app = express();
app.use(express.json())

app.use(cors())

app.get('/api/tasks', (req, res) => {
    const records = table.findAll();
    res.status(200).json(records);
})

app.post('/api/tasks', (req, res) =>{
    const { task } = req.body;
    if(!task) return res.status(400).json({"error":"You must pass a task"})
    const r1 = table.insert({ task: task });
    res.status(202).json({'message':'Recieved succesfully'});
});

app.put('/api/tasks/:id', (req, res) =>{
    const { id } = req.params;
    const { task } = req.body
    table.update({id: id, task: task});
    res.status(202).json({'message': 'updated succesfully'})
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    table.remove(id);
    res.status(202).json({'message': 'Deleted succesfully'});
});

app.listen(8000, ()=> console.log('listening on port 8000'));