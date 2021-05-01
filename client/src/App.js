import React, { Fragment, useEffect, useState } from "react";
import './App.css';
import Input from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  const [parentFolderId, setParentFolderId] = useState(0);
  const [renderList, setRenderList] = useState(0);


  return (
    <Fragment>
      <div className="container">
        <div className="py-5">
          <Input setParentFolderId={setParentFolderId} parentFolderId={parentFolderId} setRenderList={setRenderList} renderList={renderList} />
        </div>
        <div className="p-3">
          <ListTodo setParentFolderId={setParentFolderId} parentFolderId={parentFolderId} renderList={renderList}/>
        </div>
             
      </div>
    </Fragment>

  );
}

export default App;
