import React, { Component } from 'react'
import defaultBcg from '../images/room-3.jpeg';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import StyledHero from '../components/StyledHero';
import { getAllRooms, getAmenities } from '../controllers/rooms';
import img1 from "../images/room-1.jpeg";
import img2 from "../images/room-2.jpeg";
import img3 from "../images/room-3.jpeg";

export default class SingleRoom extends Component {
    constructor (props){
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
            roomDetails: null,
            amenities: []
        };
    }

    componentDidMount(){
        getAllRooms().then(res=>{
            res.data.data.map(item=>{
                if(parseInt(this.state.slug) === item.id){
                    this.setState({roomDetails: item});
                }
            })
            return getAmenities();
        })
        .then(res=>{
            this.setState({
                amenities: Object.values(res.data.data)
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render() {
        if(!this.state.roomDetails){
            return (<div className="container roomerror">
                    <div className="row my-5">
                        <div className="col-md-6 col-12 mx-auto">
                            <div className="card shadow-lg border-0 p-4 error">
                                <h1 className="text-center display-4">SORRY</h1>
                                <h3>No such room could be found...</h3>
                                <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                            </div> 
                        </div>
                    </div>
                </div>);
        }
        const {name, base_price, description, min_guests, pets, breakfast} = this.state.roomDetails;

        return (
            <>
                <StyledHero img={this.state.defaultBcg }>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn btn-primary">
                        Back To Rooms
                    </Link>
                </Banner>
                </StyledHero>
                <section className="single-room container">
                <div className="row">
                        <div className="col-md-4 col-12 mx-auto">
                            <div className="card border-0 shadow-lg">
                                <img src={img1} className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-4 col-12 mx-auto">
                            <div className="card border-0 shadow-lg">
                                <img src={img2} className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-4 col-12 mx-auto">
                            <div className="card border-0 shadow-lg">
                                <img src={img3} className="img-fluid" />
                            </div>
                        </div>
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>Info</h3>
                        <h6>Price : ${base_price}</h6>
                        <h6>
                            Min guests allowed : {" "}
                                {min_guests > 1 ? `${min_guests} people`: `${min_guests} person`}
                        </h6>
                        <h6>{pets? 'pets allowed': 'no pets allowed'}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
                </section>
                <section className="room-extras">
                    <h3>Amenities</h3>
                    <ul className="extras">
                        {this.state.amenities && this.state.amenities.map((item,index) => {
                            return <li key={index}>{item}</li>
                        })}
                    </ul>
                    <div className="p-4 clearfix">
                        <div className="row">
                        <div className="col-md-3 col-12 ml-auto">
                            <Link to={`/booknow/${this.state.slug}`} className="btn btn-outline-primary btn-block btn-lg float-right ">Book Now</Link>
                        </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
