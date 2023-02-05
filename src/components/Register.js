
import { RoomTwoTone } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ReactDOM from 'react-dom';
import axios from "axios";
import { useSnackbar } from "notistack";
import {useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import "./Login.js";

const Register = () => {
const data= {username:"",
  password:"",
password1:""};
  const process=0;
  const [value,setValue]=useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

   
   
   
  const register = async (formData) => {
    
  console.log(data.password);
  setValue(100);
  await axios.post(`${config.endpoint}/auth/register`,{
   username: data.username,
    password:data.password
    }).then(function(res)
    { 
      if(res.status===201)
      {
       setValue(0);
       enqueueSnackbar('success');
       history.push("/login");
        
      }
      else{ setValue(0); enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON');}}
      ).catch(function(error){setValue(0); enqueueSnackbar(error.response.data.message)});
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  // eslint-disable-next-line
  const validateInput = (e,data) => {
   setValue(40);
    e.preventDefault();
  
    if(data.username.length===0)
     {
      setValue(0);
      enqueueSnackbar('username is required');
     }
     else if(data.password.length===0||data.password1.length===0)
     {
      setValue(0);
     enqueueSnackbar('Password is required');
     }
     
      if(data.username.length<6)
      {
        setValue(0);
      enqueueSnackbar('Username must be atleast 6 characters');
      }
      else if(data.password.length===0||data.password.length<6)
      {
        setValue(0);
      enqueueSnackbar('Password must be atleast 6 characters');
      }
      else if(!(data.password===data.password1))
      {
        setValue(0);
      enqueueSnackbar('Passwords do not match');
      }
      else 
      { setValue(70); register();}
    
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
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
           
            onChange={(e)=>data.username=e.target.value}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            
            onChange={(e)=>data.password=e.target.value}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            
            onChange={(e)=>data.password1=e.target.value}
          />
           <Button  id ="btn1" className="button" variant="contained" onClick={(event)=>validateInput(event,data)}>
            Register Now
           </Button>
           <CircularProgress variant="determinate" value={value}/>
          <p className="secondary-action">
            Already have an account?{" "}
      
            <Link to="/login">Login here</Link>
          
          </p>
          
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
