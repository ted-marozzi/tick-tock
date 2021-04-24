import React, { Fragment } from "react";
import './App.css';
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {

  
  return (
    <Fragment>
      <div className="container">
        <div className="py-5">
          <InputTodo />
        </div>
        <div className="p-3">
          <ListTodo />
        </div>        
      </div>
    </Fragment>

  );
}

export default App;
