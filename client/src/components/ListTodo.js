import React, { Fragment, useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import EditListItem from "./EditListItem";
import RowTodo from "./RowTodo";
import "./InputTodo.css";
import FolderTodo from "./FolderTodo";

const ListTodos = ({ setParentFolderId, parentFolderId, setRenderList, renderList }) => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);

  //delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`/todo/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.id !== id));
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


  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(`/todos/${parentFolderId}`);
        var todoResponse = await response.json();
        todoResponse.map((todo) => (todo.type = "todo"));
        setTodos(sortChecked(todoResponse));
      } catch (err) {
        console.error(err.message);
      }
    };
    const getFolders = async () => {
      try {
        const response = await fetch(`/folders/${parentFolderId}`);
        var folderResponse = await response.json();
        folderResponse.map((folder) => (folder.type = "folder"));

        setFolders(folderResponse);
      } catch (err) {
        console.error(err.message);
      }
    };
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
              <Flipped key={folder.id} flipId={folder.id}>
                <tr key={folder.id}>
                  <td onClick={() => setParentFolderId(folder.id)}>
                    <FolderTodo folder={folder} />
                  </td>
                 
                  <td className="align-middle">
                    <EditListItem
                      listItem={folder}
                      renderList={renderList}
                      setRenderList={setRenderList}
                    />
                  </td>
                </tr>
              </Flipped>
            ))}
          </tbody>
        </table>
      </Flipper>
      <h2 className="text-primary">Tasks</h2>
      <Flipper flipKey={todos.map((todo) => todo.id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.id} flipId={todo.id}>
                <tr key={todo.id}>
                  <RowTodo todo={todo} renderList={renderList} setRenderList={setRenderList} />
                  <td className="align-middle">
                    <EditListItem
                      listItem={todo}
                      renderList={renderList}
                      setRenderList={setRenderList}
                    />
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteTodo(todo.id)}
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
