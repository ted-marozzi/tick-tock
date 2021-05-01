import React, { Fragment } from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };

    this.create = this.create.bind(this);
    this.setName = this.setDescription.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  setDescription(name) {
    this.setState({
      name: name,
    });
  }

  async create(e, isTask) {
    var name = this.state.name;
    console.log(name);
    e.preventDefault();
    if (name === "") {
      return;
    }

    try {
      var body = { name };
      if (isTask) {
        await fetch(`/todos/${this.props.parentFolderId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(`/folders/${this.props.parentFolderId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
    this.props.setRenderList(this.props.renderList + 1);
    this.setState({
      name: "",
    });

  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <h1 className="text-center py-3 text-primary">Tick Tock Todo</h1>

          <form className="d-flex input-form-flex">
            <input
              type="text"
              ref={(input) => {
                this.input = input;
              }}
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.setName(e.target.value)}
            />
            <button
              onClick={(e) => this.create(e, true)}
              className="ml-5 add-btn btn btn-outline-success"
            >
              Add Task
            </button>

            <button
              onClick={(e) => this.create(e, false)}
              className="ml-5 add-btn btn btn-outline-info"
            >
              Add Folder
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}
export default Input;
