import React, { Fragment } from "react";
import './App.css';
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {

  
  return (
    <Fragment>
      <div className="container">
        <div className="p-5">
          <InputTodo />
        </div>
        <div className="p-5">
          <ListTodo />
        </div>
        
        
      </div>
    </Fragment>

  );
}

export default App;
