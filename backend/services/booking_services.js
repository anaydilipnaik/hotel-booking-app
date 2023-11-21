const model = require("./../models/bookingsModel");
const roomModel = require("./../models/roomsModel");
const PricingService = require("./pricing_service");
const {
  HTTP_404,
  HTTP_500,
  HTTP_RES,
  IS_VALID_DATE,
} = require("./../Utilities/http_utils");

class BookingService {
  /**
   * @description GET /hotels
   * consumed by both users and hotels
   */

  constructor() {
    this.FETCHED_BOOKINGS = "Fetched Bookings";
    this.AMMENITIES = {
      breakfast: "Breakfast",
      fitness_room: "Fitness Room",
      parking: "Parking",
      pool: "Pool",
      all_meals: "All meals",
    };

    this.ROOM_TYPES = {
      single: "Single",
      double: "Double",
      suite: "Suite",
    };
  }

  async getHotelBookings() {
    try {
      const bookings = await model.getHotelBookings();
      return {
        status: 200,
        data: bookings,
        msg: this.FETCHED_BOOKINGS,
      };
    } catch (err) {
      console.error(
        "BookingService::getHotelBookings::Uncaught exception\n",
        err
      );
      return HTTP_500();
    }
  }

  async getUserBookings(userId) {
    try {
      const bookings = await model.getUserBookings(userId);
      return {
        status: 200,
        data: bookings,
        msg: this.FETCHED_BOOKINGS,
      };
    } catch (err) {
      console.error(
        "BookingService::getUserBookings::Uncaught exception\n",
        err
      );
      return HTTP_500();
    }
  }

  /**
   * @todo Continue to keep an eye on this API
   * This API is very important over the entire application.
   * It is critical, detailed, and effects many moving componenets.
   * Must ensure care for the dev of this API
   *
   * @param {*} userId
   * @param {*} roomId
   * @param {*} bookingInfo
   * @param {*} hotelId
   * @returns 200 A successful booking
   */
  async bookRoomForUser(roomId, bookingInfo) {
    try {
      const { userId, start, end, total_guests, ammenities } = bookingInfo;

      if (!(Array.isArray(ammenities) && ammenities.length <= Object.keys(this.AMMENITIES).length)) {
        return HTTP_RES(400, "Invalid ammenities");
      };

      for(let i = 0; i < ammenities.length; i++) {
        let cmp = ammenities[i];
        if (!(cmp in this.AMMENITIES)) {
          return HTTP_RES(400, "Illegal ammenity");
        }
      }

      let ammenities_string = ammenities.join(",");

      if (!IS_VALID_DATE(start) && !IS_VALID_DATE(end)) {
        return HTTP_RES(400, "Invalid date format");
      }

      const startDate = new Date(start);
      const endDate = new Date(end);

      if (
        startDate < new Date() ||
        endDate < new Date() ||
        endDate < startDate || 
        (Math.floor((endDate - startDate) / (1000*60*60*24)) > 7)
      ) {
        return HTTP_RES(400, "Invalid start and end dates");
      }
      // Assert room can be booked
      const existingBooking = await model.getBookingsByDates(
        startDate,
        endDate,
        roomId
      );
      if (Array.isArray(existingBooking) && existingBooking.length > 0) {
        return HTTP_RES(400, "Room Booking Exists");
      }

      // (a) Validate room exists (b) and is not booked
      const rooms = await roomModel.getRoomsByRoomID(roomId);
      if (!Array.isArray(rooms) || rooms.length == 0)
        return HTTP_404("No such room");

      const [roomObject] = rooms;
      const {
        min_guests,
        guest_fee,
        week_end_surge,
        festival_surge,
        base_price,
      } = roomObject;

      // Calculate price for the room
      const finalPrice = PricingService.calculateRoomPrice({
        base_fare: PricingService.get_base_fare(base_price, start, end),
        guest_charge: PricingService.guest_charge({
          total_guests,
          min_guests,
          guest_fee,
        }),
        surge_charge: PricingService.surge_charge({
          start,
          end,
          week_end_surge,
          festival_surge,
        }),
        customer_rewards: await PricingService.customer_rewards(userId, base_price),
      });

      await model.create(
        userId,
        roomId,
        finalPrice,
        startDate,
        endDate,
        total_guests,
        "confirmed",
        ammenities_string
      );

      let newlyCreatedBooking = await model.getBookingsByDates(
        startDate,
        endDate,
        roomId
      );
      
      let [updated_booking] = newlyCreatedBooking;
      updated_booking["ammenities"] = updated_booking["ammenities"].split(",");
      return HTTP_RES(200, "Success", [updated_booking]);
    } catch (e) {
      console.error("BookingService::bookRoomForUser::Uncaught exception\n", e);
      return HTTP_500();
    }
  }

  async updateBooking(bookingId, request) {
    try {
      const { start, end, userId } = request;

      const bookings = await model.getByID(bookingId);
      if (Array.isArray(bookings) && bookings.length == 0) {
        console.error(
          "BookingService::UpdateBooking:: Not such booking",
          bookingId
        );
        return HTTP_404("No such booking");
      }

      let [booking] = bookings;
      booking["ammenities"] = booking["ammenities"].split(",");
      if (booking.user_id != userId) {
        console.error(
          "BookingService::UpdateBooking:: Booking user != authenticated user ",
          booking.user_id,
          userId
        );
        return HTTP_RES(403, "You are not allowed to do this");
      }

      // Assert room can be booked
      if (!IS_VALID_DATE(start) || !IS_VALID_DATE(end)) {
        console.error(
          "BookingService::UpdateBooking:: Invalid date(s) ",
          start,
          end
        );
        return HTTP_RES(400, "Invalid dates");
      }

      const existingBooking = await model.getBookingsByDates(
        new Date(start),
        new Date(end),
        booking.room_id
      );
      if (Array.isArray(existingBooking) && existingBooking.length > 0) {
        console.error(
          "BookingService::UpdateBooking:: Booking exists",
          start,
          end,
          booking
        );
        return HTTP_RES(400, "Room Booking Exists");
      }

      const UPDATE_QUERY = `
                from_date= '${new Date(start).toISOString().replace("Z", "")}',
                to_date = '${new Date(end).toISOString().replace("Z", "")}'
            `;
      booking.from_date = new Date(start);
      booking.to_date = new Date(end);

      await model.updateByID(bookingId, UPDATE_QUERY);
      return HTTP_RES(200, "Success", booking);
    } catch (err) {
      console.error("BookingService::updateBooking::Uncaught exception\n", err);
      return HTTP_500();
    }
  }

  async cancelBooking(bookingId, userId) {
    try {
      const bookings = await model.getByID(bookingId);
      if (Array.isArray(bookings) && bookings.length == 0) {
        console.error(
          "BookingService::cancelBooking:: No such booking",
          bookingId
        );
        return HTTP_404("No such booking");
      }

      let [booking] = bookings;

      if (booking.user_id != userId) {
        console.error(
          "BookingService::cancelBooking:: Booking user != authenticated user ",
          booking.user_id,
          userId
        );
        return HTTP_RES(403, "You are not allowed to do this");
      }

      const DELETE_QUERY = `
                status='cancelled'
            `;

      booking.status = "cancelled";
      const updated = await model.updateByID(bookingId, DELETE_QUERY);
      return HTTP_RES(200, "Success", booking);
    } catch (err) {
      console.error("BookingService::cancelBooking::Uncaught exception\n", err);
      return HTTP_500();
    }
  }

  async estimatePrice(roomId, start, end, total_guests = 0) {
    if (!IS_VALID_DATE(start) && !IS_VALID_DATE(end)) {
      return HTTP_RES(400, "Invalid date format");
    }

    const rooms = await roomModel.getRoomsByRoomID(roomId);
    if (!(Array.isArray(rooms) && rooms.length > 0))
      return HTTP_RES(404, "Unable to find room");

    const [roomObject] = rooms;
    const {
      base_price,
      min_guests,
      guest_fee,
      week_end_surge,
      festival_surge,
    } = roomObject;

    // Calculate price for the room
    const finalPrice = PricingService.calculateRoomPrice({
      base_fare: PricingService.get_base_fare(base_price, start, end),
      guest_charge: PricingService.guest_charge({
        total_guests,
        min_guests,
        guest_fee,
      }),
      surge_charge: PricingService.surge_charge({
        start,
        end,
        week_end_surge,
        festival_surge,
      }),
      customer_rewards: PricingService.customer_rewards(),
    });

    return HTTP_RES(200, "Estimated Price", { finalPrice });
  }

  async getAmmenities() {
    return HTTP_RES(200, "Success", this.AMMENITIES);
  }

  async getRoomTypes() {
    return HTTP_RES(200, "Success", this.ROOM_TYPES);
  }
}

module.exports = BookingService;
