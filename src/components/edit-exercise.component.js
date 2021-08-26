import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditUser extends Component {
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

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          user: response.data.user,
          email: response.data.email,
          birthday: new Date(response.data.birthday),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeUserId(e) {
    this.setState({
      id: e.target.value,
    });
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
      .post(
        "http://localhost:5000/users/update/" + this.props.match.params.id,
        newUser
      )
      .then((res) => console.log(res.data));
    // console.log(this.props.match.params.id);

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit New User </h3>
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
              value="Edit New User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
