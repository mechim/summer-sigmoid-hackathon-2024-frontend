import React from "react";
import { Card, CardMedia, CardContent, Box, Typography } from "@mui/material";

export default function MatchCard({ match }) {
  return (
    <Card
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        px: 2,
        py: 0.5,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          mr: 2,
          objectFit: "cover",
          borderRadius: 1,
        }}
        image={match.image}
        alt={match.name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" component="div" sx={{ flex: 1 }}>
            {match.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body1">Matching categories:</Typography>
          {match.categories.map((category, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              sx={{ ml: 2 }}
            >
              {category.name}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
