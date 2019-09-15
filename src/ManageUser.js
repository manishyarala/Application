import React, { useState, useEffect } from "react";
import Input from "./reusable/Input";
import * as userApi from "./api/userApi";
import { toast } from "react-toastify";

const newUser = {
  id: null,
  name: "",
  hairColor: ""
};
function ManageUser(props) {
  //handle state via the useState hook
  const userState = useState(newUser);
  const [user, setUser] = userState;
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (props.match.params.userId) {
      userApi.getUserById(props.match.params.userId).then(user => {
        if (mounted) {
          setUser(user);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }

    //called when component is unmounting
    return () => (mounted = false);

    // eslint-disable-next-line no-use-before-define
  }, [props.match.params.userId]);
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
    if (!user.hairColor) _errors.hairColor = "Hair Color is required.";
    setErrors(_errors);
    //if errorrs object still has no properties, then there are no erros
    return Object.keys(_errors).length === 0;
  }

  function saveUser(event) {
    event.preventDefault();
    if (!isValid()) return;
    setIsFormSubmitted(true);
    user.id
      ? userApi.editUser(user).then(handleSave) //similar as  userApi.editUser(user).then(savedUser => handleSave(savedUser));
      : userApi.editUser(user).then(handleSave);
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
          id="user-name"
          name="name"
          label="Name"
          type="text"
          error={errors.name}
          onChange={handleChange}
          value={user.name}
        />

        <Input
          id="user-hairColor"
          name="hairColor" //this is the property we wanna set onChange
          label="Hair Color"
          type="text"
          error={errors.hairColor}
          value={user.hairColor}
          onChange={handleChange}
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

export default ManageUser;