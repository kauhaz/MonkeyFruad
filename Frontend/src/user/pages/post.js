import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
import Axios from "axios";
import "./post.css";
import { Link, useHistory } from "react-router-dom";
import Chatbot from "../components/chatbot";
import Commentitem from "../components/commentitem";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore,
} from "../Frontfirebase";
import { object } from "yup/lib/locale";
import usercontext from "../context/usercontext";
const Post = () => {
  const [data, Setdata] = useState();
  const [show, Setshow] = useState();
  const [userinfomation, Setuserinfomation] = useState();
  const [textcomment, Settextcomment] = useState();
  const [photo, Setphoto] = useState();
  const history = useHistory();
  let { user, setUser } = useContext(usercontext);

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [Democomments, setDemocomments] = useState([
    { commment: "ไอนี้อีกแล้วหรอ น่าโดนจริงๆ อย่าให้เจอตัวบอกก่อน" },
    {
      commment: "โดนโกงไป5000 เจ็บใจจริงๆ TT ถ้าเจอจะซัดหน้าให้หมอบไปเลย55555",
    },
  ]);

  const handlecomment = async (uid) => {
    try {
      console.log(uid);
      let sentdata = {
        textcomment,
        username: data[0].username,
        userid: user.uid,
      };

      const sentcomment = await Axios.post(
        `http://localhost:7000/post/comment/${uid}`,
        sentdata
      );
      // const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
      // Setallcomment(getcomment.data.item)
    } catch (err) {
      console.log(err);
    }
  };

  const ok = async () => {
    const getpost = await Axios.get(`http://localhost:7000/post/post`);
    Setshow(getpost.data.item);

    const nameuser = await Axios.post("http://localhost:7000/user/userid", {
      result: user,
    });
    Setdata(nameuser.data.item);

    var profiledata = await Axios.post("http://localhost:7000/user/session", {
      user: user,
    });
    Setphoto(profiledata.data.data.photoURL);
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
      <NavbarPage />
      <div className="row">
        <div className="column-post-left">

        </div>
        <div className="column-post-right">
          
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Post;
