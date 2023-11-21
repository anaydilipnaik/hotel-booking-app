import { semiEndpoint } from "../Utils/ApiEndpoint";
import axios from "axios";

export function registerUser(dataJson) {
  return axios.post(semiEndpoint + "/register", dataJson);
}

export function loginUser(dataJson) {
  return axios.post(semiEndpoint + "/login", dataJson);
}
