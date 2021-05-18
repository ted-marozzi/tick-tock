import React, { Fragment, useState, useEffect, useRef } from "react";
// Input for creating folder and todo items.
const InputItem = (
  {
    setParentFolderId,
    parentFolderId,
    setRenderList,
    renderList
  }
) => {

  const [name, setName] = useState("");
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, []);


  const create = async (e, type) => {
    // Prevents loop
    e.preventDefault();
    if (name === "") {
      return;
    }

    try {
      var body = { name };

      await fetch(`/create/${type}/of/${parentFolderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    } catch (err) {
      console.log(err.message);
    }

    setRenderList(renderList + 1);
    setName("");

  };


  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center py-3">Tick Tock Todo</h1>

        <form className="d-flex input-form-flex">
          <input
            type="text"
            ref={input}
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={(e) => create(e, "todo")}
            className="ml-5 add-btn btn btn-outline-success"
          >
            Add Task
          </button>

          <button
            onClick={(e) => create(e, "folder")}
            className="ml-5 add-btn btn btn-outline-info"
          >
            Add Folder
          </button>
        </form>
      </div>
    </Fragment>
  );

}
export default InputItem;
