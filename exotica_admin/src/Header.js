import React from 'react'
import "./Header.css"
import { HiUser } from 'react-icons/hi';
import {AiOutlineLogout, AiTwotoneAccountBook} from "react-icons/ai"

import {useHistory} from "react-router-dom"
import { useStateValue } from './StateProvider';
import { sign_out } from './admin_security';


function Header() {
    const [{admin}, dispatch] = useStateValue();
    var history = useHistory();
 
    var logout = ()=>{
        sign_out();
        history.push("/adminlogin")
    }
    
    return (
        <div className="header ">
            <div>
                <p className="Exotica">Exotica</p>
            </div>

            <div className="header_right">
                <div className="item " onClick={()=>{history.push("/rooms")}}>
                    <AiTwotoneAccountBook style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                    <span className="icon_desc" >Rooms</span>
                </div>

                <div className="item" onClick={()=>{history.push("/bookings")}}>
                    <HiUser style={{fontSize:"16px",color:"grey",marginBottom:"5px"}}/>
                    <span className="icon_desc">Bookings</span>
                </div>

                <div className="item" onClick={logout}>
                    <AiOutlineLogout style={{fontSize:"16px",color:"grey",marginBottom:"5px"}} />
                    <span className="icon_desc">Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Header
