import { semiEndpoint } from "../Utils/ApiEndpoint";
import axios from "axios";

export function getAllRooms() {
  return axios.get(semiEndpoint + "/rooms");
}

export function getAmenities() {
  return axios.get(semiEndpoint + "/bookings/ammenities");
}
