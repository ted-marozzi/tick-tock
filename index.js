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
/*****************************************************************************/
// Folder Path, based recursive call
/*****************************************************************************/
app.get("/getPath/:parentFolderId", async (req, res) => {
  try {
    const { parentFolderId } = req.params;
    const path = await pool.query(`WITH RECURSIVE folderHierarchy AS ( 
      SELECT id, name, parentFolderId FROM folder WHERE id = $1 
      UNION ALL SELECT f.id, f.name, f.parentFolderId FROM folder f 
      INNER JOIN folderHierarchy fh on f.id = fh.parentFolderId ) 
      SELECT name, id FROM folderHierarchy`, [
      parentFolderId,
    ]);

    res.json(path.rows);

  } catch (err) {
    console.error(err.message);
  }
});

/*****************************************************************************/
// IP
/*****************************************************************************/
app.post("/ip", async (req, res) => {
  try {

    const { ip, lat, lon } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO ip (ip, lat, lon) VALUES ($1, $2, $3) RETURNING *",
      [ip, lat, lon]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/*****************************************************************************/
// ListItem, folder and todo item
/*****************************************************************************/

// Create a listItem
app.post("/create/:type/of/:parentFolderId", async (req, res) => {

  try {

    const { type, parentFolderId } = req.params;
    const { name } = req.body;

    const newListItem = await pool.query(
      `INSERT INTO ${type} (name, parentFolderId) VALUES ($1, $2) RETURNING *`,
      [name, parentFolderId]
    );

    res.json(newListItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// Get all list items of a folder
app.get("/getAll/:type/of/:parentFolderId", async (req, res) => {
  try {

    const { type, parentFolderId } = req.params;

    const listItemsOfFolder = await pool.query(
      `SELECT * FROM ${type} WHERE parentFolderId = $1 ORDER BY id`,
      [parentFolderId]
    );

    res.json(listItemsOfFolder.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update a list item
app.put("/update/:type/of/:id/set/:column", async (req, res) => {
  try {

    const { type, id, column } = req.params;
    const { value } = req.body;
    await pool.query(`UPDATE ${type} SET ${column} = $1 WHERE id = $2`, [
      value,
      id,
    ]);

    res.json(`${column} was updated!`);
  } catch (err) {
    console.error(err.message);
  }
});


// Delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a folder
app.delete("/folder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const children = await pool.query(
      `SELECT * 
      FROM todo FULL JOIN folder ON todo.parentFolderid=folder.parentFolderId 
      WHERE todo.parentFolderid = $1 OR folder.parentFolderid = $1`,
      [id]
    );
    

    if (children.rows.length == 0) {
      await pool.query("DELETE FROM folder WHERE id = $1", [id]);
      res.json("Folder was deleted!");
    } else {
      res.status(400);
      res.json("Folder is not empty and thus can't be deleted");
    }

  } catch (err) {
    console.error(err.message);
  }
});


/*
todos table

      id |               name                      | checked | parentFolderId
---------+-----------------------------------------+----------------------------
      74 | make orderable                          | f       | null
      85 | fix db delay                            | f       | 1
      38 | add complete by (date)                  | t       | 1


folders table

       id|               name                      | parentFolderId
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
