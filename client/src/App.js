import React, { Fragment, useState } from "react";
import './App.css';
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {

  const [renderOnChanged, setValue] = useState(0);

  const renderApp = () => {
    setValue(renderOnChanged+1);
  }
  
  return (
    <Fragment>
      <div className="container">
        <div className="py-5">
          <InputTodo renderApp={renderApp}  />
        </div>
        <div className="p-3">
          <ListTodo renderOnChanged={renderOnChanged} />
        </div>
             
      </div>
    </Fragment>

  );
}

export default App;
