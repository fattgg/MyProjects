const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// app.post('/tasks', async (req, res) => {
//   const task = new Task(req.body);
//   await task.save();
//   res.status(201).json(task);
// });

app.post('/tasks', async (req, res) => {
  console.log('Received request body:', req.body);
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(500).json({ error: 'Failed to save task' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;  // new completion status from the request

  try {
    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('Server on http://localhost:3000')))
  .catch(err => console.error(err));
