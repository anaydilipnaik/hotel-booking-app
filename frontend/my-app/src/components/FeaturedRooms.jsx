import React, { Component } from 'react'
import Room from './Room';
import Title from './Title'; 

export default class FeaturedRooms  extends Component {
    render() {
        return (
            <section className="featured-rooms container">
                <Title  title="Featured Rooms" />
                <div className="row">
                    {this.props.rooms && this.props.rooms.map(room => (
                        <Room key={room.id} room={room}/>
                    ))}
                </div>
            </section>
        )
    }
}
