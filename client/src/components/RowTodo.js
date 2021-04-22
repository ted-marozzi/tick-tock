import React, { Fragment, useState } from "react";
import "./RowTodo.css";

const RowTodo = ({ todo }) => {
  const [checked, setChecked] = useState(false);

  return (
   
    <Fragment>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={ () => setChecked(!checked) }
        />
      </td>
      <td className={(checked ? "checked" : "none")}>
        {todo.description}
      </td>
    </Fragment>
  );
};

export default RowTodo;
