import React, { Fragment } from "react";

const FolderItem = (props) => {
 

  return (
    <Fragment>
      <button className="btn btn-outline-dark" >{props.folder.name}</button>

    </Fragment>
  );
};

export default FolderItem;
