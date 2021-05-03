import React, { Fragment, useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import EditListItem from "./EditListItem";
import RowTodo from "./RowTodo";
import "./css/InputItem.css";
import FolderItem from "./FolderItem";

const ListItems = ({
  setParentFolderId,
  parentFolderId,
  setRenderList,
  renderList,
}) => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [path, setPath] = useState([{ id: 0, name: "Home",}]);

  //delete todo function
  const deleteListItem = async (listItem) => {
    console.log(listItem);
    try {
      await fetch(`/${listItem.type}/${listItem.id}`, {
        method: "DELETE",
      });

      if (listItem.type === "todo") {
        setTodos(todos.filter((todo) => todo.id !== listItem.id));
      } else if (listItem.type === "folder") {
        setFolders(folders.filter((folder) => folder.id !== listItem.id));
      }
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
        const response = await fetch(`/todo/${parentFolderId}`);
        var todoResponse = await response.json();
        todoResponse.map((todo) => (todo.type = "todo"));
        setTodos(sortChecked(todoResponse));
      } catch (err) {
        console.error(err.message);
      }
    };
    const getFolders = async () => {
      try {
        const response = await fetch(`/folder/${parentFolderId}`);

        var folderResponse = await response.json();

        folderResponse.map((folder) => (folder.type = "folder"));

        setFolders(folderResponse);
      } catch (err) {
        console.error(err.message);
      }
    };

    const getPath = async () => {
      try {
        const response = await fetch(`/getPath/${parentFolderId}`);

        const pathResponse = await response.json();

        setPath(pathResponse.reverse());
      } catch (err) {
        console.error(err.message);
      }
    };

    getTodos();
    getFolders();
    getPath();
  }, [parentFolderId, renderList]);

  return (
    <Fragment>
      <h3 className="text-primary">
        <span>Click me: </span>
        {path.map((folder) => (
          <span key={folder.id} onClick={() => setParentFolderId(folder.id)}>/{folder.name}</span>
        ))}
      </h3>

      <Flipper>
        <table className="table mt-3 text-center">
          <tbody>
            {folders.map((folder) => (
              <Flipped key={folder.id} flipId={folder.id}>
                <tr key={folder.id}>
                  <td onClick={() => setParentFolderId(folder.id)}>
                    <FolderItem folder={folder} />
                  </td>

                  <td className="align-middle">
                    <EditListItem
                      listItem={folder}
                      renderList={renderList}
                      setRenderList={setRenderList}
                    />
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteListItem(folder)}
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
      <h3 className="text-primary">Tasks</h3>
      <Flipper flipKey={todos.map((todo) => todo.id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.id} flipId={todo.id}>
                <tr key={todo.id}>
                  <RowTodo
                    todo={todo}
                    renderList={renderList}
                    setRenderList={setRenderList}
                  />
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
                      onClick={() => deleteListItem(todo)}
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

export default ListItems;
