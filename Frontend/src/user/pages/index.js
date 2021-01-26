import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
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
      <NavbarPage />
      {/* <h1 className="h1-index">หน้าหลัก</h1> */}
      <div className="container1-index">
        <div className="row">
          <div className="column1-index">
              <div className="text1-index">ค้นหาผ่านเว็บไซต์ของเราได้ที่นี่</div>
            <MDBCol>
              <MDBFormInline className="mr-auto mb-4">
                <input className="mr-sm-2 box1-index" type="text" placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี" aria-label="Search" />
                <button type="submit" className="button1-index">ค้นหา</button>
              </MDBFormInline>
            </MDBCol>
          </div>
          <div class="line-index"></div>
          <div className="column2-index">
            <div className="text1-index">ค้นหาผ่าน LINE Chatbot น้องพะโล้</div>
            <img src="/img/paloqr.jpg" className="image1-index" />
            <div><a href="https://lin.ee/QlA8OaI" className="textlink-index">คลิกเพื่อเพิ่มเพื่อนน้องพะโล้</a></div>
          </div>
        </div>
      </div>

      <div className="container2-index">
        <div className="text1-index">รายชื่อคนโกงที่ถูกแจ้งมากที่สุด</div>
        <div className="container3-index">
        <img src="/img/rank2.png" className="image3-index" />
          <div className="row">
            <div className="column3-index">
            <div className="box2-index">
            </div>
            </div>
            <div className="column3-index">
              <div className="box3-index">

              </div>
              
            </div>
            <div className="column3-index">
              <div className="box4-index">

              </div>
            </div>
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
