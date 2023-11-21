import React, {useState, useEffect} from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import { getAllRooms } from '../controllers/rooms';

export default function Home() {
    const [featuredRooms, setFeaturedRooms] = useState(null);

    useEffect(() => {
        getAllRooms().then(res => {
            setFeaturedRooms(res.data.data.slice(0, 3));
        }).catch(err => console.log(err))
    },[]);

    return (
        <>
            <Hero hero="defaultHero" />
            <Banner title="The best hotels around the world" subtitle="We have a wide range of hotel rooms you can select from">   
            <Link to="/rooms" className="btn btn-primary">
                Search 
            </Link>
            </Banner>
            <FeaturedRooms rooms={featuredRooms} />
            <Services/> 
        </>
    )
}
