const express = require("express");
const table = require("@makeitrealcamp/db-mock");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/api/tasks", (req, res) => {
  const records = table.findAll();
  res.status(200).json(records);
});

app.post("/api/tasks", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "You must pass a task" });
  const r1 = table.insert({ task: task, check: false });
  res.status(202).json({ message: "Recieved succesfully" });
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  table.update({ id: id, task: task, check: false });
  res.status(202).json({ message: "updated succesfully" });
});

app.put("/api/tasks", (req, res) => {
  const { id, task, check } = req.body;

  console.log(`se recibe ${check}`);

  if (check) {
    table.update({ id: id, task: task, check: false });
    console.log(`se envia ${false}`);
    return res.status(202).json({ message: "task completed" });
  } else {
    table.update({ id: id, task: task, check: true });
    console.log(`se envia ${true}`);
    return res.status(202).json({ message: "task completed" });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  table.remove(id);
  res.status(202).json({ message: "Deleted succesfully" });
});

app.listen(8000, () => console.log("listening on port 8000"));
