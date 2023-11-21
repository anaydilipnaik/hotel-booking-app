import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultBcg from '../images/room-3.jpeg';
import { getAllRooms, getAmenities } from '../controllers/rooms';
import { confirmBooking } from '../controllers/bookings';

export default class Booknow extends Component {
    constructor (props){
        super(props);
        this.state = {
        slug: this.props.match.params.slug,
        defaultBcg,
        startDate: new Date(),
        endDate: new Date(),
        amenities: [],
        selectedAmenities: [],
        roomDetails: null,
        totalGuests: 1,
        isBookingComplete: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onQtyChange = this.onQtyChange.bind(this);
    }
    
    componentDidMount(){
        getAllRooms().then(res=>{
            res.data.data.map(item=>{
                if(parseInt(this.state.slug) === item.id){
                    this.setState({roomDetails: item});
                }
            })
            return getAmenities();
        }).then(res => {
            this.setState({ amenities: res.data.data })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    handleChange = (event, item) => {
        event.preventDefault();
        let tempAmeneties = this.state.selectedAmenities;
        tempAmeneties.push(item);
        this.setState({ selectedAmenities: tempAmeneties });
    };

    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    }
    
    onQtyChange = (e, value) => {
        e.preventDefault();
        this.setState({
            totalGuests: value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        let data = {};
        data.userId = parseInt(sessionStorage.getItem("userId"));
        data.start = ((this.state.startDate.getMonth() > 8) ? (this.state.startDate.getMonth() + 1) : ('0' + (this.state.startDate.getMonth() + 1))) + '/' + ((this.state.startDate.getDate() > 9) ? this.state.startDate.getDate() : ('0' + this.state.startDate.getDate())) + '/' + this.state.startDate.getFullYear()
        data.end = ((this.state.endDate.getMonth() > 8) ? (this.state.endDate.getMonth() + 1) : ('0' + (this.state.endDate.getMonth() + 1))) + '/' + ((this.state.endDate.getDate() > 9) ? this.state.endDate.getDate() : ('0' + this.state.endDate.getDate())) + '/' + this.state.endDate.getFullYear()
        data.total_guests = this.state.totalGuests;
        data.ammenities = Object.keys(this.state.amenities);
        confirmBooking(this.state.roomDetails.id, data).then(res => {
            console.log(res);
            this.setState({ isBookingComplete: true });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { startDate, endDate } = this.state;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);

        if(!this.state.roomDetails) {
            return (
                <div className="container roomerror">
                    <div className="row my-5">
                        <div className="col-md-6 col-12 mx-auto">
                            <div className="card shadow-lg border-0 p-4 error">
                                <h1 className="text-center display-4">SORRY</h1>
                                <h3>No such room could be found...</h3>
                                <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const {name, room_type, base_price} = this.state.roomDetails;
        
        return (
        !this.state.isBookingComplete ?
        <div className="container my-5">
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                        <div>
                            <h1 className="display-4">Booking</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 my-auto">
                                <img src={defaultBcg} className="img-fluid" alt="selected room" />
                            </div>
                            <div className="col-md-6 col-12 ">
                                <h1>Rooms Details</h1>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Room Type</th>
                                            <td>{name} ({room_type})</td>
                                        </tr>
                                        <tr>
                                            <th>Total Guests</th>
                                            <td>
                                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                <button
                                                    class="btn"
                                                    onClick={(e) => {
                                                        this.onQtyChange(e, this.state.totalGuests - 1);
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <h3>{this.state.totalGuests}</h3>
                                                <button
                                                    class="btn"
                                                    onClick={(e) => {
                                                        this.onQtyChange(e, this.state.totalGuests + 1);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                    <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date })} />
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                    <DatePicker selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date })} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <h6 className="font-weight-bolder">Number of days : {daysLeft}</h6>
                                <mark>Please make sure check-in time is from 9 am to 12 pm</mark>
                            </div>
                            <div className="col-md-6 col-12">
                                <h6 className="font-weight-bold">Price per day : <span className="badge badge-info">${base_price}</span></h6>
                                <h6 className="font-weight-bold">Total Price to be paid : <span className="text-primary">${daysLeft * base_price}</span></h6>
                            </div>
                        </div>

                        {Object.keys(this.state.amenities).map(item => (
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" checked />
                                <label htmlFor="breakfast" className="custom-control-label">{this.state.amenities[item]}</label>
                            </div>
                        ))}
                    
                        <div className="row my-4">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="payment" className="font-weight-bolder">Payment Options</label>
                                    <select className="form-control">
                                        <option disabled>Select payment option</option>
                                        <option value="Credit">Credit Card</option>
                                        <option value="Debit">Debit Card</option>
                                        <option value="checkin">Pay during Checkin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 my-auto">
                                <div className="col-md-6 col-12 float-right">
                                    <button type="submit" className="btn btn-block btn-outline-primary" data-target="#thanks">Confirm Booking</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        : (
        <div class="container">
            <div style={{ marginTop: "250px", marginLeft: "450px", marginBottom: "450px" }}>
                <div>
                    <div>
                        <h3>Thank you </h3>
                        <p>Your room is booked successfully....</p>
                    </div>
                    <div>
                        <Link to="/" className="btn btn-dark">Back to Home</Link>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        )
    )}
}