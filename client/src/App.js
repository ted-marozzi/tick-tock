import React, { Fragment, useState } from "react";
import './App.css';
import InputItem from "./components/InputItem";
import ListItems from "./components/ListItems";

function App() {
  const [parentFolderId, setParentFolderId] = useState(0);
  const [renderList, setRenderList] = useState(0);


  return (
    <Fragment>
      <div className="container">
        <div className="py-5">
          <InputItem setParentFolderId={setParentFolderId} parentFolderId={parentFolderId} setRenderList={setRenderList} renderList={renderList} />
        </div>
        <div className="p-3">
          <ListItems setParentFolderId={setParentFolderId} parentFolderId={parentFolderId} setRenderList={setRenderList} renderList={renderList}/>
        </div>
             
      </div>
    </Fragment>

  );
}

export default App;
