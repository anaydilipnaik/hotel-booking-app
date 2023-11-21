const express = require('express');
const SSecurity  = require('../services/SimpleSecurity');
const router = express.Router();
const RoomService = require("./../services/room_service");
const room_service = new RoomService();

router.get("/:room_id?", async(request, response) => {
    const { params } = request;
    const { room_id } = params;
    try {
        const { status, ...data } = await room_service.getRooms(room_id);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::GET /rooms:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

/**
 * ADMIN routes
 */
router.use("/", SSecurity.authenticate_admin);

router.post("/", async(request, response) => {
    const { params, body } = request;
    const { hotel_id } = params;
    try {
        const { status, ...data } = await room_service.createRoom(body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::POST /rooms:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.put("/:roomId", async(request, response) => {
    const { params, body } = request;
    const { roomId } = params;
    try {
        const { status, ...data } = await room_service.update(roomId, body);
        return response.status(status).send({...data});
    } catch(err) {
        console.error(`HotelRoutes::PUT /rooms/${roomId}:: Internal server error \n${err}`);
        return response.status(500).send({msg: "Internal  Server Error"});
    }
});

router.delete("/:roomId", async(request, response) => {
    return response.status(501);
})


module.exports = router;