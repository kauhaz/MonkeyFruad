import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "./contractus.css";
import Chatbot from "../components/chatbot";
const Profile = () => {

  return (
    <div>
      <Navbar />
      <h1 className="h1-contractus">My Profile</h1>
      <Chatbot/>
    </div>
  );
};

export default Profile;
