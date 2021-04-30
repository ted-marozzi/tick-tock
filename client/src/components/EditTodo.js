import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  let editInput = null;

  const updateTodoName= async (e) => {
    e.preventDefault();
    try {
      const body = { todoName };
      await fetch(`/todos/${todo.todo_id}/updatedes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {}
  };

  const [todoName, setTodoName] = useState(todo.todo_name);
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => {
          setTimeout(() => {
            editInput && editInput.focus();
          }, 200);
        }}
        data-toggle="modal"
        data-target={`#id-${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        id={`id-${todo.todo_id}`}
        className="modal fade"
        role="dialog"
        onClick={() => setTodoName(todo.todo_name)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={(e) => updateTodoName(e)}>
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => setTodoName(todo.todo_name)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  ref={(input) => {
                    editInput = input;
                  }}
                  className="form-control"
                  value={todoName}
                  onChange={(e) => setTodoName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={(e) => updateTodoName(e)}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
