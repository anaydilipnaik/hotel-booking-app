const db = require("../dbConnection");
const DB_TABLE_ROOMS = process.env.DB_TABLE_ROOMS || 'rooms';
const model = {};

model.ROOM_ACCOMODATION = {
	'single': 1,
	'double': 2,
	'suites': 4
};

model.getRoomsByRoomID = (roomId, table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT *
			FROM ${table}
			WHERE id = '${roomId}'
			`
		;

		console.info("Query = ", query);
		db.query(query, (err, results) => {
			if (err) return reject(err);
			return resolve(results);
		});
	});
};

model.getRooms = (table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT * 
			FROM ${table}
		`
		;

		console.info("QUERY =", query);

		db.query(query, (err, hotel) => {
			if (err) return reject(err);
			return resolve(hotel);
		})
	})
};

model.createRoomFactory = (newRoomObject) => {

	let commaSeperatedProperties = "";
	let commaSeperatedValues = "";
	
	Object.keys(newRoomObject).map((key) => {
		commaSeperatedProperties += `${key},`
	});

	Object.values(newRoomObject).map((val) => {
		commaSeperatedValues += `'${val}',`
	});

	commaSeperatedProperties = commaSeperatedProperties.substring(0, commaSeperatedProperties.length - 1);
	commaSeperatedValues = commaSeperatedValues.substring(0, commaSeperatedValues.length - 1);

	return {
		commaSeperatedProperties,
		commaSeperatedValues
	};
};

model.create = (newRoomObject, table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const {
			commaSeperatedProperties, 
			commaSeperatedValues
		} = newRoomObject;

		const query = `
			INSERT
			INTO ${table} (${commaSeperatedProperties})
			VALUES (${commaSeperatedValues});
		`;

		console.info("QUERY @roomsModel = ", query);

		db.query(query, (err, hotel) => {
			if (err) return reject(err);
			return resolve(hotel);
		})
	});
};

model.updateRequestactory = (name, base_price, min_guests, week_end_surge, festival_surge, guest_surge) => {
	// ADDING extra SPACE after sentence 1 to delimit fields
	const _ = `
		name = '${name}',
		 base_price = '${base_price}',
		 min_guests = '${min_guests}',
		 week_end_surge = '${week_end_surge}',
		 festival_surge = '${festival_surge}',
		 guest_fee = '${guest_surge}'
	`;
	console.info("roomModel::updateRequestFactory:: Request = ", _);
	return _;
};

model.updateByID = (roomId, spaceSeperatedUpdateQueryString, table = DB_TABLE_ROOMS) => {
	return new Promise((resolve, reject) => {
		const query = `
			UPDATE ${table}
			SET ${spaceSeperatedUpdateQueryString}
			WHERE id = '${roomId}';
		`;

		console.info(query);

		db.query(query, (err, updateStatusObj) => {
			if (err) return reject(err);
			return resolve(updateStatusObj);
		})
	});
};
module.exports = model;
