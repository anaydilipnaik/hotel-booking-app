import React from "react";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { getAllRooms } from "../controllers/rooms";

function RoomsContainer({ ...props }) {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    getAllRooms()
      .then((res) => setRooms(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  if (!rooms) {
    return <Loading />;
  }

  return (
    <>
      <RoomsList rooms={rooms} />
    </>
  );
}
export default RoomsContainer;
