import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:3221/api",
  withCredentials: true,
});

export default apiRequest;
