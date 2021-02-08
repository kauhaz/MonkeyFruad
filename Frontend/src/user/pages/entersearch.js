import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
import Axios from "axios";
import { Link, useHistory ,useParams , useLocation} from "react-router-dom";
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
import "./entersearch.css";
import axios from "axios";
import Loading from "../components/loading";
const { v4: uuidv4, NIL } = require("uuid");

const Entersearch = () => {



    const [show, Setshow] = useState()
 
    let location = useLocation()
    
    console.log(location)
 
    const ok = async () => {
       
        Setshow(location.state.getdata)
    
    };

    useEffect(() => {
      ok();
    }, [location]);


  return (
    <div>
      <NavbarPage />
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
      <h1 className="h1-post"> มีโพสทั้งหมด {show ? show.length : null} โพส</h1>
      
      {show ? show.map(res =>{
         return (
         
      <div>
        <div className="container-post2">
          <div className="cotainer-post3">
            <div className="post-profile-img">
            
              {res.photoURL ? <img className="img-circle" src={`${res.photoURL.url}`} /> : <img className="img-circle" src={"/img/profile.png"} />} 
              <div className="post-name">
               {res.username ? "@" : null}{res.username}
               
              </div>
              <br />
              <div className="post-date">
                <span className="post-time">{res.date}</span>
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
                        {res.name} {res.surname}
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
                      <span className="spanpost">{res.accountnumber}</span>
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
                      <span className="spanpost">{res.nameproduct} </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridPrice"
                    >
                      <Form.Label>จำนวนเงิน</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{res.money} บาท</span>
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
                      <span className="spanpost">{res.date} </span>
                    </Form.Group>
                    
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridDate"
                    >
                      <Form.Label>จำนวนครั้งที่ {res.name} {res.surname} ถูกแจ้ง </Form.Label>
                    </Form.Group>
                  <Form.Group>
                      <span className="spanpost">{res.count} ครั้ง</span>
                    </Form.Group>
                    </Form.Row>
                        <Form.Row>
                    <Form.Group
                      as={Col}
                      className="post-left col-lg-6 col-12"
                      controlId="formGridPrice"
                    >
                      <Form.Label> ยอดเงินรวมทั้งหมดที่โกงไป  </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{res.summoney} บาท</span>
                    </Form.Group>
                  </Form.Row>
                  </Form>
                <div className="postother">
                  <Link className="postother1" to={`/mypost/${res.uid}`}>
                    ดูเพิ่มเติม
                  </Link>
                </div>
              </div>
           
            
                
           <div className="line-post1"></div>
            <div className="container-post6">
          <Commentitem postid={res.uid} />
         </div>
                

            <Chatbot />
          </div>
        </div>
      </div>
      <div className="column-post-right"></div>

    </div>

         )}) :null}
        </div>
  );
};

export default Entersearch;