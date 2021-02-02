import axios from "axios";
import React, { useEffect, useState } from "react";
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
const Post = () => {
  const [data, Setdata] = useState();
  const [show, Setshow] = useState();
  const history = useHistory();

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [Democomments, setDemocomments] = useState([
    { commment: "ไอนี้อีกแล้วหรอ น่าโดนจริงๆ อย่าให้เจอตัวบอกก่อน" },
    {
      commment: "โดนโกงไป5000 เจ็บใจจริงๆ TT ถ้าเจอจะซัดหน้าให้หมอบไปเลย55555",
    },
  ]);

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
      <NavbarPage />
      {/* <h1 className="h1-post">โพสต์ทั้งหมด</h1> */}
      <div className="container-post1">
        <div className="row postrow">
          <div className="column1-postrow1">
            <div className="post-img">
              <img className="monkey" src="/img/logo v3.png" />
            </div>
          </div>
          <div className="column2-postrow2">
            <div className="post-linkformpost1">
              แจ้งข้อมูลคนโกงได้ที่นี่เลย
            </div>
            <br />
            <div className="post-linkformpost2">
              <Link to={`/linkruleshow/`}>
                <button className="buttonpost" type="submit">
                  คลิก
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-post2">
          <div className="cotainer-post3">
            <div className="post-profile-img">
              {/* {ok.file ? <img className="img-circle" src={`/uploads/${ok.file[0].filename}`}  /> : <img className="img-circle" src="/img/profile.png" /> } */}
              <img className="img-circle" src="/img/profile.png" />
              <div className="post-name">
                @Nuitychibiko
              </div>
              <br />
              <div className="post-date">
                <span className="post-time">01/26/2021, 8:02:10 pm</span>
              </div>
            </div>

            <div className="postbuttonreport">
              <a className="postbuttonreported" href="/post/edit">
                <i class="fa fa-flag"></i>
              </a>
            </div>

            <div className="container-post4">
              <div className="container-post5">
                <Form className="formsize-post">
                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="้post-left col-lg-6 col-12"
                      controlId="formGridName"
                    >
                      <Form.Label>ชื่อ - นามสกุลผู้โกง</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">
                        {ok.name} {ok.surname}
                      </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridId"
                    >
                      <Form.Label>เลขที่บัญชี (ผู้โกง)</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{ok.accountnumber}</span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridNameproduct"
                    >
                      <Form.Label>ชื่อสินค้า</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{ok.nameproduct} </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridPrice"
                    >
                      <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{ok.money} </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridDate"
                    >
                      <Form.Label>วันที่โพสต์</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{ok.date} </span>
                    </Form.Group>
                  </Form.Row>
                </Form>
                <div className="postother">
                  <Link className="postother1" to={`/mypost/${ok.uid}`}>
                    ดูเพิ่มเติม
                  </Link>
                </div>
              </div>
              <div className="line-post1"></div>
              <div className="container-post6">
                {Democomments ? (
                  Democomments.map((value, index) => {
                    return <Commentitem data={value} ok={ok} key={index} />;
                  })
                ) : (
                  <div></div>
                )}

                {/* <div className="line-comment2"></div> */}
              </div>
              <h2 className="postother2">ดูอีก 3 ความคิดเห็น</h2>
              <div className="row post-comment-comments1">
                <div className="post-profilecomment-img1">
                  {/* {ok.file ? <img className="img-circle" src={`/uploads/${ok.file[0].filename}`}  /> : <img className="img-circle" src="/img/profile.png" /> } */}
                  <img className="img-circle" src="/img/profile.png" />
                </div>
                <div className="row post-comment-commentsall">
                  <div
                    className="post-writecommemt col-lg-6 col-10"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <input
                      className="postinputcomment"
                      placeholder="เขียนความคิดเห็น..."
                    />
                  </div>

                  <div>
                    <div className="postbuttonsend">
                      <a className="postbuttonsends" href="">
                        <i className="fa fa-paper-plane"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
