import React, { useState, useEffect, useRef } from "react";
import Input from "./reusable/Input";
import * as userApi from "./api/userApi";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { inputError, errorMessage } from "../src/styles";
import Select from "./reusable/Select";
//import { Select } from "@paycor/Select";

const newUser = {
  id: null,
  name: "",
  role: ""
};

function ManageUser(props) {
  const nameInputRef = useRef();
  //handle state via the useState hook
  const userState = useState(newUser);
  const [user, setUser] = userState;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const options = [
    { label: "", value: "" },
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" }
  ];

  useEffect(() => {
    if (!isLoading) {
      nameInputRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    //focus the name input on load after loading completes
    let mounted = true;
    if (props.match.params.userId) {
      const _user = props.users.find(
        u => u.id === parseInt(props.match.params.userId, 10)
      );

      if (mounted) {
        setUser(_user);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    //called when component is unmounting
    return () => (mounted = false);

    // eslint-disable-next-line no-use-before-define
  }, [isLoading, props.match.params.userId, props.users]);
  //const user = userState[0]; //which holds the state
  //const setUser = userState[1]; //which sets the state

  function handleSave(savedUser) {
    props.history.push("/users");
    toast.success(savedUser.name + " saved!");
  }

  function isValid() {
    //using underscore prefix to delcare its a private variable
    const _errors = {};
    if (!user.name) _errors.name = "Name is required.";
    if (!user.role) _errors.role = "Role is required.";
    setErrors(_errors);
    //if errorrs object still has no properties, then there are no erros
    return Object.keys(_errors).length === 0;
  }

  function saveUser(event) {
    debugger;
    event.preventDefault();
    if (!isValid()) return;
    setIsFormSubmitted(true);
    if (user.id) {
      userApi.editUser(user).then(savedUser => {
        const newUsers = props.users.map(u =>
          u.id === savedUser.id ? savedUser : u
        );
        props.setUsers(newUsers);
        handleSave(savedUser);
      }); //similar as  userApi.editUser(user).then(savedUser => handleSave(savedUser));
    } else {
      userApi.addUser(user).then(savedUser => {
        const newUsers = [...props.users, savedUser];
        props.setUsers(newUsers);
        handleSave(savedUser);
      });
    }
  }

  function handleChange(event) {
    const userCopy = { ...user };
    //using computed property syntax to set a property using a variable.
    userCopy[event.target.name] = event.target.value;
    setUser(userCopy);
  }
  if (isLoading === null) return null; //one way of solving flicker problem on add user, we can also use state
  if (isLoading) return "Loading...";
  return (
    <>
      <h1>Manage User</h1>
      <form onSubmit={saveUser}>
        <Input
          ref={nameInputRef}
          id="user-name"
          name="name"
          label="Name"
          type="text"
          error={errors.name}
          onChange={handleChange}
          value={user.name}
        />

        <Select
          label="Role"
          id="role"
          value={user.role}
          name="role"
          onChange={handleChange}
          options={options}
          error={errors.role}
        />

        <input
          type="submit"
          value={isFormSubmitted ? "saving..." : "Save User"}
          disabled={isFormSubmitted}
        />
      </form>
    </>
  );
}

ManageUser.propTypes = {
  setUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default ManageUser;
