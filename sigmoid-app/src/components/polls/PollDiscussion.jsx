import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
  Button,
  Container,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation } from "react-router-dom";
import PollReview from "./PollReview";

export default function PollDiscussion() {
  const { state } = useLocation();
  const { poll } = state;

  const [ratings, setRatings] = useState(
    poll.categories.map((category) => ({
      name: category.name,
      rating: 0,
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (index, newValue) => {
    const newRatings = [...ratings];
    newRatings[index].rating = newValue;
    setRatings(newRatings);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const averageRating =
    poll.categories.reduce((acc, category) => acc + category.rating, 0) /
    poll.categories.length;

  const reviews = [
    {
      author: "John Doe",
      ratings: [
        { name: "Category 1", rating: 4 },
        { name: "Category 2", rating: 3.5 },
      ],
      comment: "Great product!",
      upvotes: 10,
      downvotes: 2,
    },
    {
      author: "Jane Smith",
      ratings: [
        { name: "Category 1", rating: 3 },
        { name: "Category 2", rating: 4 },
      ],
      comment: "Pretty good overall.",
      upvotes: 7,
      downvotes: 1,
    },
  ];

  return (
    <Container 
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
      }}
    >
      <Card
        sx={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: 0.5,
          mt: 2,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: 120,
              borderRadius: 1,
              ml: 17,
            }}
            image={poll.image}
            alt={poll.name}
          />
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" component="div" sx={{ flex: 1 }}>
                {poll.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Rating
                  value={averageRating}
                  readOnly
                  precision={0.1}
                  icon={<StarIcon fontSize="small" />}
                  emptyIcon={<StarBorderIcon fontSize="small" />}
                />
                <Typography variant="h5" color="text.secondary">
                  {averageRating.toFixed(1)}
                </Typography>
              </Box>
              <Typography variant="body1">Characteristics:</Typography>
              {poll.categories.map((category, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, width: 300 }}>
                  <Typography variant="body2" color="text.secondary">
                    {category.name}:
                  </Typography>
                  <Rating
                    value={ratings[index].rating}
                    onChange={(event, newValue) =>
                      handleRatingChange(index, newValue)
                    }
                    precision={0.1}
                    icon={<StarIcon fontSize="small" />}
                    emptyIcon={<StarBorderIcon fontSize="small" />}
                    readOnly={submitted}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Box>
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
          disabled={submitted}
          sx={{ pb: 1 }}
        >
          {submitted ? "Submitted" : "Submit Ratings"}
        </Button>
      </Card>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {reviews.map((review, index) => (
          <PollReview key={index} review={review} />
        ))}
      </Box>
    </Container>
  );
}
