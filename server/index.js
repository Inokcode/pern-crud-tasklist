const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors()); //for diffrent port support for front and server
app.use(express.json()); //clint data from body
//

// ROUTES
// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    // console.log(req.body);
    // res.send('done');
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo'); //no need to return the star like post bcz the idea is to return the data
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json(todo.rows[0]);
    // console.log(req.params);
  } catch (err) {
    console.error(err);
  }
});
// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id =$2',
      [description, id]
    );
    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});
// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json('Todo was deleted');
  } catch (err) {
    console.log(err.message);
  }
});
//

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
