import axios from "axios";
import history from "../history";
import * as types from "./types";

const authActions = {
  checkLoginStatus: token => {
    const missing = () => ({ type: types.MISSING_TOKEN });
    const request = () => ({ type: types.USER_REQUEST });
    const success = user => ({ type: types.USER_SUCCESS, payload: user });
    const failure = error => ({ type: types.USER_FAILURE, payload: error });

    return async dispatch => {
      if (token === "") {
        return dispatch(missing());
      }

      dispatch(request());
      try {
        const res = await axios.get("/auth/checkLoginStatus", {
          params: {}
        });
        dispatch(success(res.data));
      } catch (e) {
        console.log("e", e);
        dispatch(failure(e));
      }
    };
  },

  register: data => {
    const request = () => ({ type: types.REGISTER_REQUEST });
    const success = user => ({ type: types.REGISTER_SUCCESS, payload: user });
    const failure = error => ({ type: types.REGISTER_FAILURE, payload: error });

    return async dispatch => {
      dispatch(request());
      try {
        const res = await axios.post("/auth/register", {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password
        });
        dispatch(success(res.data));
        history.push("/login");
      } catch (e) {
        dispatch(failure(e));
      }
    };
  },

  login: data => {
    const request = () => ({ type: types.LOGIN_REQUEST });
    const success = user => ({ type: types.LOGIN_SUCCESS, payload: user });
    const failure = error => ({ type: types.LOGIN_FAILURE, payload: error });

    return async dispatch => {
      dispatch(request());
      try {
        const res = await axios.post("/auth/login", {
          email: data.email,
          password: data.password
        });
        dispatch(success(res.data));
        history.push("/app/dashboard");
      } catch (e) {
        dispatch(failure(e));
      }
    };
  }
};

export default authActions;
