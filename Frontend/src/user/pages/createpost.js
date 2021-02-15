import React, { useEffect, useState } from "react";
import Formpost from "../components/formpost";
import NavbarPage from "../components/navnew";
import "./createpost.css";

const Createpost = () => {
  const [check, Setcheck] = useState(false);

  return (
    <div className="allpage">
      {check ? null : <NavbarPage />}
      {check ? null : <h1 className="h1-createpost">สร้างโพสต์</h1>}
      <Formpost check={check} Setcheck={Setcheck} />
    </div>
  );
};

export default Createpost;
