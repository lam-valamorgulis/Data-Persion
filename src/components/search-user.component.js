import React, { Component } from "react";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.user.user}</td>
    <td>{props.user.email}</td>
    <td>{props.user.birthday.substring(0, 10)}</td>
  </tr>
);

export default class SearchUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      users: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    // console.log(user);

    axios
      .get("http://localhost:5000/users/name/" + user.username)
      .then((response) => {
        this.setState({ users: response.data });
        // console.log(response.data);
      });

    this.setState({
      username: "",
    });
  }

  userSearchList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          // deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Search User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username or Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
        <div>
          <h3>User</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Birthday</th>
              </tr>
            </thead>
            <tbody>{this.userSearchList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
