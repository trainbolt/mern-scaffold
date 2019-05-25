import * as types from "../actions/types";

const initialState = {
  requesting: true,
  loggedIn: false,
  user: null,
  error: null
};

export default function(state = initialState, action) {
  console.log("action", action);

  switch (action.type) {
    // CHECK LOGIN STATUS
    case types.MISSING_TOKEN:
      return {
        ...state,
        requesting: false,
        loggedIn: false,
        user: null
      };

    case types.USER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case types.USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        loggedIn: true,
        user: {
          ...(state.user || action.payload.user)
        },
        error: ""
      };

    case types.USER_FAILURE:
      return {
        ...state,
        requesting: false,
        loggedIn: false,
        user: null,
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
      return {
        ...state,
        requesting: false,
        loggedIn: true,
        user: action.payload.user,
        error: ""
      };

    case types.LOGIN_FAILURE:
      return {
        ...initialState,
        loggedIn: false,
        requesting: false,
        user: null,
        error: action.payload
      };

    default:
      return state;
  }
}
