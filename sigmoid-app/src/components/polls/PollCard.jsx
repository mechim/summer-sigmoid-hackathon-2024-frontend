import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

export default function PollCard({ poll }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/discussion", { state: { poll } });
  };

  return (
    <Card
      sx={{
        width: 340,
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.5,
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: 1,
        }}
        image={poll.product.image_url}
        alt={poll.product.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" component="div" sx={{ flex: 1 }}>
            {poll.product.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body1">Characteristics:</Typography>
          {poll.product.category.parameters_list.map((parameter, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, width: 300 }}>
              <Typography variant="body2" color="text.secondary">
                {parameter}:
              </Typography>
              <Rating
                value={poll.values[index]}
                readOnly
                precision={0.1}
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarBorderIcon fontSize="small" />}
              />
              <Typography variant="body2" color="text.secondary">
                {poll.values[index].toFixed(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
