import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context';
import Title from '../components/Title';
//to get all unique value
const getUnique = (items,value) => {
return [...new Set(items.map(item => item[value]))]
}
export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const {
    handleChange,type,capacity ,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets,swimmingpool,parking,gym,lunch,dinner
    } = context;

    //get unique type
    let types = getUnique(rooms,'type');
    //get all
    types = ['all',...types];
    
    //map to jsx
    types = types.map((item,index) => {
    return <option value={item} key={index}>{item}</option>
    });
    let people = getUnique(rooms,'capacity');
    people = people.map((item,index) => {
    return <option key={index} value={item}>{item}</option>
    })
    return (
        <div className="container mt-5">
            <Title title="Search Rooms" />
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="form-group">
                        <label htmlFor="type">Room Type</label>
                        <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                            {types}
                        </select>
                    </div>
                    <div className="form-group">
                                <label htmlFor="payment" className="font-weight-bolder">Location</label>
                                <select className="form-control">
                                    <option disabled>Select Location</option>
                                    <option value="Credit">San Jose</option>
                                    
                                   
                                </select>
                            </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Guests</label>
                        <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                            {people}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Room Price $ {price} /-</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                
            </div>
        </div>
    )
}