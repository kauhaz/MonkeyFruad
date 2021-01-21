import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import usercontext from "../context/usercontext";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";
import "./index.css";

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
      <h1 className="h1-index">หน้าหลัก</h1>
      {/* <a onClick={submit}>enter</a>
      <button onClick={test}>test user data</button> */}
      <Chatbot />
    </div>
  );
};

export default Home;
