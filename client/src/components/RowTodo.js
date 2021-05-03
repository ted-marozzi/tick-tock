import React, { Fragment } from "react";
import "./css/RowTodo.css";

const RowTodo = ({todo, renderList, setRenderList}) => {
  const updateChecked = async () => {
    const checked = !todo.checked;
    try {
      const body = { checked };

      await fetch(`/todo/updateChecked/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // Tell parent widget to rerender here
      setRenderList(renderList + 1);
      
  
    } catch (err) {}
  };

  return (
    <Fragment>
      <td className="align-middle">
        <span onClick={updateChecked}>
          <input type="checkbox" readOnly={true} checked={todo.checked} />
          <span className="hide align-middle"></span>
        </span>
      </td>
      <td
        className={(todo.checked ? "checked" : "none") + "  align-middle"}
      >
        {todo.name}
      </td>
    </Fragment>
  );
};

export default RowTodo;
