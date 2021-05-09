import React, { Fragment } from "react";
import "./css/RowTodo.css";
// Todo list item
const TodoItem = ({todo, setListItem}) => {
  // Update db when checked
  const updateChecked = async () => {
    const value = !todo.checked;
    try {
      const body = { value };

      await fetch(`/update/todo/of/${todo.id}/set/checked/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // Tell parent widget to rerender here
      todo.checked = value;
      setListItem(todo);
      
  
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

export default TodoItem;
