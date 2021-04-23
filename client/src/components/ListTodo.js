import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import RowTodo from "./RowTodo";
import "./InputTodo.css";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      var jsonData = await response.json();
      var i = jsonData.length;
      while (i--) {
        if (jsonData[i].checked) {
          jsonData.push(jsonData.splice(i, 1)[0]);
        }
      }


      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <h2>Tasks</h2>

      <table className="table mt-5 text-center">
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <RowTodo todo={todo} />
              <td className="align-middle">
                <EditTodo todo={todo} />
              </td>
              <td className="align-middle">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
