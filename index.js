const express = require('express');
const table = require("@makeitrealcamp/db-mock")
const cors = require("cors")

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    const r1 = table.insert({ task: "Pedro Perez" }) // { id: 1, name: "Pedro Perez" }
    const r2 = table.insert({ task: "Maria Gomez" }) // { id: 2, name: "Maria Gomez" }
    const records = table.findAll();
    res.status(200).json(records);
})

app.listen(8000, ()=> console.log('listening on port 8000'));