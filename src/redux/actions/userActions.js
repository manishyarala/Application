import * as userApi from "../../api/userApi";
import { LOAD_USERS_SUCCESS, DELETE_USER_SUCCESS } from "./actionTypes";

//Action Creator for load user success
export function loadUsersSuccess(users) {
  //passing users as payload
  return { type: LOAD_USERS_SUCCESS, users: users };
}

//Action creator for deleteUserSuccess
export function deleteUserSuccess(userId) {
  //passing users as payload
  return { type: DELETE_USER_SUCCESS, userId: userId };
}

//async action creator using redux-thunk
export function loadUsers() {
  return function(dispatch) {
    return userApi.getUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    });
  };
}

//async action for delete user
export function deleteUser(userId) {
  return function(dispatch) {
    return userApi.deleteUser(userId).then(() => {
      dispatch(deleteUserSuccess(userId));
    });
  };
}
