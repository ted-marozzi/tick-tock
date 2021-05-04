import React, { Fragment } from "react";

const EditListItem = ({ listItem , setListItem}) => {
  const submitRef = React.useRef(null);
  let editInput = "";

  const setListItemName = (name) => {
    listItem.name = name;
    setListItem(listItem);
  };

  const updateListItemName = async (e) => {
    e.preventDefault();
    try {
      console.log(listItem.name);
      const listItemName = listItem.name;
      const body = { listItemName };
      await fetch(`/updateName/${listItem.type}/${listItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setListItemName(listItem.name);
      
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => {
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
