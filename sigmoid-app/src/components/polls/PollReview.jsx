import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import api from "../../axios";

export default function PollReview({ review }) {
  const [votes, setVotes] = useState(review.author.score);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (type, userId) => {
    let response;

    try {
      if (type === "up") {
        response = await api.patch(`/users/inc/${userId}`);
      } else if (type === "down") {
        response = await api.patch(`/users/dec/${userId}`);
      }
    } catch (error) {
      console.log(error);
    }

    setVotes(response.data.user.score);
    setHasVoted(true);
  };

  return (
    <Card sx={{ width: 350 }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" component="div">
            {review.author.username}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            "{review.comment}"
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {review.product.category.parameters_list.map((parameter, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <Typography variant="body1" color="text.secondary">
                  {parameter}:
                </Typography>
                <Rating
                  value={review.values[index] / 2}
                  readOnly
                  precision={0.1}
                  icon={<StarIcon fontSize="small" />}
                  emptyIcon={<StarBorderIcon fontSize="small" />}
                />
                <Typography variant="h5" color="text.secondary">
                  {review.values[index] / 2}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <IconButton
              onClick={() => handleVote("up", review.author.id)}
              color="primary"
              disabled={hasVoted}
            >
              <ArrowUpwardIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {votes}
            </Typography>
            <IconButton
              onClick={() => handleVote("down")}
              color="secondary"
              disabled={hasVoted}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
