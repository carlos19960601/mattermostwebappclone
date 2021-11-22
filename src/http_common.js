import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8065/api/v4",
  headers: {
    "Content-Type": "application/json",
  },
});
