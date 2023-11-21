import React , {useEffect } from 'react'
import Banner from './Banner'
import "./Home.css"
import { is_signed_in } from "./admin_security";


function Home() {
    useEffect(() => {
        if (!is_signed_in()) {
            window.location.href = "/adminlogin";
        } else {
            window.location.href = "/rooms";
        }
    }, []);

    return (
        <div className="home">
            <Banner />
            <div className='home_section'>
            </div>
        </div>
    )
}

export default Home
