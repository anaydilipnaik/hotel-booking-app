import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {FaHotel} from "react-icons/fa"

import { fetch_bookings } from "./controllers/bookings";

function Bookings() {
   
    var [ booking_details, setBookings ]= useState([]);

    useEffect(()=>{
        async function bookings(){
            // var request = await axios.get(fetchbookings);
            const {status, data} = await fetch_bookings();
            console.info("Bookings.js::useEffect::Bookings = ", data);
            if (status === 200) {
                // setBookings(request.data);
                setBookings(data.data);
            };
        } 
        bookings();
    }, []);

    var formatDate = (date)=>{
        var d =new Date(date);
        return (d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear() )
    }
    
    return (    
        <div className="container">
            <h4 style={{"textAlign":"left","color":""}}><FaHotel />  Reservation Details</h4>
            <div className="table">
                <div className="table-header">
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Booking ID</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Room Name</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Guests</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">From</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">To</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Price</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">User</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Status</a></div>
                </div>

                <div className="table-content">
                    {
                        booking_details && booking_details.map(booking=> {
                            var { 
                                id, created_at, from_date, to_date, price, user_first_name, user_last_name,
                                room_name, room_id, status, guest_count,  
                            } = booking;
                            return (
                                <div key = {room_id} className="table-row">
                                    <div className="table-data">{id}</div>
                                    <div className="table-data">{room_name}</div>
                                    <div className="table-data">{guest_count}</div>
                                    <div className="table-data">{formatDate(from_date)}</div>
                                    <div className="table-data">{formatDate(to_date)}</div>
                                    <div className="table-data">{price}</div>
                                    <div className="table-data">{`${user_first_name} ${user_last_name}`}</div>
                                    <div className="table-data">{status}</div>
                                </div>
                            )
                        })
                    }  
                </div>  
            </div>
        </div>
    )
}

export default Bookings