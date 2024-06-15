import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <Box sx={{ position: "fixed", bottom: "0", width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <BottomNavigationAction label="Polls" />
        <BottomNavigationAction label="Tinder" />
        <BottomNavigationAction label="Matches" />
      </BottomNavigation>
    </Box>
  );
}
