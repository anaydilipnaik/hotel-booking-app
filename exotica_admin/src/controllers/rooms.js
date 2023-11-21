import axios from "axios";
import { get_admin } from "../admin_security";

export async function fetch_rooms() {
	return new Promise((resolve, reject) => {
		const host_name = "http://52.53.127.193" || "http://localhost:5000";
		const end_point = "/rooms";
		const URL = `${host_name}${end_point}`;

		const network_call = axios.get(URL);

		network_call.then((response) => {
			resolve(response);
		}).catch((err) => {
			console.error("RoomsController::fetch_rooms::Error response = ", err);
			reject(err);
		});
	})
};

export async function create_room(new_room) {
	return new Promise((resolve, reject) => {
		const host_name = "http://52.53.127.193" || "http://localhost:5000";
		const end_point = "/rooms";
		const URL = `${host_name}${end_point}`;

		const { name, pwd } = get_admin();

		const network_call = axios.post(URL, new_room, {
			headers: { name, pwd}
		});

		network_call.then((response) => {
			const { status, data } = response;
			if (status === 200) resolve(data);
			throw response;
		}).catch((err) => {
			console.error("RoomsController::fetch_rooms::Error response = ", err);
			reject(err);
		});
	})
};

export async function update_room(roomId, room) {
	const host_name = "http://52.53.127.193" || "http://localhost:5000";
	const end_point = `/rooms/${roomId}`;
	const URL = `${host_name}${end_point}`;

	const { name, pwd } = get_admin();

	const network_call = axios.post(URL, room, {
		headers: { name, pwd}
	});

	const response = await network_call;
	const { status, data } = response;
	if (status === 200) return data;
	throw response;
};