import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    // delete fn

    const deleteTodo = async (id) => {
    try {
        const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,
        {
            "method": "DELETE"
        });

        setTodos(todos.filter(todo => todo.todo_id!== id));
    } catch (err) {
        console.log(err)
    }
}
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);


    return (
        <Fragment>
        <h1>List Todos</h1>
        <table class="table text-center">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {/*
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            */}
            {
            todos.map( todo =>
                <tr>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo} /></td>
                    <td>
                        <button className="btn btn-danger" 
                            onClick={() => deleteTodo(todo.todo_id)}>
                                Delete
                        </button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
        
        </Fragment>
    );

};

export default ListTodos;