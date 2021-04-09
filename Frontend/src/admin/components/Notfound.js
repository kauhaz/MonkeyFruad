import React from "react";
import { Link } from "react-router-dom";
import NavbarPage from "../components/navbarAdmin";
import "../../user/components/Notfound.css";

const Notfound = ({ search, SetshowDropdown, showDropdown }) => {
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />

      <h1 className="h1-notfound">
        คำที่คุณค้นหา <span className="spansearch">"{search}"</span>{" "}
        ไม่ตรงกับผลลัพธ์ใด ๆ
      </h1>
    </div>
  );
};

export default Notfound;
