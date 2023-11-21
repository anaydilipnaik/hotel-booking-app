import React,{ useState } from 'react'

import { useHistory } from "react-router-dom";
import "./AdminLogin.css"

import {MdEmail} from "react-icons/md"
import {RiLockPasswordFill} from "react-icons/ri" 
import { useStateValue } from './StateProvider'
import { authenticate } from './controllers/auth';
import { sign_in } from './admin_security';

function Login() {

    const [{}, dispatch] = useStateValue();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

  
    var history = useHistory();

    async function admin_login_in(name, pwd){
        try {
            const logged_in = await authenticate(email, pwd);
            if (logged_in) {
                const creds = { name, pwd };
                sign_in(creds);
                window.location.href = "/rooms";
            } else {
                throw "Invalid creds";
            }
        } catch(ex) {
            console.log("AdminLogin::Exception", ex);
            window.location.reload();
        }
    }

    return (
        <div className="loginContainer" style={{backgroundColor:"#F9DC5C"}} >
        <div className="login" >

                    <h2 style={{textAlign:"center",}}>Admin Login</h2>
                    
                    <div className="group">
                        <label for="user" className="label" style={{paddingLeft:"0px"}}><MdEmail /> E-mail</label>
                        <input id="user" type="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="group">
                        <label for="pass" className="label" style={{paddingLeft:"0px"}}><RiLockPasswordFill />Password</label>
                        <input id="pass" type="password"   onChange={(e)=>{setPassword(e.target.value)}} data-type="password" />
                    </div>
                    
                    <div className="group">
                        <button 
                        className="" 
                        style={{padding:"10px 20px",outline:"none",border:"none",backgroundColor:"orange",color:"white",cursor:"pointer",fontWeight:"600"}} 
                        value="Sign In" 
                        onClick={() => admin_login_in(email, password)}>
                            Sign In
                        </button>
                    </div>
           
                </div>
               <br></br>
                </div>
           

    )
}

export default Login
