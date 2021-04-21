import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
        const body = { description };
        await fetch('http://localhost:5000/todos',
        {
          method: "POST",
          "headers": { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        window.location = "/";
      } catch (err) {
        console.log(err.message);
      }
    }
    return (
    <Fragment>

      <div className="container">
        <h1 className="text-center p-5">
          Tick Tock
        </h1>

        <form className="d-flex input-form-flex" onSubmit={onSubmitForm}>
          <input type="text" className="form-control" 
          value={description} 
          onChange={e=> setDescription(e.target.value)}/>
          <button className="add-btn btn btn-success mx-5">Add</button>
          
      
        </form>
      </div>
      
    </Fragment>
  ); 
}

export default InputTodo;