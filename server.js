
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Load initial tasks from a JSON file
let tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));

// API Endpoints
app.get('/',  (req, res) => {
  res.write("Task management system");
    res.end();
});
// 1. Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// 3. Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(newTask);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

// 4. Update an existing task
app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not found');
  }
});

// 5. Delete a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.json({massage:'task deleted succsesfully'})
    res.status(204).end();
  } else {
    res.status(404).send('Task not found');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






































// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cors());

// let tasks = [];

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });