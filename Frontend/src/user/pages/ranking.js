import React, { useEffect, useState } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
const Rank = () => {
  return (
    <div>
      <NavbarPage />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <MDBContainer className="container-ranking">
        <div className="rank-sorting">
            <select
              as="select"
              name="rank-sort"
              className="rank-sort-select"
            >
              <option selected>
                จำนวนครั้งที่โกงมากที่สุด
              </option>
              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
              <option value="กระบี่">กระบี่ </option>
              <option value="กาญจนบุรี">กาญจนบุรี </option>
            </select>
        </div>
      </MDBContainer>
      <Chatbot/>
    </div>
  );
};
export default Rank;
