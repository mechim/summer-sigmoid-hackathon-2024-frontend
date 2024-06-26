import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/get_all");
        setCategories(response.data["categories"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChoice = (categoryId) => {
    localStorage.setItem("category", categoryId);
    navigate("/tinder");
  };

  return (
    <div style={{ width: "393px", height: "873px", marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} width="150" />
        <p
          style={{
            color: "#D993A7",
            fontSize: "28px",
            fontStyle: "bold",
            marginLeft: "10px",
          }}
        >
          SWIPY
        </p>
      </div>

      <Container
        sx={{
          position: "absolute",
          top: 180,
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {" "}
          Select product categories you are interested in:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="contained"
              onClick={() => handleCategoryChoice(category.id)}
              sx={{
                mt: 2,
                backgroundColor: "#D993A7",
                width: "300px",
                height: "50px",
                fontSize: "24px",
                borderRadius: "8px",
              }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Container>
    </div>
  );
}
