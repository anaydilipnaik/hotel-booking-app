import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking , FaShuttleVan,FaBeer} from 'react-icons/fa'

export default class Promo extends Component {
    state={
        services:[
            {
                icon: <></>,
                title: "[ FREE25 ]",
                info: "25% discount when you sign up!"
                
            },
            {
                icon: <></>,
                title: "[ BOGO2 ]",
                info: "Get 2 nights for price of 1!"
            },
            {
                icon: <></>,
                title: "[ FREEBRK ]",
                info: "Get a free breakfast on us!"
            },
            {
                icon: <></>,
                title: "[ SJSU20 ]",
                info: "20% discount for sjsu students!"
            },

        ]
    }
    render() {
        return (
            <div className="container-fluid services">
             <Title title="Promotions" />
                <div className="row">
                   {this.state.services.map((item, index) => {
                      return(
                        <div className="col-md-4 col-lg-3 col-12 mx-auto my-3" key={index}>
                            <div className="card shadow-lg border-0 p-4">
                                <article className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                                </article>              
                           </div>
                        </div>
                      )
                   })}
                </div>
            </div>
        )
    }
}