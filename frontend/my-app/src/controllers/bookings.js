import { semiEndpoint } from "../Utils/ApiEndpoint";
import axios from "axios";

export function getPriceEstimate(dataJson) {
  return axios.post(semiEndpoint + "/bookings/get-estimate", dataJson);
}

export function confirmBooking(roomId, dataJson) {
  return axios.post(semiEndpoint + "/bookings/rooms/" + roomId, dataJson);
}
