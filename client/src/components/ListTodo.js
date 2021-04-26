import React, { Fragment, useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import EditTodo from "./EditTodo";
import RowTodo from "./RowTodo";
import "./InputTodo.css";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

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

  const getTodos = async () => {
    try {
      const response = await fetch("/todos");
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
      <Flipper flipKey={todos.map((todo) => todo.todo_id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.todo_id} flipId={todo.todo_id}>
                <tr key={todo.todo_id}>
                  <RowTodo todo={todo} getTodos={getTodos} />
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
              </Flipped>
            ))}
          </tbody>
        </table>
      </Flipper>
    </Fragment>
  );
};

export default ListTodos;
