
import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {

    const updateDescription = async (e) => {
        try {
            const body = { description };
            const response = await fetch(
                `http://localhost:5000/todos/${todo.todo_id}`,
                {
                    "method": "PUT",
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(body)
                }

            );
            window.location = "/";
        } catch (err) {
            
        }
    }

    const [description, setDescription] = useState(todo.description);
    return (
        <Fragment>
            
            <button type="button" class="btn btn-info" 
                data-toggle="modal" data-target={`#id-${todo.todo_id}`}>Edit</button>

            
            <div id={`id-${todo.todo_id}`} class="modal fade" role="dialog"
                onClick={()=> setDescription(todo.description)}>
                <div class="modal-dialog">

                
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button type="button" class="close" 
                            data-dismiss="modal"
                            onClick={()=> setDescription(todo.description)}>&times;</button>
                        </div>
                        <div class="modal-body">
                            <input type="text" 
                            className="form-control" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div class="modal-footer">
                            <button type="button" 
                                class="btn btn-warning" 
                                data-dismiss="modal"
                                onClick={e=> updateDescription(e)}
                                >
                                    Confirm
                            </button>
                
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;