import axios from "axios";
const BASE_URL = "http://localhost:3005/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

// public axios requests with BASE_URL and Token in header
const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// private axios requests with BASE_URL and Token in header
const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `${TOKEN}` },
});

export { currentUser, publicRequest, privateRequest };
