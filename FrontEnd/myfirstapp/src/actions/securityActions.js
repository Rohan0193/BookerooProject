import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import jwt_decode from "jwt-decode";
import {setJWTToken} from "../securityUtils/setJWTToken"
import { userMicroServiceApi } from "../Utilities/hosts";

//register a new user
export const createNewUser = (newUser, history) => async dispatch => {

    try{
      // invoke sprintboot api
        await axios.post(userMicroServiceApi + "/api/users/register", newUser);
        history.push("/login");
        dispatch({
          type: GET_ERRORS,
          payload: {}
        });
    }
    catch (err){
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });

    }
};

//login with details into app
export const login = LoginRequest => async dispatch => {
    try {
      // post => Login Request
      const res = await axios.post(userMicroServiceApi + "/api/users/login", LoginRequest);
      // extract token from res.data
      const { token } = res.data;
      // store the token in the localStorage
      localStorage.setItem("token", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      //reload page after setting token
      window.location.href='/';
      // dispatch to our securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
     
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };

  //logout function 
  export const logout = () => {
      //clear the local storage and redirect the homepage
      localStorage.clear();
      window.location.href = '/';
}