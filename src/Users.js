import React from "react";
import * as userApi from "./api/userApi";
import { Link, Redirect } from "react-router-dom";
import Button from "@paycor/button";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      redirect: false,
      isLoading: false
    };
    //do binding in constructor
    //this.deleteUser = this.deleteUser.bind(this);
  }

  //lifecycle method thats called fater component is mounted on page
  //only valid for class components, Function components use hooks
  componentDidMount() {
    this.setState({ isLoading: true });
    userApi
      .getUsers()
      .then(users => this.setState({ users: users, isLoading: false }));
  }

  deleteUser = id => {
    userApi.deleteUser(id).then(() => {
      //runs after the delete was successful
      const filteredUsers = this.state.users.filter(u => u.id !== id);
      this.setState({
        users: filteredUsers
      });
    });
  };

  renderUser = user => {
    return (
      //<li>{`username ${user.name}`}</li>
      <li key={user.id}>
        <Button onClick={() => this.deleteUser(user.id)}>Delete</Button> ----
        <Link to={`/manage-user/${user.id}`}>{user.name}</Link> ----
        {user.hairColor}
      </li>
    );
  };

  render() {
    return (
      <>
        <h1>Users</h1>
        {this.state.isLoading && <p>Loading...</p>}
        {this.state.redirect && <Redirect to="/manage-user" />}
        <Button
          onClick={() =>
            this.setState({
              redirect: true
            })
          }
        >
          Add User
        </Button>
        {/* <Link to="/manage-user">Add User</Link> */}
        <ul>{this.state.users.map(this.renderUser)}</ul>
      </>
    );
  }
}

export default Users;
