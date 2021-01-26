import React, { useEffect, useState } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Rank = () => {
  return (
    <div>
      <NavbarPage />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <Chatbot/>
    </div>
  );
};
export default Rank;
