import React, { useEffect, useState } from "react";
import "./contractus.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Profile = () => {

  return (
    <div>
      <NavbarPage />
      <h1 className="h1-contractus">My Profile</h1>
      <Chatbot/>
    </div>
  );
};

export default Profile;
