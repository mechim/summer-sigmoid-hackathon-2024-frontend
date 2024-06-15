import PollCard from "../components/polls/PollCard";
import { Box, Container, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function Polls() {
  const polls = [
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPolls, setFilteredPolls] = useState(polls);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterPolls = () => {
    const filtered = polls.filter((poll) =>
      poll.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPolls(filtered);
  };

  useEffect(() => {
    filterPolls();
  }, [searchQuery]);

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
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {" "}
        Polls
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
        }}
      >
        {filteredPolls.map((poll, index) => (
          <PollCard key={index} poll={poll} />
        ))}
      </Box>
    </Container>
  );
}
