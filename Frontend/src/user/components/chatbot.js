import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chatbot.css";
const Chatbot = () => {
  const [state, setState] = useState(false);
  const toggleHandler = () => {
    const newData = !state;
    setState(newData);
  };
  return (
    <div className="foot">
      <div className="card-chatbot">
        <div className="card-chatbot-header text-left" onClick={toggleHandler}>
          <span className="text-card-header">Add Friend</span>
          <span>
            <i className="fas fa-minus"></i>
          </span>
        </div>
        {state ? (
          <div className="card-body-chatbot">
            <div>
              <img src="/img/paloqr.jpg" className="image-palo" />
              <a href="https://lin.ee/QlA8OaI" className="textlink-chatbot">
                คลิกเพื่อเพิ่มเพื่อนน้องพะโล้ <br/>เพื่อการค้นหาที่ไวขึ้น
              </a>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Chatbot;
