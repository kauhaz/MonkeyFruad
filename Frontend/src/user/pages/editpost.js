import React, { useEffect, useState } from "react";
import Formedit from "../components/formedit";
import "./editpost.css";
import NavbarPage from "../components/navnew";
const Editpost = () => {
  const [check, Setcheck] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  return (
    <div onClick={() => Hiddendropdown()}>
      {check ? null : (
        <NavbarPage
          SetshowDropdown={SetshowDropdown}
          showDropdown={showDropdown}
        />
      )}
      {check ? null : <h1 className="h1-editpost">แก้ไขโพสต์</h1>}
      <Formedit check={check} Setcheck={Setcheck} />
    </div>
  );
};

export default Editpost;
