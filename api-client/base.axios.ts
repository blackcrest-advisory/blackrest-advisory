import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
