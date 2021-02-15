import React, { useEffect, useState } from "react";
import Formpost from "../components/formpost";
import NavbarPage from "../components/navnew";
import "./createpost.css";

const Createpost = () => {
  const [check, Setcheck] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  return (
    <div className="allpage" onClick={() => Hiddendropdown()}>
      {check ? null : (
        <NavbarPage
          SetshowDropdown={SetshowDropdown}
          showDropdown={showDropdown}
        />
      )}
      {check ? null : <h1 className="h1-createpost">สร้างโพสต์</h1>}
      <Formpost check={check} Setcheck={Setcheck} />
    </div>
  );
};

export default Createpost;
