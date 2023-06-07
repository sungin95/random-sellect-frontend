// import Cookie from "js-cookie";
import axios from "axios";
import {
  IUploadQuestion,
  IUserSignUpVariables,
  IUsernameLoginVariables,
} from "./types";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1/"
      : "https://backend.gpt-is-interviewer.me/api/v1",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const getLists = ({ queryKey }: QueryFunctionContext) => {
  const [_, page] = queryKey;
  return instance.get(`questions/${page}`).then((response) => response.data);
};
export const getTotalListsCount = () =>
  instance.get(`questions/total`).then((response) => response.data);

export const getMyLists = () =>
  instance.get(`questions/sellected/`).then((response) => response.data);

export const getTotalMyListsCount = () =>
  instance.get(`questions/sellected/total`).then((response) => response.data);

export const putMyListImportant = ([pk, data]: string[]) => {
  instance
    .put(
      `questions/sellected/${pk}/detail`,
      { importance: data },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const getMyListsStart = () =>
  instance.get(`questions/sellected/start`).then((response) => response.data);

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

export const uploadQuestion = (variables: IUploadQuestion) =>
  instance
    .post(`questions/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const AddList = (pk: number) =>
  instance
    .post(`questions/sellected/${pk}`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const DeleteList = (pk: number) =>
  instance
    .delete(`questions/sellected/${pk}/detail`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
