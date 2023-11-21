import React ,{useState,useEffect} from 'react';
import { AiFillEdit } from "react-icons/ai"
import './Profile.css'
import './Bookings.css'
import {FaHotel} from "react-icons/fa"

import { fetch_rooms } from "./controllers/rooms";
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from '@material-ui/core';

function Rooms() {
   
    var [ room_details, setRooms ]= useState([]);
    const [open, setOpen] = React.useState(false);
    const [ selectedRoomIndex, setSelectedRoomIndex ] = React.useState(0);

    useEffect(()=>{
        async function get_rooms(){
            const {status, data} = await fetch_rooms();
            if (status === 200) {
                setRooms(data.data);
            };
        } 
        get_rooms();
    }, []);

    const handleClickOpen = (e, roomIndex) => {
        e.preventDefault();
        setSelectedRoomIndex(roomIndex)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (    
        <div className="container">
            <h4 style={{"textAlign":"center","color":""}}><FaHotel /> Room Details </h4>
            <div className="table">
                <div className="table-header">
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Room</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Name</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Type</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Base</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Festival Surge</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Week Surge</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Guest Fee</a></div>
                </div>

                <div className="table-content">
                    {
                        room_details && room_details.map((room, index)=> {
                            const {
                                id, name, room_type, base_price, festival_surge, week_end_surge, guest_fee, min_guests
                            } = room;

                            return (
                                <div key = {id} className="table-row">
                                    <div className="table-data">{id}</div>
                                    <div className="table-data">{name}</div>
                                    <div className="table-data">{room_type}</div>
                                    <div className="table-data">{base_price}</div>
                                    <div className="table-data">{festival_surge}</div>
                                    <div className="table-data">{week_end_surge}</div>
                                    <div className="table-data">{guest_fee}</div>
                                    {/* <div className="table-data">
                                        <button onClick={(e) => handleClickOpen(e, index)}>
                                            <AiFillEdit style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                                        </button>
                                    </div> */}

                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle> Edit Room </DialogTitle>
                                        <DialogContent>

                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Name"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].name}
                                            />

                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Base Price"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].base_price}
                                            />

                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Festival Surge"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].festival_surge}
                                            />

                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Weekend Surge"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].week_end_surge}
                                            />

                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Guests Count"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].min_guests}
                                            />
                                            <TextField
                                                margin="dense"
                                                id="name"
                                                label="Guests Surge"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                value = {room_details[selectedRoomIndex].guest_fee}
                                            />
                                        </DialogContent>

                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Submit</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            )
                        })
                    }  
                </div>  
            </div>

            <div className="table">
                <div className="table-header" style = {{background: "turquoise"}}>
                    <div className="header__item">
                        <Button 
                        onClick = {() => window.location.href = "/newRoom"}
                        style = {{background: "1px solid black"}}>
                            Add New Room
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rooms