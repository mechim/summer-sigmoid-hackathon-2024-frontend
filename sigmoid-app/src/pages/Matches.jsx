import { Box, Container, Typography } from "@mui/material";
import MatchCard from "../components/matches/MatchCard";
import { useEffect, useState } from "react";
import api from "../axios";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        //const matchingIds = JSON.parse(localStorage.getItem("ids"));
        const matchingIds = [1, 2, 3, 4];
        const response = await api.post("/ratings/get-avgs-by-ids", {
          ids: matchingIds,
        });

        setMatches(response.data["ratings_data"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMatches();
  }, []);

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
      <Typography
        gutterBottom
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#D993A7",
          fontFamily: "Brush Script MT, cursive",
        }}
      >
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
