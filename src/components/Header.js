import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// eslint-disable-next-line
import { useHistory, Link } from "react-router-dom";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import "./Header.css";
import {InputLabel,FormControl,FilledInput, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import performSearch from "./Products"

const logout=()=>{
  
  localStorage.clear();
  window.location.reload();

  
}

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history=useHistory();
  const search= {val:""};
  const [value, setValue] = useState();

    
if(hasHiddenAuthButtons)
      {
    return(
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        
        {children}

        <Stack direction="row" spacing={2}>
          <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text" onClick={()=>history.push("/")}
        >
          Back to explore
        </Button>
        </Stack>
        </Box>
        );
      }
      if(!hasHiddenAuthButtons)
      {
        
      
        if(localStorage.getItem('username')=== null)
          {
            return (
              <Box className="header">
          <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
          <Stack direction="row" spacing={2}>
          
          <Button variant="text" size="medium" color="success" onClick={()=>history.push("/login")}>
                        Login
           </Button>
          <Button variant="contained" size="medium" color="success" onClick={()=>history.push("/register")}>
                        Register
           </Button>
           
          </Stack>
          </Box>);
          }
          else
          {
            return(
              <Box className="header">
          <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
       <Stack direction="row" alignItems="center" spacing={6}>
            <img src="avatar.png" alt={localStorage.getItem('username')}></img>
            <p>{localStorage.getItem('username')}</p>
            <Button variant="contained" color="success" onClick={()=>{logout(); history.push("/")}}>
                        Logout
           </Button>
            </Stack>
        </Box>
            );
          }
      
      
      }
        
   
};

export default Header;
