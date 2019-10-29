import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const { loggedInUser, logout } = useContext(UserContext);

  return (
    <>
      <h1>Home</h1>
      {loggedInUser && (
        <p>
          Hi {loggedInUser.name} <button onClick={logout}>Logout</button>
        </p>
      )}
    </>
  );

  //below is if we want to use UserContext.Consumer

  // return (
  //   <UserContext.Consumer>
  //     {loggedInUser => {
  //       return (
  //         <>
  //           <h1>Home</h1>
  //           {loggedInUser && <p>Hi {loggedInUser.name}</p>}
  //         </>
  //       );
  //     }}
  //   </UserContext.Consumer>
  // );
};

export default Home;

//pure function only relies on ours and it doesnt mutate
