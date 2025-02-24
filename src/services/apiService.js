import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store/store";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    const state = store.getState(); // Get the latest Redux state
    const loggedInAccessToken = state.authentication?.accessToken;
    const registeredAccessToken = state.user?.accessToken;
    const accessToken = loggedInAccessToken || registeredAccessToken;

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response.data;
  },
  function (error) {
    console.log("RESPONSE ERROR", { error });
    const message = error.response?.data || "Unknown Error";
    return Promise.reject({ message });
  }
);

export default apiService;
