const express = require("express");
const table = require("@makeitrealcamp/db-mock");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());


// Trae todos los elementos de la base de datos
app.get("/api/tasks", (req, res) => {
  const records = table.findAll();
  res.status(200).json(records);
});

// Crea un nuevo elemento en la BD con lo que trae del body
app.post("/api/tasks", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "You must pass a task" });
  const r1 = table.insert({ task: task, check: false });
  res.status(202).json({ ...r1 });
});

//Cambia una tarea individual por params
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const updateTask = { id: parseInt(id), task: task, check: false }
  table.update(updateTask);
  //const record = table.findById(id);
  res.status(202).json({ ...updateTask });
});

// Marca como completada una tarea
app.put("/api/tasks", (req, res) => {
  const { id, task, check } = req.body;
  const result = table.findById(id)
  table.update({ ...result, check: !result.check });
  return res.status(202).json({ ...result, check: !result.check });

});


//Borra una tarea de la BD
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const record = table.findById(id);
  table.remove(id);
  res.status(202).json({ ...record });
});

app.listen(8000, () => console.log("listening on port 8000"));
