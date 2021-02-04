import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore,
} from "../Frontfirebase";
import Axios from "axios";
import NavbarPage from "../components/navnew";
// import Commentitem from "../components/commentitem";
import Commentitemformypost from "../components/commentitemformypost";
import "./mypost.css";


import usercontext from "../context/usercontext";
const Mypost = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState("/img/profile.png")
  const [photo, Setphoto] = useState()
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [id, setId] = useState();
  const [accountnumber, setAccountnumber] = useState();
  const [nameproduct, setNameproduct] = useState();
  const [productcategory, setProductcategory] = useState();
  const [money, setMoney] = useState();
  const [bank, setBank] = useState();
  const [datetime, setDatetime] = useState();
  const [social, setSocial] = useState();
  const [other, setOther] = useState();
  const [mypost, Setmypost] = useState();
  const [data, Setdata] = useState();
  const [textcomment, Settextcomment] = useState();
  const [allcomment, Setallcomment] = useState();
  const [click, Setclick] = useState();
  let { user, setUser } = useContext(usercontext);

  let { uid } = useParams();
  const history = useHistory();



  const deleted = async (uid) => {
    const postdelete = await Axios.post(
      `http://localhost:7000/post/delete/${uid}`
    );
 
    history.push("/post/history");
    
  
};
  const ok = async () => {
    try {
  
      const ok = await Axios.get(`http://localhost:7000/post/mypost/${uid}`);
      const nameuser = await Axios.post("http://localhost:7000/user/userid", {
        result: user,
      });
  
      var profiledata = await Axios.post("http://localhost:7000/user/session", { user: user })
      Setphoto(profiledata.data.data.photoURL);
      Setmypost(ok.data.item);
      Setdata(nameuser.data.item);

 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ok();
  }, []);


  return (
    <div className="allpage">
      <NavbarPage />
      <h1 className="h1-mypost">โพสต์ของฉัน</h1>
      {mypost ? mypost.map((ok) => {
            return (
              <div>
                <div className="container-mypost">
                  <div className="cotainer-mypost2">
                    <div className="mypost-profile-img">
                      {ok.photoURL ? <img className="img-circle" src={`${ok.photoURL.url}`}  /> : <img className="img-circle" src="/img/profile.png" /> }
      
                      <div className="mypost-name">
                         {ok.username ? "@" : null}{ok ? ok.username : null}
                      </div>
                      <br />
                      <div className="mypost-date">
                        {ok.date}
                        {/* <span className="mypost-time">23:38 </span> */}
                      </div>
                    </div>

                    {user && user.uid == ok.useruid ? <div className="container-mypostsetiing">
                      <div className="menu-containermypostsetting">
                        <div onClick={onClick} className="mypostbuttonsetting">
                          <img
                            className="mypostimg-setting"
                            src="/img/setting.png"
                            alt="avatar"
                          ></img>
                        </div>
                        <div
                          className={`mypostmenusetting ${
                            isActive ? "active" : "inactive"
                          }`}
                        >
                          <ul className="ul-mypostmenusetting">
                            <li className="li-mypostmenusetting">
                              <a className="a-mypostmenusetting">
                                <Link
                                  className="a-mypostmenusetting1"
                                  to={`/post/edit/${ok.uid}`}
                                >
                                  แก้ไขโพสต์
                                </Link>
                              </a>
                            </li>
                            <li className="li-mypostmenusetting">
                              <a
                                className="a-mypostmenusetting"
                                onClick={() => deleted(ok.uid)}
                              >
                                {" "}
                                ลบโพสต์{" "}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> : null}
                   

                    <div className="container-mypost3">
                      <div className="mypostprofile-bad-img">
                        {ok.resultfile ? (
                          <img
                            className="img-circle"
                            src={`${ok.resultfile.url}`}
                          />
                        ) : (
                          <img className="img-circle" src="/img/profile.png" />
                        )}
                      </div>
                      <Form className="formsize-mypost" >
                        <Form.Row>
                          <Form.Group
                            as={Col}
                            className="mypost-left col-lg-6 col-sm-6 col-12"
                            controlId="formGridName"
                          >
                            <Form.Label className="text-mypost">
                              ชื่อ (ผู้โกง){" "}
                              <span className="spanmypost">{ok.name}</span>
                            </Form.Label>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridLastname">
                            <Form.Label className="text-mypost">
                              นามสกุล (ผู้โกง){" "}
                              <span className="spanmypost">{ok.surname}</span>
                            </Form.Label>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group
                            as={Col}
                            className="mypost-left col-lg-6 col-sm-6 col-12"
                            controlId="formGridId"
                          >
                            <Form.Label className="text-mypost">
                              เลขบัตรประชาชน (ผู้โกง){" "}
                              <span className="spanmypost">{ok.id}</span>
                            </Form.Label>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            controlId="formGridAccountnumber"
                          >
                            <Form.Label className="text-mypost">
                              เลขที่บัญชี (ผู้โกง){" "}
                              <span className="spanmypost">
                                {ok.accountnumber}
                              </span>
                            </Form.Label>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group
                            as={Col}
                            className="mypost-left col-lg-6 col-sm-6 col-12"
                            controlId="formGridNameproduct"
                          >
                            <Form.Label className="text-mypost">
                              ชื่อสินค้า{" "}
                              <span className="spanmypost">
                                {ok.nameproduct}
                              </span>
                            </Form.Label>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label className="text-mypost">
                              หมวดหมู่สินค้า{" "}
                              <span className="spanmypost">
                                {ok.productcategory}
                              </span>
                            </Form.Label>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group
                            as={Col}
                            className="mypost-left col-lg-6 col-sm-6 col-12"
                            controlId="formGridPrice"
                          >
                            <Form.Label className="text-mypost">
                              จำนวนเงิน (บาท){" "}
                              <span className="spanmypost">{ok.money}</span>
                            </Form.Label>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label className="text-mypost">
                              ธนาคาร{" "}
                              <span className="spanmypost">{ok.bank}</span>
                            </Form.Label>
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group
                            as={Col}
                            className="mypost-left col-lg-6 col-sm-6 col-12"
                            controlId="formGridDate"
                          >
                            <Form.Label className="text-mypost">
                              วันที่โดนโกง{" "}
                              <span className="spanmypost">{ok.datetime}</span>
                            </Form.Label>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridSocial">
                            <Form.Label className="text-mypost">
                              ช่องทางที่โดนโกง{" "}
                              <span className="spanmypost">{ok.social}</span>
                            </Form.Label>
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label className="text-mypost">
                            รายละเอียดเพิ่มเติม{" "}
                            <span className="spanmypost">{ok.other}</span>
                          </Form.Label>
                        </Form.Group>
                        <div className="img-holder-badslip">
                          {ok.item
                            ? ok.item.map((res) => {
                                return (
                                  <img
                                    className="img-bad"
                                    alt=""
                                    src={`${res.url}`}
                                    style={{ overflow: "hidden" }}
                                    onMouseOver={(e) =>
                                      (e.currentTarget.style = {
                                        transform: "scale(1.25)",
                                        overflow: "hidden",
                                      })
                                    }
                                    onMouseOut={(e) =>
                                      (e.currentTarget.style = {
                                        transform: "scale(1)",
                                        overflow: "hidden",
                                      })
                                    }
                                  />
                                );
                              })
                            : null}
                        </div>
                      
                      <div className="line-comment1"></div>
                      <div className="container-mypost4">
                       
                              <Commentitemformypost postid={ok.uid} />
                        

                        {/* <div className="line-comment2"></div> */}
                      </div>
                  
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Mypost;