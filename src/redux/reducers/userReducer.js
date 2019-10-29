import {
  LOAD_USERS_SUCCESS,
  DELETE_USER_SUCCESS
} from "../actions/actionTypes";
import users from "./initialState";

export default function userReducer(state = users, action) {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.users; //this will update redux store
    case DELETE_USER_SUCCESS:
      return state.filter(u => u.id !== action.userId); //this will update redux store
    default:
      return state;
  }
}
