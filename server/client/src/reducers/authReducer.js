import * as types from "../actions/types";

const initialState = {
  loggedIn: false,
  requesting: true,
  error: ""
};

export default function(state = initialState, action) {
  console.log("action", action);

  switch (action.type) {
    // CHECK LOGIN STATUS
    case types.MISSING_TOKEN:
      return { ...state, loggedIn: false, requesting: false };
    case types.USER_REQUEST:
      return { ...state, requesting: true };
    case types.USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        requesting: false,
        error: ""
      };
    case types.USER_FAILURE:
      return {
        ...state,
        requesting: false,
        loggedIn: false,
        error: action.payload
      };

    // REGISTER
    case types.REGISTER_REQUEST:
      return { ...state, requesting: true };
    case types.REGISTER_SUCCESS:
      return { ...state, token: action.payload, requesting: false };
    case types.REGISTER_FAILURE:
      return { ...state, requesting: false, error: action.payload };

    // LOGIN
    case types.LOGIN_REQUEST:
      return { ...state, requesting: true };
    case types.LOGIN_SUCCESS:
      console.log("action.payload", action.payload);
      localStorage.setItem("JWT", action.payload.token);
      return {
        ...state,
        loggedIn: true,
        requesting: false,
        error: ""
      };
    case types.LOGIN_FAILURE:
      localStorage.removeItem("JWT");
      return {
        ...state,
        loggedIn: false,
        requesting: false,
        error: action.payload
      };

    default:
      return state;
  }
}
