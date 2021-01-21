import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Axios from "axios";
import "./post.css";
import { Link, useHistory } from "react-router-dom";
import Chatbot from "../components/chatbot";
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore,
} from "../Frontfirebase";
const Post = () => {
  const [data, Setdata] = useState();
  const [show, Setshow] = useState();
  const history = useHistory();

  const ok = async () => {
    const showdata = await firestore
      .collection("Post")
      .onSnapshot((querySnapshot) => {
        let item = [];
        querySnapshot.forEach((doc) => {
          item.push(doc.data());
          console.log(item);
        });
        Setshow(item);
      });
  };

  useEffect(() => {
    ok();
  }, []);

  const deleted = async (uid) => {
    const postdelete = await Axios.post(
      `http://localhost:7000/post/delete/${uid}`
    );
    console.log(postdelete.data);
  };

  return (
    <div>
      <Navbar />
      <h1 className="h1-post">โพสต์ทั้งหมด</h1>
      {/* {show ? show .map(ok =>{
        return (
        <div>
        {ok.name} <br></br>
        {ok.accountnumber} <br></br>
        {ok.nameproduct} <br></br>
        {ok.money} <br></br>
        {ok.datetime} <br></br>
        <Link to={`/post/edit/${ok.uid}`}> Edit </Link>
        <button onClick={() =>  deleted(ok.uid)}> x </button> 
        </div>
      )
      }) : null} */}

      <Chatbot />
    </div>
  );
};

export default Post;
