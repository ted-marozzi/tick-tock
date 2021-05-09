import React, { Fragment } from "react";
// Edits the folder or todo
const EditListItem = ({ listItem , setListItem}) => {
  const submitRef = React.useRef(null);
  let editInput = "";

  // Set the name in UI
  const setListItemName = (name) => {
    listItem.name = name;
    setListItem(listItem);
  };
  // Set the name in db
  const updateListItemName = async (e) => {
    e.preventDefault();
    try {
      const value = listItem.name;
      const body = { value };
      await fetch(`/update/${listItem.type}/of/${listItem.id}/set/name`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setListItemName(listItem.name);
      
    } catch (err) {
      console.error(err);
    }
    
  };

  // Big dirty modal code.
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => {
          /* For putting cursor in input when flash comes up */
          setTimeout(() => {
            editInput && editInput.focus();
          }, 200);
        }}
        data-toggle="modal"
        data-target={`#id-${listItem.id}`}
      >
        Edit
      </button>
      
      <div id={`id-${listItem.id}`} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                /* Enables enter to submit form properly */
                updateListItemName(e);
                submitRef.current.click();
              }}
            >
              <div className="modal-header">
                <h4 className="modal-title">Edit {listItem.type}</h4>
                <button type="button" className="close" data-dismiss="modal">
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
                  value={listItem.name}
                  onChange={(e) => setListItemName(e.target.value)}
                />
              </div>
              
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  ref={submitRef}
                  onClick={(e) => updateListItemName(e)}
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

export default EditListItem;
