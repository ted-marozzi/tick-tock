import React, { Fragment, useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import EditTodo from "./EditTodo";
import RowTodo from "./RowTodo";
import "./InputTodo.css";

const ListTodos = (props) => {
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

  const sortChecked = (todos) => {

    var i = todos.length;

    while (i--) {
      if (todos[i].checked) {
        todos.push(todos.splice(i, 1)[0]);
      }
    }

    setTodos(todos);
  }

  const getTodos = async () => {
    try {
      const parent_folder_name = "home"
      const response = await fetch(`${parent_folder_name}/todos/`);
      var jsonData = await response.json();
      
      sortChecked(jsonData);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [props.renderOnChanged]);

  return (
    <Fragment>
      <h2 className="text-primary">Tasks</h2>
      <Flipper flipKey={todos.map((todo) => todo.todo_id).join("")}>
        <table className="table mt-3 text-center">
          <tbody>
            {todos.map((todo) => (
              <Flipped key={todo.todo_id} flipId={todo.todo_id}>
                <tr key={todo.todo_id}>
                  <RowTodo todo={todo} sortChecked={sortChecked} />
                  <td className="align-middle">
                    <EditTodo todo={todo} />
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
