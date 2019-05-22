import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import * as types from "../actions/types";

const initialState = {
  token: "",
  loggedIn: false,
  requesting: true,
  error: ""
};

export default function(state = initialState, action) {
  console.log("action", action);

  switch (action.type) {
    case types.MISSING_TOKEN:
      return { ...state, loggedIn: false, requesting: false };
    case types.USER_REQUEST:
      return { ...state, requesting: true };
    case types.USER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loggedIn: true,
        requesting: false,
        error: ""
      };
    case types.USER_FAILURE:
      return {
        ...state,
        token: "",
        requesting: false,
        loggedIn: false,
        error: action.payload
      };

    case types.REGISTER_REQUEST:
      return { ...state, requesting: true };
    case types.REGISTER_SUCCESS:
      return { ...state, token: action.payload, requesting: false };
    case types.REGISTER_FAILURE:
      return { ...state, requesting: false, error: action.payload };

    case types.LOGIN_REQUEST:
      return { ...state, requesting: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loggedIn: true,
        requesting: false
      };
    case types.LOGIN_FAILURE:
      return { ...state, requesting: false, error: action.payload };

    default:
      return state;
  }
}
