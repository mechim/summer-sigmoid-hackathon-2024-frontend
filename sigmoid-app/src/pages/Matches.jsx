import { Box, Container, Typography } from "@mui/material";
import MatchCard from "../components/matches/MatchCard";

export default function Matches() {
  const matches = [
    {
      name: "Product 1",
      image: "https://via.placeholder.com/140",
      categories: [{ name: "Category 1" }, { name: "Category 2" }],
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/140",
      categories: [{ name: "Category 1" }, { name: "Category 2" }],
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
      <Typography gutterBottom variant="h3" sx={{ textAlign: "center", color:'#427aa1'}}>
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
