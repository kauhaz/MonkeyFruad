import React, { useEffect, useState } from "react";
import Formpost from "../components/formpost";
import NavbarPage from "../components/navnew";
import "./createpost.css";
const Editprofile = () => {
  return (
    <div className="allpage">
      <NavbarPage />
      <h1 className="h1-createpost">แก้ไขโปรไฟล</h1>
      <Formpost />
    </div>
  );
};

export default Editprofile;
