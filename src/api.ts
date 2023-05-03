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
  baseURL: "http://127.0.0.1:8000/api/v1",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const getLists = () =>
  instance.get(`questions/`).then((response) => response.data);

export const getMyLists = () =>
  instance.get(`sellected-questions/`).then((response) => response.data);

// export const getMyLists = ({ queryKey }: QueryFunctionContext) => {
//   const [_, QuestionPk] = queryKey;
//   return instance
//     .get(`questions/${QuestionPk}/detail`)
//     .then((response) => response.data);
// };

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
    .post(`sellected-questions/${pk}`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const DeleteList = (pk: number) =>
  instance
    .delete(`sellected-questions/${pk}/detail`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
