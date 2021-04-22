import React, { Fragment } from "react";
class InputTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.setDescription = this.setDescription.bind(this);
  }

  componentDidMount(){
    this.todoInput.focus(); 
  }

  setDescription(des) {
    this.setState({
      description: des,
    });
  }

  async onSubmitForm(e) {
    var description = this.state.description;

    e.preventDefault();
    if (description === "") {
      return;
    }

    try {
      var body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <h1 className="text-center p-5">Tick Tock</h1>

          <form className="d-flex input-form-flex" onSubmit={this.onSubmitForm}>
            <input
              type="text"
              ref={(input) => { this.todoInput = input; }}
              className="form-control"
              value={this.state.description}
              onChange={(e) => this.setDescription(e.target.value)}
            />
            <button className="add-btn btn btn-success mx-5">Add</button>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default InputTodo;
