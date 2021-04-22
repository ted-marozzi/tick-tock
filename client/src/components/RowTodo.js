import React, { Fragment } from "react";
import "./RowTodo.css";

const RowTodo = ({ todo }) => {
  
  const updateChecked = async () => {
    const checked = !todo.checked;
    try {
      const body = { checked };

      await fetch(`http://localhost:5000/todos/${todo.todo_id}/updatechecked`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {}
  };

  return (
    <Fragment>
      <td>
        <span onClick={updateChecked}>
          <input type="checkbox" readOnly={true} checked={todo.checked} />
          <span className="hide align-middle"></span>
        </span>
      </td>
      <td className={(todo.checked ? "checked" : "none") + "  align-middle"}>
        {todo.description}
      </td>
    </Fragment>
  );
};

export default RowTodo;
