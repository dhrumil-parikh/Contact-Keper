import React,{useReducer} from "react";

import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'

import {
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS
    
} from '../types'

const AuthState = props => {
    const initialState = {
        loading: null,
        error: null,
        user:null,
        isAuthenticated: null,
        token:localStorage.getItem('token')
        
    };
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    //Load User
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get("api/auth");

        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR,
        });
      }
    };

    //Register User
    const register = async formData => {    //Since we are making Post request we need
        const config = {                    //config and header
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data   //server will respond wwith token.It will go to auth users.where all this will be fetch 
                //if user already exists then it will go to catch else it wil retun token store in payload
            });
            loadUser()
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
                
            
        }
    };

    //Login User
    const login = async formData => {    //Since we are making Post request we need
        const config = {                    //config and header
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data   //server will respond wwith token.It will go to auth users.where all this will be fetch 
                //if user already exists then it will go to catch else it wil retun token store in payload
            });
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
                
            
        }
    };
    

    //Logout
    const logout = () => {
        dispatch({
            type:LOGOUT
        })
    }

    //Clear Error
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
            
            })
        }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error:state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout
        }}>

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;