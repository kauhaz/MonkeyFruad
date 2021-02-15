import React, { useEffect, useState } from "react";
import "./contractus.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Contractus = () => {
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-contractus">ติดต่อเรา</h1>
      <Chatbot />
    </div>
  );
};

export default Contractus;
