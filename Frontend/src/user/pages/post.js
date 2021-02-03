
import React, { useEffect, useState ,useContext} from "react";
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
import usercontext from "../context/usercontext"
const Post = () => {
  const [data, Setdata] = useState();
  const [show, Setshow] = useState();

  const [textcomment, Settextcomment] = useState();
  const [photo,  Setphoto] = useState();
  const [commentmore,  Setcommentmore] = useState();

  let { user, setUser } = useContext(usercontext);
  

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  

  const handlecomment = async (uid) =>{
    try{
    
      console.log(uid)
      let sentdata = {textcomment , username : data[0].username , userid : user.uid , photoURL : photo}
      
      const sentcomment = await Axios.post(`http://localhost:7000/post/comment/${uid}`, sentdata)
      // const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
      // Setallcomment(getcomment.data.item)
      
    }catch(err){
      console.log(err)
    }
  }




  const ok = async () => {

    const getpost = await Axios.get(`http://localhost:7000/post/post`);
    Setshow(getpost.data.item)
    
    // const nameuser = await Axios.post("http://localhost:7000/user/userid", {
    //   result: user,
    // });
    // Setdata(nameuser.data.item);

    // var profiledata = await Axios.post("http://localhost:7000/user/session", { user: user })
    // Setphoto(profiledata.data.data.photoURL);
       
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
              {/* {ok.file ? <img className="img-circle" src={`/uploads/${ok.file[0].filename}`}  /> : <img className="img-circle" src="/img/profile.png" /> } */}
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
                      <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <span className="spanpost">{res.money} </span>
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
                  </Form>
                <div className="postother">
                  <Link className="postother1" to={`/mypost/${res.uid}`}>
                    ดูเพิ่มเติม
                  </Link>
                </div>
            
              <div className="line-post1"></div>
              <div className="container-post6">
          
                  <Commentitem   postid={res.uid}  />
              
              </div>
  
            </div>
            </div>
            
          </div>
          
        </div>
      </div>
         )
      }) : null}

      <Chatbot />
    </div>
  );
};

export default Post;
