import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import usercontext from "../context/usercontext";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";
import "./index.css";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";

const Home = () => {
  // const [data, setData] = useState();
  // // var user = auth.currentUser;
  // let { user , setUser} = useContext(usercontext)
  // const test = () => {
  //   if (user) {
  //     console.log("all user data", user);
  //     console.log("uid user", user.uid);
  //   } else {
  //     console.log("error");
  //   }
  // };
  return (
    <div>
      <Navbar />
      {/* <h1 className="h1-index">หน้าหลัก</h1> */}
      <div className="container1-index">
        <div className="row">
          <div className="column1-index">
            <div className="left-index">
            <MDBCol md="12">
              <MDBFormInline className="md-form mr-auto mb-4">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
                  Search
                </MDBBtn>
              </MDBFormInline>
            </MDBCol>
            </div>
          </div>
          <div className="column2-index">
            <img src="/img/paloqr.jpg" className="image1-index" />
          </div>
        </div>
      </div>
      {/* <a onClick={submit}>enter</a>
      <button onClick={test}>test user data</button> */}
      <Chatbot />
    </div>
  );
};

export default Home;
