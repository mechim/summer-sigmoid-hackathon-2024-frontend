import axios from "axios";

const api = axios.create({
  baseURL: "https://summer-sigmoid-hackathon-2024-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
