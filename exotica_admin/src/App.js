import React,{Suspense} from 'react';
import Footer from './Footer';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import Reloader from "./Reloader"
import "./Bookings.css"
import NewRoom from './NewRoom';

const Bookings = React.lazy(()=>import('./Bookings'));
const Rooms = React.lazy(()=>import('./Rooms'));

function App() {
 // const [{admin}, dispatch] = useStateValue();

  
  return (
    <div className="app">
    <Router>
      <Suspense fallback={Reloader}>
      {
          <Switch>
            <Route path="/bookings"> <Header /> <Bookings /> <Footer /></Route>
            <Route path="/rooms"> <Header /> <Rooms /> <Footer /></Route>
            <Route path="/adminlogin"><AdminLogin /></Route>
            <Route path="/newRoom" exact><Header /><NewRoom /><Footer /></Route>    
          </Switch>
      } 
      </Suspense>
    </Router>
    </div>
  );
}

export default App;
