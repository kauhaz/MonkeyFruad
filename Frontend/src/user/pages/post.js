import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
import Axios from "axios";
import "./post.css";
import { Link, useHistory } from "react-router-dom";
import Chatbot from "../components/chatbot";
import Commentitem from "../components/commentitem";
import * as moment from "moment";
import "moment/locale/th";
import {
  Form,
  Col,
  FormControl,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore,
} from "../Frontfirebase";
import { object } from "yup/lib/locale";
import usercontext from "../context/usercontext";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
const { v4: uuidv4, NIL } = require("uuid");

const Post = () => {
  const [show, Setshow] = useState();

  const [Show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { user, setUser } = useContext(usercontext);
  const [filteritem, Setfilteritem] = useState();
  const [facebook, Setfacebook] = useState();
  const [line, Setline] = useState();
  const [instagram, Setinstagram] = useState();
  const [twitter, Settwitter] = useState();
  const [other, Setother] = useState();
  const [result, Setresult] = useState();
  const [checkfacebook, Setcheckfacebook] = useState(false);
  const [checkline, Setcheckline] = useState(false);
  const [checkinstagram, Setcheckinstagram] = useState(false);
  const [checktwitter, Setchecktwitter] = useState(false);
  const [checkother, Setcheckother] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  let history = useHistory();

  //  const handleclick = async() => {
  //     Setcheck(!check)
  //   }

  const ok = async () => {
    const getpost = await Axios.get(`http://localhost:7000/post/post`);
    Setshow(getpost.data.item);
    const getdata = getpost.data.item;

    var item = [];
    getdata.filter((doc) => {
      if (facebook && doc.social === "Facebook") {
        if (checkfacebook) {
          item.push(doc);
          Setshow();
        }
      }

      if (line && doc.social === "Line") {
        if (checkline) {
          item.push(doc);
          Setshow();
        }
      }
      if (instagram && doc.social === "Instagram") {
        if (checkinstagram) {
          item.push(doc);
          Setshow();
        }
      }
      if (twitter && doc.social === "Twitter") {
        if (checktwitter) {
          item.push(doc);
          Setshow();
        }
      }
      if (other && doc.social === "other") {
        if (checkother) {
          item.push(doc);
          Setshow();
        }
      }
    });

    Setresult(item);
  };
  useEffect(() => {
    ok();
  }, [checkfacebook, checkinstagram, checkline, checktwitter, checkother]);

  console.log(result);

  return (
    <div>
      <NavbarPage />
      <div className="container-bigpost1">
        <div className="row postbigrow">
          <div className="column-post-left1">
            <Link to={`/linkruleshow/`}>
              <div className="container-post1">
                <div className="row postrow">
                  <div className="column1-postrow1">
                    <div className="post-img">
                      <img className="monkey" src="/img/logo v3.png" />
                    </div>
                  </div>
                  <div className="column2-postrow2">
                    <div className="post-linkpost1">
                      แจ้งข้อมูลคนโกงได้ที่นี่เลย
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <h1 className="h1-posts">
              {" "}
              มีโพสต์ทั้งหมด {show ? show.length : result && result.length}{" "}
              โพสต์
            </h1>

            {show ? (
              show.map((res) => {
                return (
                  <div>
                    <div className="container-post2">
                      <div className="cotainer-post3">
                        <div className="post-profile-img">
                          {res.photoURL ? (
                            <img
                              className="img-circle"
                              src={`${res.photoURL.url}`}
                            />
                          ) : (
                            <img
                              className="img-circle"
                              src={"/img/profile.png"}
                            />
                          )}
                          <div className="post-name">
                            {res.username ? "@" : null}
                            {res.username}
                          </div>
                          <br />
                          <div className="post-date">
                            <span className="post-time">
                              {moment(new Date(res.date.seconds * 1000)).format(
                                "lll"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="postbuttonreport" onClick={handleShow}>
                          <a className="postbuttonreported" href="/post/edit">
                            <i class="fa fa-flag"></i>
                          </a>
                        </div>
                        <Modal show={Show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Woohoo, you're reading this text in a modal!
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
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
                                  <span className="spanpost">
                                    {res.accountnumber}
                                  </span>
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
                                  <span className="spanpost">
                                    {res.nameproduct}{" "}
                                  </span>
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
                                  <span className="spanpost">
                                    {res.money} บาท
                                  </span>
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="post-left col-lg-6 col-12"
                                  controlId="formGridDate"
                                >
                                  <Form.Label>วันที่โดนโกง</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                  <span className="spanpost">
                                    {moment(
                                      new Date(res.datetimes.seconds * 1000)
                                    ).format("lll")}{" "}
                                  </span>
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="post-left col-lg-6 col-12"
                                  controlId="formGridDate"
                                >
                                  <Form.Label>
                                    จำนวนครั้งที่ {res.name} {res.surname}{" "}
                                    ถูกแจ้ง{" "}
                                  </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                  <span className="spanpost">
                                    {res.count} ครั้ง
                                  </span>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="post-left col-lg-6 col-12"
                                  controlId="formGridPrice"
                                >
                                  <Form.Label>
                                    {" "}
                                    ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                  </Form.Label>
                                </Form.Group>

                                <Form.Group>
                                  <span className="spanpost">
                                    {res.summoney} บาท
                                  </span>
                                </Form.Group>
                              </Form.Row>
                            </Form>
                            <div className="postother">
                              <Link
                                className="postother1"
                                onClick={() => (
                                  history.push(`/mypost/${res.uid}`),
                                  window.location.reload(true)
                                )}
                              >
                                ดูเพิ่มเติม
                              </Link>
                            </div>
                          </div>

                          <div className="line-post1"></div>
                          <div className="container-post6">
                            <Commentitem postid={res.uid} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                {" "}
                {result
                  ? result.map((res) => {
                      return (
                        <div>
                          <div className="container-post2">
                            <div className="cotainer-post3">
                              <div className="post-profile-img">
                                {res.photoURL ? (
                                  <img
                                    className="img-circle"
                                    src={`${res.photoURL.url}`}
                                  />
                                ) : (
                                  <img
                                    className="img-circle"
                                    src={"/img/profile.png"}
                                  />
                                )}
                                <div className="post-name">
                                  {res.username ? "@" : null}
                                  {res.username}
                                </div>
                                <br />
                                <div className="post-date">
                                  <span className="post-time">
                                    {moment(
                                      new Date(res.date.seconds * 1000)
                                    ).format("lll")}
                                  </span>
                                </div>
                              </div>

                              <div className="postbuttonreport">
                                <a
                                  className="postbuttonreported"
                                  href="/post/edit"
                                >
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
                                        <Form.Label>
                                          ชื่อ - นามสกุลผู้โกง
                                        </Form.Label>
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
                                        <Form.Label>
                                          เลขที่บัญชี (ผู้โกง)
                                        </Form.Label>
                                      </Form.Group>

                                      <Form.Group>
                                        <span className="spanpost">
                                          {res.accountnumber}
                                        </span>
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
                                        <span className="spanpost">
                                          {res.nameproduct}{" "}
                                        </span>
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
                                        <span className="spanpost">
                                          {res.money} บาท
                                        </span>
                                      </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                      <Form.Group
                                        as={Col}
                                        className="post-left col-lg-6 col-12"
                                        controlId="formGridDate"
                                      >
                                        <Form.Label>วันที่โดนโกง</Form.Label>
                                      </Form.Group>

                                      <Form.Group>
                                        <span className="spanpost">
                                          {moment(
                                            new Date(
                                              res.datetimes.seconds * 1000
                                            )
                                          ).format("lll")}{" "}
                                        </span>
                                      </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                      <Form.Group
                                        as={Col}
                                        className="post-left col-lg-6 col-12"
                                        controlId="formGridDate"
                                      >
                                        <Form.Label>
                                          จำนวนครั้งที่ {res.name} {res.surname}{" "}
                                          ถูกแจ้ง{" "}
                                        </Form.Label>
                                      </Form.Group>
                                      <Form.Group>
                                        <span className="spanpost">
                                          {res.count} ครั้ง
                                        </span>
                                      </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                      <Form.Group
                                        as={Col}
                                        className="post-left col-lg-6 col-12"
                                        controlId="formGridPrice"
                                      >
                                        <Form.Label>
                                          {" "}
                                          ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                        </Form.Label>
                                      </Form.Group>

                                      <Form.Group>
                                        <span className="spanpost">
                                          {res.summoney} บาท
                                        </span>
                                      </Form.Group>
                                    </Form.Row>
                                  </Form>
                                  <div className="postother">
                                    <Link
                                      className="postother1"
                                      onClick={() => (
                                        history.push(`/mypost/${res.uid}`),
                                        window.location.reload(true)
                                      )}
                                    >
                                      ดูเพิ่มเติม
                                    </Link>
                                  </div>
                                </div>

                                <div className="line-post1"></div>
                                <div className="container-post6">
                                  <Commentitem postid={res.uid} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            )}
          </div>

          <div className="column-post-right1">
            <a href="https://www.facebook.com/MonkeyFruad-105444291586616">
              <div className="container-postright1">
                <div className="post-linkpost2">
                  ติดต่อเพจน้องพะโล้ <br />
                  เพื่ออัพเดทข่าวสารและพูดคุยกันได้ที่นี่
                </div>
                <div className="post-img1">
                  <img className="facebook" src="/img/facebook.jpg" />
                </div>
              </div>
            </a>
            <div className="biggroup">
              <div className="container-postright2">
                <div className="post-group1">
                  เรียงตาม :
                  <select
                    as="select"
                    name="post-groupsorting1"
                    className="post-groupsorting1"
                  >
                    <option>ใหม่ล่าสุด</option>
                    <option>จำนวนเงินมากที่สุด</option>
                  </select>
                </div>
                <div className="line-postgroup1"></div>
                <div className="post-group2">
                  <div className="post-namegroup1">ช่องทางที่โดนโกง</div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline1"
                      onChange={(e) => Setfacebook(e.target.value)}
                      onClick={() => Setcheckfacebook(!checkfacebook)}
                      value="Facebook"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline1"
                    >
                      Facebook
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline2"
                      onChange={(e) => Setline(e.target.value)}
                      onClick={() => Setcheckline(!checkline)}
                      value="Line"
                    />
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline2"
                    >
                      Line
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline3"
                      onChange={(e) => Setinstagram(e.target.value)}
                      onClick={() => Setcheckinstagram(!checkinstagram)}
                      value="Instagram"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline3"
                    >
                      Instagram
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline4"
                      onChange={(e) => Settwitter(e.target.value)}
                      onClick={() => Setchecktwitter(!checktwitter)}
                      value="Twitter"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline4"
                    >
                      Twitter
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline5"
                      onChange={(e) => Setother(e.target.value)}
                      onClick={() => Setcheckother(!checkother)}
                      value="other"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline5"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </div>
                <div className="line-postgroup2"></div>
                <div className="post-group3">
                  <div className="post-namegroup2">หมวดหมู่</div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline1-2"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline1-2"
                    >
                      เสื้อผ้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline2-2"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline2-2"
                    >
                      เครื่องประดับ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline3-2"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline3-2"
                    >
                      รองเท้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline4-2"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline4-2"
                    >
                      กระเป๋า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline5-2"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline5-2"
                    >
                      มือถือและอุปกรณ์เสริม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline6"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline6"
                    >
                      อาหารและเครื่องดื่ม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline7"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline7"
                    >
                      อาหารเสริมและผลิตภัณฑ์สุขภาพ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline8"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline8"
                    >
                      เครื่องสำอางค์และอุปกรณ์เสริมความงาม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline9"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline9"
                    >
                      คอมพิวเตอร์แล็ปท็อป
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline10"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline10"
                    >
                      กล้องและอุปกรณ์ถ่ายภาพ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline11"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline11"
                    >
                      กีฬาและกิจกรรมกลางแจ้ง
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline12"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline12"
                    >
                      สื่อบันเทิงภายในบ้าน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline13"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline13"
                    >
                      เกมส์และฮ๊อบบี้
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline14"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline14"
                    >
                      ยานยนต์
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline15"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline15"
                    >
                      ตั๋วและบัตรกำนัน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline16"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline16"
                    >
                      เครื่องใช้ไฟฟ้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline17"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline17"
                    >
                      เฟอร์นิเจอร์และของตกแต่งบ้าน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline18"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline18"
                    >
                      สัตว์เลี้ยง
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline19"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline19"
                    >
                      เครื่องเขียน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline20"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline20"
                    >
                      หนังสือ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline21"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline21"
                    >
                      เครื่องดนตรี
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline22"
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline22"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </div>
                <div className="line-postgroup3"></div>
                <div className="post-group4">
                  <div className="post-namegroup3">จำนวนเงิน</div>
                  <div className="row post-numbergroup1">
                    <input
                      type="number"
                      id="nameproduct"
                      pattern="[0-9]{1,}"
                      className="postnumber1"
                    ></input>
                    <div className="post-numbergroup2">-</div>
                    <input
                      type="number"
                      id="nameproduct"
                      pattern="[0-9]{1,}"
                      className="postnumber2"
                    ></input>
                    <div className="postbuttonnumber">
                      <button className="postbuttonnumbers">
                        <i className="fa fa-long-arrow-alt-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Post;
