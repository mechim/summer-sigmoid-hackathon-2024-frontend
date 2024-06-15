import { Box, Card, Container, Typography } from "@mui/material";
import MatchCard from "../components/matches/MatchCard";

export default function Matches() {
  const matches = [
    {
      name: "Product 1",
      image: "https://via.placeholder.com/140",
      categories: [
        { name: "Category 1", rating: 3.8 },
        { name: "Category 2", rating: 3.8 },
      ],
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/140",
      categories: [
        { name: "Category 1", rating: 3.8 },
        { name: "Category 2", rating: 3.8 },
      ],
    },
  ];

  return (
    <Container
      sx={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Typography gutterBottom variant="h2" sx={{ textAlign: "center" }}>
        {" "}
        Matches
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </Box>
    </Container>
  );
}
