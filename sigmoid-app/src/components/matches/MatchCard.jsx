import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

export default function MatchCard({ match }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/discussion", { state: { poll: match } });
  };

  return (
    <Card
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        px: 2,
        py: 0.5,
      }}
      onClick={handleCardClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ flex: 1, color: "#D993A7" }}>
          {match.product.name}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Matching criteria:
        </Typography>
        {match.product.category.parameters_list.map((parameter, index) => (
          <Typography key={index} variant="h6" color="text.secondary">
            {parameter}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
