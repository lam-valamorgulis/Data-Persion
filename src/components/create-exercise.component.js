import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // initial component state
    this.state = {
      user: "",
      email: "",
      birthday: new Date(),
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeBirthday(date) {
    this.setState({
      birthday: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      user: this.state.user,
      email: this.state.email,
      birthday: this.state.birthday,
    };

    console.log(newUser);

    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New User </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.user}
              onChange={this.onChangeUser}
            />
          </div>
          <div className="form-group">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Birthday </label>
            <div>
              <DatePicker
                selected={this.state.birthday}
                onChange={this.onChangeBirthday}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create New User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
