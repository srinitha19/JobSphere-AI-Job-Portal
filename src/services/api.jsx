import axios from "axios";

const api=axios.create({
  baseURL: "https://jobs-api14.p.rapidapi.com",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": "jobs-api14.p.rapidapi.com",
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
  },
});
export default api;