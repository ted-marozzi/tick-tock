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
  const [path, setPath] = useState([{ id: 0, name: "Home" }]);
  const [showMessage, setShowMessage] = useState(false);

  //delete todo function
  const deleteListItem = async (listItem) => {
    try {

      if (listItem.type === "todo") {
        setTodos(todos.filter((todo) => todo.id !== listItem.id));
      } else if (listItem.type === "folder") {
        setFolders(folders.filter((folder) => folder.id !== listItem.id));
      }
      const res = await fetch(`/${listItem.type}/${listItem.id}`, {
        method: "DELETE",
      });

      if(!res.ok) {
        setTodos(todos);
        setFolders(folders);
        setShowMessage(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const sortChecked = (unsortedTodos) => {
    var i = unsortedTodos.length;
    
    unsortedTodos.sort((a,b) => {
      if( a.id > b.id )  {
        return 1;
      } else if (a.id === b.id) {
        return 0;
      } else if( a.id < b.id ) {
        return -1;
      }
    });

    while (i--) {
      if (unsortedTodos[i].checked) {
        unsortedTodos.push(unsortedTodos.splice(i, 1)[0]);
      }
    }

    return unsortedTodos;
  };

  const setListItems = (setListItemsFn, listItems) => {
    setListItemsFn(listItems);
  };

  const setListItem = (setListItemsFn, listItems, newListItem) => {
    const index = listItems.findIndex(
      (listItem) => listItem.id === newListItem.id
    );
    listItems[index] = newListItem;
    setListItems(setListItemsFn, [...listItems]);
  };

  const setTodo = (todo) => {
    setListItem(setTodos, sortChecked(todos), todo);
  };
  const setFolder = (folder) => {
    setListItem(setFolders, folders, folder);
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
    getFolders();
    getTodos();

    getPath();
  }, [parentFolderId, renderList]);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);
  return (
    <Fragment>
      <h2>
        <span>Current Folder: </span>
        {path.slice(0, -1).map((folder) => (
          <span key={folder.id}>
            <span> / </span>
            <button
              className="btn btn-outline-dark"
              onClick={() => setParentFolderId(folder.id)}
            >
              {folder.name}
            </button>
          </span>
        ))}
        <span> / </span>
        <span>
          <small>{path[path.length - 1].name}</small>
        </span>
      </h2>
      {showMessage && (
        <h6 className="text-warning">
          Folder can't be deleted as it is not empty.
        </h6>
      )}
      <Flipper>
        <table className="table mt-3 text-center">
          <tbody>
            <div>{console.log(folders)}</div>
            {folders.map((folder) => (
              <Flipped key={folder.id} flipId={folder.id}>
                <tr key={folder.id}>
                  <td onClick={() => setParentFolderId(folder.id)}>
                    <FolderItem folder={folder} />
                  </td>

                  <td className="align-middle">
                    <EditListItem listItem={folder} setListItem={setFolder} />
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
      <h2>Tasks</h2>
      <Flipper flipKey={todos.map((todo) => todo.id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.id} flipId={todo.id}>
                <tr key={todo.id}>
                  <RowTodo
                    todo={todo}
                    setListItem={setTodo}
                  />
                  <td className="align-middle">
                    <EditListItem listItem={todo} setListItem={setTodo} />
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
