import axios from "axios";
import { get_admin } from "./../admin_security";

// STUB for controllers
export function fetch_bookings() {
	return new Promise((resolve, reject) => {
		const host_name = "http://52.53.127.193" || "http://localhost:5000";
		const end_point = "/bookings/admin";
		const URL = `${host_name}${end_point}`

		const { name, pwd } = get_admin();
		
		const network_call = axios.get(URL, {
			headers: { name, pwd }
		});

		network_call.then((response) => {
			// console.info("BookingsController::fetch_bookings::Response = ", response);
			resolve(response);
		}).catch((err) => {
			console.error("BookingsController::fetch_bookings::Error response = ", err);
			reject(err);
		});
	})
};
