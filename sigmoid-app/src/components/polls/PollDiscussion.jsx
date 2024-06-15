import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Rating,
  Button,
  Container,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLocation } from "react-router-dom";
import PollReview from "./PollReview";
import api from "../../axios";

export default function PollDiscussion() {
  const { state } = useLocation();
  const { poll } = state;

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.post("/ratings/get_by_pn", {
          name: poll.product.name,
        });

        const filteredReviews = response.data["ratings"].filter(
          (review) => review.author.username !== "KidNamedAverage"
        );
        filteredReviews.sort((a, b) => b.author.score - a.author.score);

        setReviews(filteredReviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const calculateAverage = () => {
      const sum = poll.values.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const average = sum / poll.values.length;
      setAvg(average);
    };

    calculateAverage();
  }, []);

  const [ratings, setRatings] = useState(
    poll.product.category.parameters_list.map((category) => ({
      name: category,
      rating: 0,
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (index, newValue) => {
    const newRatings = [...ratings];
    newRatings[index].rating = newValue;
    setRatings(newRatings);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/ratings/create", {
        values: ratings.map((r) => r.rating * 2),
        author: 6,
        product: poll.product.id,
        comment: comment,
      });

      const newReview = response.data["new_rating"];
      setReviews(
        [...reviews, newReview].sort((a, b) => b.author.score - a.author.score)
      );

      const resp = await api.post(`/ratings/recalc-avg/${poll.product.id}`);
      const newRating = resp.data["average_rating"];

      const sum = resp.data["average_rating"].values.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const average = sum / poll.values.length;
      setAvg(average);
    } catch (error) {
      console.log(error);
    }

    setComment("");
    setRatings(
      poll.product.category.parameters_list.map((category) => ({
        name: category,
        rating: 0,
      }))
    );
    setSubmitted(true);
  };

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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: 120,
              borderRadius: 1,
              ml: 17,
              mt: 12,
            }}
            image={poll.product.image_url}
            alt={poll.product.name}
          />
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Rating
                  value={avg / 2}
                  readOnly
                  precision={0.1}
                  icon={<StarIcon fontSize="small" />}
                  emptyIcon={<StarBorderIcon fontSize="small" />}
                />
                <Typography variant="h5" color="text.secondary">
                  {avg.toFixed(0.1)}
                </Typography>
              </Box>
              <Typography variant="body1">Characteristics:</Typography>
              {ratings.map((parameter, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, width: 300 }}>
                  <Typography variant="body2" color="text.secondary">
                    {parameter.name}:
                  </Typography>
                  <Rating
                    value={parameter.rating}
                    onChange={(event, newValue) =>
                      handleRatingChange(index, newValue)
                    }
                    precision={0.1}
                    max={5}
                    icon={<StarIcon fontSize="small" />}
                    emptyIcon={<StarBorderIcon fontSize="small" />}
                    readOnly={submitted}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Box>
        <TextField
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
          variant="outlined"
          fullWidth
        />
        <Button
          size="small"
          color="primary"
          onClick={handleSubmit}
          disabled={submitted}
          sx={{ pb: 1, mt: 1.5 }}
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
