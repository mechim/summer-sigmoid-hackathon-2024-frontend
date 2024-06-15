import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [value, setValue] = useState(-1);
  const navigate = useNavigate();
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/polls");
        break;
      case 1:
        navigate("/tinder");
        break;
      case 2:
        navigate("/matches");
        break;
      default:
        break;
    }
  };

  return (
<<<<<<< HEAD
    <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
=======
      <Box className="container" sx={{ position: "fixed", bottom: "0", width: "100%" }}>
>>>>>>> 11e90326bc709aa82af37f438e208872764a1bee
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <BottomNavigationAction label="Forum" sx={{'& .MuiBottomNavigationAction-label': {
              color: '#000',
              fontSize: '20px',
            },
            '&.Mui-selected': {
              color: '#49a078',
              fontSize: '20px',
            },
            '&:hover':{
              '& .MuiBottomNavigationAction-label': {
              color: '#49a078',
              fontSize: '20px',
            },
            }}}/>
        <BottomNavigationAction label="Tinder"  sx={{'& .MuiBottomNavigationAction-label': {
              color: '#000',
              fontSize: '20px',
            },
            '&.Mui-selected': {
              color: '#49a078',
              fontSize: '20px',
            },
            '&:hover':{
              '& .MuiBottomNavigationAction-label': {
              color: '#49a078',
              fontSize: '20px',
            },
            }}}/>
        <BottomNavigationAction label="Matches" sx={{'& .MuiBottomNavigationAction-label': {
              color: '#000',
              fontSize: '20px',
            },
            '&.Mui-selected': {
              color: '#49a078',
              fontSize: '20px',
            },
            '&:hover':{
              '& .MuiBottomNavigationAction-label': {
              color: '#49a078',
              fontSize: '20px',
            },
            }}}/>
      </BottomNavigation>
    </Box>
    
  );
}
