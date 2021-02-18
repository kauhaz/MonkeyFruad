import React, {  useState } from "react";
import Rule from "../components/rule";
import "./linkruleshow.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
const Linkruleshow = () => {
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
      <h1 className="h1-linkruleshow">ข้อกำหนดและเงื่อนไขการใช้งาน</h1>
      <Rule />
      <Chatbot />
    </div>
  );
};

export default Linkruleshow;
