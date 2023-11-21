import React from 'react'
import { FaFacebookSquare,FaLinkedin } from 'react-icons/fa';
import {IoLogoYoutube} from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';
import {Link} from 'react-router-dom';
function About() {
    return (
    <div className="container aboutus">
        <div className="row">
            <div className="col-md-6 col-12 my-auto">
                <img src={require('../images/about.svg')} alt="about us" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 my-auto">
                <h1 className="display-4 text-center my-5">About Us </h1>
                <p className="lead text-justify text-center">We are a group of 4 people who have developed this website as a part of our course curriculumn</p>
                <div className="text-center col-md-6 col-12 mx-auto">
                    <Link to="/contact" className="btn btn-outline-dark btn-block btn-lg my-5">Contact us</Link>
                </div>
            </div>
        </div>
        <div className="about_company">
            <h1 className="display-4">About Company</h1>
            <div className="pt-4">
                <p className="about_info">We divided the work between 2 teams who handeled frontend development and backend development.</p>
            </div>
        </div>
        
        <div className="team">
            <h1 className="display-4">Our Team</h1>
        </div>
        <div className="row mb-5">
            <div className="col-md-4 col-12 mx-auto my-2">
                <div className="card border-0 shadow-lg p-4">
                    <img src="https://source.unsplash.com/9UVmlIb0wJU/500x350" className="card-img-top" alt="director" />
                    <div className="card-body">
                        <h5 className="card-title mb-0">Aishwarya Paruchuri</h5>
                        <h6 className="card-title mb-0">Frontend Developer</h6>
                        <h7><FaLinkedin className="connect" /> </h7>
                        
                        
                    </div>
                </div>
            </div>
            
            <div className="col-md-4 col-12 mx-auto my-2">
                <div className="card border-0 shadow-lg p-4">
                    <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" className="card-img-top" alt="director" />
                    <div className="card-body">
                        <h5 className="card-title mb-0">Anay Naik</h5>
                        <h6 className="card-title mb-0">Backend Developer</h6>
                        <h7><FaLinkedin className="connect" /> </h7>
                        
                        
                    </div>
                </div>
            </div>
           
            
        </div>
        <div className="row mb-5">
        <div className="col-md-4 col-12 mx-auto my-2">
                <div className="card border-0 shadow-lg p-4">
                    <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" className="card-img-top" alt="director" />
                    <div className="card-body">
                        <h5 className="card-title mb-0">Achal Rajyaguru</h5>
                        <h6 className="card-title mb-0">Frontend Developer</h6>
                        <h7><FaLinkedin className="connect" /> </h7>
                        
                        
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-12 mx-auto my-2">
                <div className="card border-0 shadow-lg p-4">
                    <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" className="card-img-top" alt="director" />
                    <div className="card-body">
                        <h5 className="card-title mb-0">Supreet</h5>
                        <h6 className="card-title mb-0">Backend Developer</h6>
                        <h7><FaLinkedin className="connect" /> </h7>
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    )
}
export default About;