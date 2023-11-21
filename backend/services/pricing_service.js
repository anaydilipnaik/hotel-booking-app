const bookingModel = require('./../models/bookingsModel');

/**
 * ROOM
 * min_guests
 * weekend_surge
 * festival_surge
 */

class PricingService {
    static guest_charge(guestInfo) {
        const { 
            total_guests,
            min_guests,
            guest_fee
        } = guestInfo;

        console.info("Guest info = ", guestInfo);

        return Math.min(
            0, 
            (total_guests - min_guests) * guest_fee
        );
    };

    static weekend_surge(date, surge) {
        const nd = new Date(date);
        if (nd.getDay() === 0 ||  nd.getDay() === 6) {
            // console.log("Weekend surge = ", surge);
            return surge;
        };
        return 0;
    };

    static festival_surge(date, surge) {
        const FESTIVALS = {
            "12/31": 1,
            "1/17": 1,
            "2/21": 1,
            "5/30": 1,
            "6/20": 1,
            "7/4": 1,
            "9/5": 1,
            "10/10": 1,
            "11/11": 1,
            "11/24": 1,
            "12/26": 1,
        };

        const nd = new Date(date);
        const festival = `${nd.getMonth()/nd.getDate()}`;

        // console.log("Festival Surge = ", surge);
        if (festival in FESTIVALS) return surge;
        return 0;
    };

    static surge_charge(surgeInfo) {
        const {
            start,
            end,
            week_end_surge,
            festival_surge
        } = surgeInfo;

        let charge = 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            charge += Math.max(
                this.weekend_surge(date, week_end_surge),
                this.festival_surge(date, festival_surge)
            )
        };

        console.log("Total Surge = ", charge);
        return charge; 
    };

    /**
     * Customer Rewards are based on the number of bookings
     * 1 to 3 gives 0.1
     * 3 to 5 gives 0.05
     * 5 to 10 gives 0.03
     * 10 to 20 gives 0.02
     * 0.1
     * 0.15
     * 0.18
     * 0.2
     * @param {*} userId 
     * @param {*} price 
     * @returns 
     */
    static async customer_rewards(userId, price) {
        const bookings = await bookingModel.getUserBookings(userId);
        let rewards = 0;
        if (Array.isArray(bookings) && bookings.length > 0) {
            if (bookings.length  <= 3)  {
                rewards = 0.1;
            } else if (bookings.length <=5 ) {
                rewards = 0.15;
            } else if (bookings.length <= 10) {
                rewards = 0.18;
            } else if (bookings.length <= 20){
                rewards = 0.20;
            } else {
                rewards = 0.22
            }
        }

        return rewards * price;
    };

    static get_base_fare(base_price, start, end) {
        let fare = 0;
        const startDate = new Date(start);
        const endDate = new Date(end);

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            fare += base_price
        };

        return fare;
    };

    static calculateRoomPrice(pricingDetails) {
        const {
            base_fare,
            guest_charge, 
            surge_charge, 
            customer_rewards
        } = pricingDetails;
        console.log("calculateRoomPrice:: Details = ", pricingDetails);
        const price = base_fare + guest_charge + surge_charge - customer_rewards
        console.log("Pricing Details =", pricingDetails, price);
        return price;
    };
};

module.exports = PricingService;