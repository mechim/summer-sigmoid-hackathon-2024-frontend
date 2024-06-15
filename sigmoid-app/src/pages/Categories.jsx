import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Phones" },
    { id: 2, name: "Laptops" },
    { id: 3, name: "Cars" },
  ];

  const handleCategoryChoice = (categoryName) => {
    localStorage.setItem("category", categoryName);
    navigate("/tinder");
  };

  return (
    <div style={{ width:'393px', height:'873px'}}>
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
            onClick={() => handleCategoryChoice(category.name)}
            sx={{ mt: 2, backgroundColor:'#427aa1', width:'300px', height:'50px', fontSize:'24px', borderRadius:'8px'}}
          >
            {category.name}

          </Button>
        ))}
      </Box>
    </Container>
    </div>
  );
}
