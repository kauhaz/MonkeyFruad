import React, { useContext,useState } from "react";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./chatbot.css";
const Chatbot = () => {
    const [state,setState] = useState(true)
    const toggleHandler = () => {
        const newData = !state;
        setState(newData);
        console.log(state)
    } 
  return (
    <div className="foot">
        <div className="card-chatbot">
            <div className="card-chatbot-header text-left" onClick={toggleHandler}><span className="text-card-header">
                Add Friend</span><span><i class="fas fa-minus"></i></span>
            </div>
            {
                state
                ?<div className="card-body text-center">
                    <div><img src="/palo.jpg" className="image-palo"/>
                    <p className="text-palo">เพิ่มเพื่อนน้องพะโล้<br/>เพื่อการค้นหาที่ไวขึ้น</p></div>
                </div>
                :
                <div></div>
            }
        </div>
    </div>
  );
};
export default Chatbot;
