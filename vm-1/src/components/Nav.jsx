import React from "react";
import axios from "axios";

export default class Nav extends React.Component {
  state = {
    note: ""
  };

  handleChange = event => {
    this.setState({ note: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const note = {
      note: this.state.note
    };

    if (note.note === "") {
      alert("Tasks cannot be blank");
    } else {
      console.log(note);
      axios.post(`http://192.168.55.11:3000/note`, { note }).then(res => {
        console.log(res);
        console.log(res.data);
      });

      window.location.reload();
    }
  };

  deleteFunction = event => {
    event.preventDefault();

    axios.delete(`http://192.168.55.11:3000/deleteallnotes`, {}).then(res => {
      console.log(res);
      console.log(res.data);
    });

    window.location.reload();
  };

  render() {
    return (
      <form className="p-3 pt-5" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="row">
            <h3 className="font-weight-bold">New Task:</h3>
            <textarea
              className="form-control p-2 mt-3 mb-3"
              type="text"
              name="name"
              rows="5"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <button className="btn btn-outline-success" type="submit">
              Add
            </button>

            <button
              className="btn btn-outline-danger ml-2"
              onClick={event => {
                event.preventDefault();

                if (
                  window.confirm("Are you sure you wish to delete ALL tasks?")
                )
                  this.deleteFunction(event);
              }}
            >
              Delete All
            </button>
          </div>
        </div>
      </form>
    );
  }
}
