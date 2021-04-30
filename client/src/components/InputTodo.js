import React, { Fragment } from "react";


class InputTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoName: "",
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.setTodoName = this.setDescription.bind(this);
  }

  componentDidMount(){
    this.todoInput.focus(); 
  }

  setDescription(todoName) {
    this.setState({
      todoName: todoName,
    });
  }

  async onSubmitForm(e) {
    var todoName = this.state.todoName;

    e.preventDefault();
    if (todoName === "") {
      return;
    }

    try {
      var body = { todoName };
      const parentFolderName = "home"
      await fetch(`/todos/${parentFolderName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      

    } catch (err) {
      console.log(err.message);
    }
    window.location = "./";
    // TODO: Make this work by changuing app to class this.props.renderApp();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <h1 className="text-center py-3 text-primary">Tick Tock Todo</h1>

          <form className="d-flex input-form-flex" onSubmit={this.onSubmitForm}>
            <input
              type="text"
              ref={(input) => { this.todoInput = input; }}
              className="form-control"
              value={this.state.todoName}
              onChange={(e) => this.setTodoName(e.target.value)}
            />
            <button className="ml-5 add-btn btn btn-outline-success">Add</button>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default InputTodo;
