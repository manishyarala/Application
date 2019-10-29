import React, { useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@paycor/button";
import PropTypes from "prop-types";
import { Delete } from "@paycor/icon";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "./redux/actions/userActions";

function Users({ isLoading }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users); //get users from redux
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(userActions.loadUsers());
  }, [dispatch]);
  // use Effect is used as component life cycle and we also need to pass initial value so that it will render only if its initial value

  const deleteUser = userId => {
    dispatch(userActions.deleteUser(userId));
  };

  function renderUser(user) {
    return (
      //<li>{`username ${user.name}`}</li>
      <li key={user.id}>
        <Button
          type={Button.Types.DELETE}
          icon={Delete}
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </Button>{" "}
        ----
        <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
          {user.name}
        </Link>{" "}
        ----
        {user.role}
      </li>
    );
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading && <p>Loading...</p>}
      {redirect && <Redirect to="/manage-user" />}
      <Button onClick={() => setRedirect(true)}>Add User</Button>
      {/* <Link to="/manage-user">Add User</Link> */}
      <ul>{users.length > 0 && users.map(renderUser)}</ul>
    </>
  );
}

// Users.propTypes = {
//   deleteUser: PropTypes.func.isRequired,
//   users: PropTypes.array.isRequired
// };

//the state that we return here from the redux store will be exposed
//to the react compoent above via props
// const mapStateToProps = state => {
//   return {
//     users: state.users
//   };
// };

//the actions we return from this function will be passed as props to component above

//if we omit this function, then dispatch us provided on props to our component automatically
// const mapDispatchToProps = dispatch => {

// };
export default Users;
//export default connect(mapStateToProps)(Users);
// class Users extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       users: [],
//       redirect: false,
//       isLoading: false
//     };
//     //do binding in constructor
//     //this.deleteUser = this.deleteUser.bind(this);
//   }

//   //lifecycle method thats called fater component is mounted on page
//   //only valid for class components, Function components use hooks
//   componentDidMount() {
//     this.setState({ isLoading: true });
//     userApi
//       .getUsers()
//       .then(users => this.setState({ users: users, isLoading: false }));
//   }

//   deleteUser = id => {
//     userApi.deleteUser(id).then(() => {
//       //runs after the delete was successful
//       const filteredUsers = this.state.users.filter(u => u.id !== id);
//       this.setState({
//         users: filteredUsers
//       });
//     });
//   };

//   renderUser = user => {
//     return (
//       //<li>{`username ${user.name}`}</li>
//       <li key={user.id}>
//         <Button
//           type={Button.Types.DELETE}
//           icon={Delete}
//           onClick={() => this.deleteUser(user.id)}
//         >
//           Delete
//         </Button>{" "}
//         ----
//         <Link id={"user-" + user.id} to={`/manage-user/${user.id}`}>
//           {user.name}
//         </Link>{" "}
//         ----
//         {user.hairColor}
//       </li>
//     );
//   };

//   render() {
//     return (
//       <>
//         <h1>Users</h1>
//         {this.state.isLoading && <p>Loading...</p>}
//         {this.state.redirect && <Redirect to="/manage-user" />}
//         <Button
//           onClick={() =>
//             this.setState({
//               redirect: true
//             })
//           }
//         >
//           Add User
//         </Button>
//         {/* <Link to="/manage-user">Add User</Link> */}
//         <ul>{this.state.users.map(this.renderUser)}</ul>
//       </>
//     );
//   }
// }
