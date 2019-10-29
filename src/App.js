import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import * as userApi from "./api/userApi";
import ManageUser from "./ManageUser";
import { ToastContainer } from "react-toastify";
import Loading from "./reusable/Loading";
import Login from "./Login";
import UserContext from "./UserContext";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    userApi.getUsers().then(users => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []); // use Effect is used as component life cycle and we also need to pass initial value so that it will render only if its initial value

  function deleteUser(id) {
    userApi.deleteUser(id).then(() => {
      //runs after the delete was successful
      const filteredUsers = users.filter(u => u.id !== id);
      setUsers(filteredUsers);
    });
  }

  function loginUser(userId) {
    setLoggedInUser(users.find(u => u.id === userId));
  }
  function logout() {
    setLoggedInUser(null);
  }

  if (isLoading) return <Loading />;

  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, logout: logout }}
    >
      <ToastContainer />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {loggedInUser ? (
          <p>Hi {loggedInUser.name}</p>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <Switch>
        <Route
          path="/"
          exact
          render={props => <Home loggedInUser={loggedInUser} {...props} />}
        />
        <Route
          path="/login"
          render={props => <Login loginUser={loginUser} {...props} />}
        />
        <Route
          path="/users"
          render={props => (
            <Users
              //users={users}
              deleteUser={deleteUser}
              isLoading={isLoading}
            />
          )}
        />
        <Route
          path="/manage-user/:userId?"
          render={props => (
            <ManageUser users={users} setUsers={setUsers} {...props} />
          )}
        />
        {/* <Route path="/manage-user" component={ManageUser} /> */}
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
