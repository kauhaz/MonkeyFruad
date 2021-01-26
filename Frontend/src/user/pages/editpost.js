import React, { useEffect, useState } from "react";
import Formedit from "../components/formedit"
import "./editpost.css";
import NavbarPage from "../components/navnew";
const Editpost = () => {
  return (
    <div>
      <NavbarPage />
      <h1 className="h1-editpost">แก้ไขโพสต์</h1>
      <Formedit/>
    </div>
  );
};

export default Editpost;
