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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function PollReview({ review }) {
  const [upvotes, setUpvotes] = useState(review.upvotes);
  const [downvotes, setDownvotes] = useState(review.downvotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
    setHasVoted(true);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
    setHasVoted(true);
  };

  return (
    <Card sx={{ width: 350 }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6" component="div">
            {review.author}
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            "{review.comment}"
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {review.ratings.map((category, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <Typography variant="body1" color="text.secondary">
                  {category.name}:
                </Typography>
                <Rating
                  value={category.rating}
                  readOnly
                  precision={0.1}
                  icon={<StarIcon fontSize="small" />}
                  emptyIcon={<StarBorderIcon fontSize="small" />}
                />
                <Typography variant="h5" color="text.secondary">
                  {category.rating}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <IconButton
              onClick={handleUpvote}
              color="primary"
              disabled={hasVoted}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {upvotes}
            </Typography>
            <IconButton
              onClick={handleDownvote}
              color="secondary"
              disabled={hasVoted}
            >
              <ThumbDownIcon />
            </IconButton>
            <Typography variant="body2">{downvotes}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
