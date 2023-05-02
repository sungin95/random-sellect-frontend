// import Cookie from "js-cookie";
import axios from "axios";
import { IUserSignUpVariables, IUsernameLoginVariables } from "./types";
import Cookie from "js-cookie";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const getLists = () =>
  instance.get(`questions/`).then((response) => response.data);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const userSignUp = ({ username, password }: IUserSignUpVariables) =>
  instance
    .post(
      `/users/user-create`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
