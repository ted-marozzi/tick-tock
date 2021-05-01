const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

// create a todo
app.post("/todos/:parentFolderId", async (req, res) => {
  try {
    const { name } = req.body;
    const { parentFolderId } = req.params;
   
    console.log(name)
    const newTodo = await pool.query(
      "INSERT INTO todo (todo_name, parent_folder_id) VALUES ($1, $2) RETURNING *",
      [name, parentFolderId]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a folder
app.post("/folders/:parentFolderId", async (req, res) => {
  try {
    const { name } = req.body;
    const { parentFolderId } = req.params;
   
    console.log(name)
    const newTodo = await pool.query(
      "INSERT INTO folder (folder_name, parent_folder_id) VALUES ($1, $2) RETURNING *",
      [name, parentFolderId]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos of a folder
app.get("/todos/:parentFolderId", async (req, res) => {
  try {

    const { parentFolderId } = req.params;
    const todosOfFolder = await pool.query(
      "SELECT * FROM todo WHERE parent_folder_id = $1 ORDER BY todo_id",
      [parentFolderId]
    );

  

    res.json(todosOfFolder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all folders of a folder
app.get("/folders/:parentFolderId", async (req, res) => {
  try {
    
    const { parentFolderId } = req.params;

    const foldersOfFolder = await pool.query(
      "SELECT * FROM folder WHERE parent_folder_id = $1 ORDER BY folder_id",
      [parentFolderId]
    );
   
    res.json(foldersOfFolder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo description

app.put("/todos/updateName/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todoName } = req.body;
    await pool.query("UPDATE todo SET todo_name = $1 WHERE todo_id = $2", [
      todoName,
      id,
    ]);

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo checked
app.put("/todos/updateChecked/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;
    await pool.query("UPDATE todo SET checked = $1 WHERE todo_id = $2", [
      checked,
      id,
    ]);

    res.json("Todo checked was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// create a todo
// get all todos
// update a todo description
// update a todo checked
// delete a todo

// create a folder
// delete a folder
// update a folder name
// get a folder
// move a folder
// move a todo
// get path of a folder

/*
todos table

 todo_id |               description               | checked | parent_folder_id
---------+-----------------------------------------+----------------------------
      74 | make orderable                          | f       | null
      85 | fix db delay                            | f       | 1
      38 | add complete by (date)                  | t       | 1


folders table

folder_id|               name                      | parent_folder_id
---------+-----------------------------------------+----------------------------
      1  | personal                                | null
      2  | coding                                  | 1
      3  | cleaning                                | 2

*/

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

// Folders

// get todos of a path "/todos" or "/todos/personal"
// querys the database for the path and returns all of those todos

// on a page, need to list all the folders avaliable
