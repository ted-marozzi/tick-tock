import React, { Fragment } from "react";

const FolderTodo = (props) => {
 

  return (
    <Fragment>
      <td>
        {props.folder.folder_name}
      </td>
    </Fragment>
  );
};

export default FolderTodo;
