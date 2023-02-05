import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
import { Token } from "@mui/icons-material";
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data= {username:"",
  password:""
, balance:5000
};

const history=useHistory();
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    console.log(data.username);
  
  await axios.post(`${config.endpoint}/auth/login`,{
   username: data.username,
    password:data.password
    }).then(function(res)
    { 
      if(res.status===201)
      {
        console.log(res.data.token);
        persistLogin(res.data.token,data.username,data.balance);
        enqueueSnackbar('logged in');
        history.push("/");
      }
      else{  enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON');}}
      ).catch(function(error){enqueueSnackbar(error.response.data.message)});
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (e,data) => {
    
    e.preventDefault();
    console.log(data);
    if(data.username.length===0)
     {
      
      enqueueSnackbar('username is required');
     }
     else if(data.password.length===0)
     {
      
     enqueueSnackbar('Password is required');
     }
     else 
      {  login();}
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    window.localStorage.setItem("token",token);
    window.localStorage.setItem("username",username);
    window.localStorage.setItem("balance",balance);
    
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        
        <Stack spacing={2} className="form">
          <h2>Login</h2>
          <TextField label="username" id="username" name="username" variant="outlined" onChange={(e)=>data.username=e.target.value} />
          <TextField label="password" id="password" name="password" variant="outlined" onChange={(e)=>data.password=e.target.value} />
          <Button variant="contained" onClick={(event)=>validateInput(event,data)}>Login to QKart</Button>
          <Link to="/register">Don’t have an account? Register now</Link>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
