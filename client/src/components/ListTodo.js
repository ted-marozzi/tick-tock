import React, { Fragment, useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import EditTodo from "./EditTodo";
import RowTodo from "./RowTodo";
import "./InputTodo.css";
import FolderTodo from "./FolderTodo";



const ListTodos = ({setParentFolderId, parentFolderId, renderList}) => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const sortChecked = (unsortedTodos) => {

    var i = unsortedTodos.length;

    while (i--) {
      
      if (unsortedTodos[i].checked) {
        unsortedTodos.push(unsortedTodos.splice(i, 1)[0]);
      }
    }
  
    return unsortedTodos;
    
  };

  const renderTodos = ()  => {
    getTodos();

  }

  const getTodos = async () => {
    try {
     
      const response = await fetch(`/todos/${parentFolderId}`);
      var todoResponse = await response.json();
      setTodos(sortChecked(todoResponse));
    } catch (err) {
      console.error(err.message);
    }
  };
  const getFolders = async () => {
    try {
      const response = await fetch(`/folders/${parentFolderId}`);
      var jsonData = await response.json();

      setFolders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
    getFolders();
  }, [parentFolderId, renderList]);

  return (
    <Fragment>
      <h2 className="text-primary">Folders</h2>
      <Flipper>
        <table className="table mt-3 text-center">
          <tbody>
            {folders.map((folder) => (
              <Flipped key={folder.folder_id} flipId={folder.folder_id}>
                <tr key={folder.folder_id} onClick={() => {
                  
                    setParentFolderId(folder.folder_id);
                  }}>
                  <FolderTodo folder={folder} />
                  
                </tr>
              </Flipped>
            ))}
          </tbody>
        </table>
      </Flipper>
      <h2 className="text-primary">Tasks</h2>
      <Flipper flipKey={todos.map((todo) => todo.todo_id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.todo_id} flipId={todo.todo_id}>
                <tr key={todo.todo_id}>
                  <RowTodo todo={todo} renderTodos={renderTodos} />
                  <td className="align-middle">
                    <EditTodo todo={todo} renderTodos={renderTodos} />
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </Flipped>
            ))}
          </tbody>
        </table>
      </Flipper>
    </Fragment>
  );
};

export default ListTodos;
