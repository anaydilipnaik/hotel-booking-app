import React, { Component } from "react";
import items from "./data";
import { getAllRooms } from "./controllers/rooms";
import room1 from "./images/details-1.jpeg";
import room2 from "./images/details-2.jpeg";
import room3 from "./images/details-3.jpeg";
import room4 from "./images/details-4.jpeg";
import img1 from "./images/room-1.jpeg";
import img2 from "./images/room-2.jpeg";
import img3 from "./images/room-3.jpeg";
import img4 from "./images/room-4.jpeg";
import img5 from "./images/room-5.jpeg";
import img6 from "./images/room-6.jpeg";
import img7 from "./images/room-7.jpeg";
import img8 from "./images/room-8.jpeg";
import img9 from "./images/room-9.jpeg";
import img10 from "./images/room-10.jpeg";
import img11 from "./images/room-11.jpeg";
import img12 from "./images/room-12.jpeg";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
    swimmingpool: false,
    gym: false,
    parking: false,
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    getAllRooms()
      .then((res) => {
        let tempRooms = [];
        res.data.data.map((item) => {
          let tempObj = {
            sys: {
              id: item.id,
            },
            fields: {
              name: item.name,
              slug: "roomId=" + item.id,
              type: item.room_type,
              price: item.base_price,
              location: "San Jose",
              size: 1000,
              capacity: item.min_guests,
              description: "Test desc",
              week_end_surge: item.week_end_surge,
              festival_surge: item.festival_surge,
              extras: [
                "Plush pillows and breathable bed linens",
                "Soft, oversized bath towels",
                "Full-sized, pH-balanced toiletries",
                "Complimentary refreshments",
                "Adequate safety/security",
                "Internet",
                "Comfortable beds",
              ],
              images: [
                {
                  fields: {
                    file: {
                      url: room1,
                    },
                  },
                },
                {
                  fields: {
                    file: {
                      url: room2,
                    },
                  },
                },
                {
                  fields: {
                    file: {
                      url: room3,
                    },
                  },
                },
                {
                  fields: {
                    file: {
                      url: room4,
                    },
                  },
                },
              ],
            },
          };
          tempRooms.push(tempObj);
          let featuredRooms = tempRooms.filter(
            (room) => room.featured === true
          );
          let maxPrice = Math.max(...tempRooms.map((item) => item.price));
          let maxSize = Math.max(...tempRooms.map((item) => item.size));
          this.setState({
            rooms: tempRooms,
            featuredRooms: featuredRooms,
            sortedRooms: tempRooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
          });
        });
      })
      .catch((err) => console.log(err));
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
      swimmingpool,
      gym,
      parking,
    } = this.state;
    // for all the rooms
    let tempRooms = [...rooms];

    //transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    //change state
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
