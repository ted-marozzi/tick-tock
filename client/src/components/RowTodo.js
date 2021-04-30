import React, { Fragment } from "react";
import "./RowTodo.css";

const RowTodo = (props) => {
  const updateChecked = async () => {
    const checked = !props.todo.checked;
    try {
      const body = { checked };

      await fetch(`/todos/${props.todo.todo_id}/updatechecked`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // Tell parent widget to rerender here
      props.sortChecked();
      window.location = "./";
    } catch (err) {}
  };

  return (
    <Fragment>
      <td className="align-middle">
        <span onClick={updateChecked}>
          <input type="checkbox" readOnly={true} checked={props.todo.checked} />
          <span className="hide align-middle"></span>
        </span>
      </td>
      <td
        className={(props.todo.checked ? "checked" : "none") + "  align-middle"}
      >
        {props.todo.todo_name}
      </td>
    </Fragment>
  );
};

export default RowTodo;
