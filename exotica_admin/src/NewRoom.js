import React, { useState, useEffect } from 'react';
import { create_room } from './controllers/rooms';



function NewRoom() {
    const [name, setName] = useState("Hotel Room");
    const [basePrice, setBasePrice] = useState(0);
    const [minGuests, setMinGuests] = useState(0);
    const [roomType, setRoomType] = useState("single");
    const [weekEndSurge, setWeekEndSurge] = useState(0);
    const [festivalSurge, setFestivalSurge] = useState(0);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [guestSurge, setGuestSurgeFee] = useState("");

    const createNewRoom = (e) => {
        e.preventDefault();

        const request = {
            name,
            basePrice,
            minGuests,
            roomType,
            weekEndSurge,
            festivalSurge,
            location,
            description,
            guestSurge
        }

        console.log("Request = ", request);
        create_room(request).then((createdRoom) => {
            alert("Success");
            window.location.href = "/rooms";
        }).catch((err) => {
            alert("Failed to create a room. Please try again");
            console.log("Error  ", err);
            window.location.reload();
        })

    };

    return (
        <div className="container">
            <form id="newRoomForm" onSubmit={createNewRoom}>
                <div class="form-group">
                    <h2> Enter room details </h2>
                </div>
                <br />
                <div class="form-group">
                    <label for="nameInput">Name</label>
                    <input type="text" class="form-control" id="roomName" placeholder="Room name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="basePrice">Base Price</label>
                    <input type="text" class="form-control" id="basePrice" placeholder="Base Price" onChange={(e) => setBasePrice(e.target.value)} />
                </div>
                <div class="form-select">
                    <label for="exampleInputEmail1">Room Type</label>
                    <br />
                    <select class="form-select form-select-lg mb-3" size="1" onChange={setRoomType}>
                        <option value="single">
                            Single
                        </option>

                        <option value="double">
                            Double
                        </option>

                        <option value="suites">
                            Suites
                        </option>
                    </select>
                </div>
                <br />
                <br />

                <div class="form-group">
                    <label for="minGuests">Minimum Guests</label>
                    <input type="text" class="form-control" id="minGuests" placeholder="Minimum Guests" onChange={(e) => setMinGuests(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="guestSurge">Guest Surcharge</label>
                    <input type="text" class="form-control" id="guestSurge" placeholder="Guest Surcharge Fee" onChange={(e) => setGuestSurgeFee(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="weekEndSurge">Weekend Surge</label>
                    <input type="text" class="form-control" id="weekEndSurge" placeholder="Weekend Surge Price" onChange={(e) => setWeekEndSurge(e.target.value)} />

                </div>
                <div class="form-group">
                    <label for="festivalSurge">Festival Surge</label>
                    <input type="text" class="form-control" id="festivalSurge" placeholder="Festival Surge Price" onChange={(e) => setFestivalSurge(e.target.value)} />

                </div>
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" id="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />

                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewRoom