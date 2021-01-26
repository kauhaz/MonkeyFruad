import React, { useEffect, useState } from "react";
import "./contractus.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Contractus = () => {

  return (
    <div>
      <NavbarPage />
      <h1 className="h1-contractus">ติดต่อเรา</h1>
      <Chatbot/>
    </div>
  );
};

export default Contractus;
