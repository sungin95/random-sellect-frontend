// import Cookie from "js-cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  //   withCredentials: true,
});

export const getMe = () =>
  instance.get(`questions/`).then((response) => response.data);

export const getLists = () =>
  instance.get(`questions/`).then((response) => response.data);
