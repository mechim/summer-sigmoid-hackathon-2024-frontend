import PollCard from "../components/polls/PollCard";
import { Box, Container, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../axios";

export default function Polls() {
  const [polls, setPolls] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPolls, setFilteredPolls] = useState([]);

  useEffect(() => {
    const fetchRandomPolls = async () => {
      try {
        const categoryId = localStorage.getItem("category");
        const response = await api.get(`/ratings/get-rr-by-cat/${categoryId}`);
        setPolls(response.data["ratings_data"]);
        setFilteredPolls(response.data["ratings_data"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomPolls();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterPolls = async () => {
    const response = await api.post("/ratings/get_by_pn", {
      name: searchQuery,
    });

    const filtered = response.data["ratings"].filter(
      (poll) => poll.author.username === "KidNamedAverage"
    );
    setFilteredPolls(filtered);
  };

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
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#D993A7",
          fontFamily: "Brush Script MT, cursive ",
        }}
      >
        {" "}
        Review
      </Typography>
      <TextField
        id="search"
        label="Search Polls"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            filterPolls();
          }
        }}
        autoComplete="off"
        sx={{ width: "103.5%", mt: 2, mb: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          "& > :last-child": {
            mb: 5,
          },
        }}
      >
        {filteredPolls.map((poll, index) => (
          <PollCard key={index} poll={poll} />
        ))}
      </Box>
    </Container>
  );
}
