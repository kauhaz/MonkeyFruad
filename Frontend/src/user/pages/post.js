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

  const [textcomment, Settextcomment] = useState();
<<<<<<< HEAD
  const [photo, Setphoto] = useState();
  const history = useHistory();
=======
  const [photo,  Setphoto] = useState();
  const [commentmore,  Setcommentmore] = useState();

>>>>>>> 470906487d235e71dd495de6e92432f747048bc5
  let { user, setUser } = useContext(usercontext);

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  

<<<<<<< HEAD
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
=======
  // const handlecomment = async (uid) =>{
  //   try{
      
  //     console.log(uid)
  //     let sentdata = {textcomment , username : data[0].username , userid : user.uid , photoURL : photo}
      
  //     const sentcomment = await Axios.post(`http://localhost:7000/post/comment/${uid}`, sentdata)
  //     // const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
  //     // Setallcomment(getcomment.data.item)
      
  //   }catch(err){
  //     console.log(err)
  //   }
  // }



>>>>>>> 470906487d235e71dd495de6e92432f747048bc5

  const ok = async () => {
    const getpost = await Axios.get(`http://localhost:7000/post/post`);
<<<<<<< HEAD
    Setshow(getpost.data.item);

    const nameuser = await Axios.post("http://localhost:7000/user/userid", {
      result: user,
    });
    Setdata(nameuser.data.item);

    var profiledata = await Axios.post("http://localhost:7000/user/session", {
      user: user,
    });
    Setphoto(profiledata.data.data.photoURL);
=======
    Setshow(getpost.data.item)
    
    // const nameuser = await Axios.post("http://localhost:7000/user/userid", {
    //   result: user,
    // });
    // Setdata(nameuser.data.item);

    // var profiledata = await Axios.post("http://localhost:7000/user/session", { user: user })
    // Setphoto(profiledata.data.data.photoURL);
       
>>>>>>> 470906487d235e71dd495de6e92432f747048bc5
  };
  useEffect(() => {
    ok();
  }, []);

 

  return (
    <div>
      <NavbarPage />
      <div className="row">
        <div className="column-post-left">

<<<<<<< HEAD
        </div>
        <div className="column-post-right">
=======
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
>>>>>>> 470906487d235e71dd495de6e92432f747048bc5
          
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Post;
