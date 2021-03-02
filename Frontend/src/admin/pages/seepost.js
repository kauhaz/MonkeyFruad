import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Col, Button } from "react-bootstrap";
import _ from "lodash";
import Axios from "axios";
import NavbarPage from "../../user/components/navnew";
import Commentmypost from "../components/commentmypost";
import Modalimage from "../../user/components/Modalimage";
import "../../user/pages/mypost.css";
import * as moment from "moment";
import "moment/locale/th";
const Seepost = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const [mypost, Setmypost] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState("");
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();
  const inputTextArea = useRef(null);
  let { uid } = useParams();
  const history = useHistory();
  const ok = async () => {
    try {
      const ok = await Axios.get(`http://localhost:7000/post/mypost/${uid}`);
      Setmypost(ok.data.item);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteClick = async (e) => {
    e.preventDefault();
    await Axios.post(`http://localhost:7000/post/delete/${uid}`);
    history.push("/report");
  };
  const handleopenmodal = async () => {
    Setisopen(true);
  };
  const handleclosemodal = async () => {
    Setisopen(false);
  };

  useEffect(() => {
    ok();
  }, []);
  return (
    <div className="allpage">
      {mypost ? (
        <div>
          {" "}
          <NavbarPage />
          {mypost
            ? mypost.map((ok) => {
                return (
                  <div>
                    <div className="container-post2">
                      <button
                        onClick={(e) => deleteClick(e)}
                        variant="primary"
                        className="mypostbuttonreported"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <div className="mypost-profile-img">
                        {ok.photoURL ? (
                          <img
                            className="img-circle"
                            src={`${ok.photoURL.url}`}
                          />
                        ) : (
                          <img className="img-circle" src="/img/profile.png" />
                        )}
                        <div className="mypost-name">
                          {ok.username ? "@" : null}
                          {ok ? ok.username : null}
                        </div>
                        <br />
                        <div className="mypost-date">
                          {moment(new Date(ok.date.seconds * 1000)).format(
                            "MM/DD/YYYY HH:mm"
                          )}{" "}
                          {/* <span className="mypost-time">23:38 </span> */}
                        </div>
                      </div>

                      <div className="container-mypost2">
                        <div className="mypostprofile-bad-img">
                          {ok.resultfile ? (
                            <img
                              className="img-circle"
                              src={`${ok.resultfile.url}`}
                            />
                          ) : (
                            <img
                              className="img-circle"
                              src="/img/profile.png"
                            />
                          )}
                        </div>
                        <div className="container-myposts3">
                        <Form className="formsize-mypost">
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
                                <span className="spanmypost">
                                  {moment(
                                    new Date(ok.datetimes.seconds * 1000)
                                  ).format("MM/DD/YYYY HH:mm")}{" "}
                                </span>
                              </Form.Label>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSocial">
                              <Form.Label className="text-mypost">
                                ช่องทางที่โดนโกง{" "}
                                <span className="spanmypost">{ok.social}</span>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>
                          <br />
                          <Form.Row>
                            <Form.Group as={Col} controlId="formGridSocial">
                              <Form.Label className="text-mypost">
                                จำนวนครั้งที่{" "}
                                <span className="spanmypostname">
                                  {ok.name} {ok.surname}
                                </span>{" "}
                                ถูกแจ้ง{" "}
                                <span className="spanmypost">
                                  {ok.count} ครั้ง
                                </span>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} controlId="formGridSocial">
                              <Form.Label className="text-mypost">
                                ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                <span className="spanmypost">
                                  {ok.summoney} บาท
                                </span>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="text-mypost">
                              รายละเอียดเพิ่มเติม{" "}
                              <span className="spanmypost">{ok.other}</span>
                            </Form.Label>
                          </Form.Group>
                          <div className="imgcommentitemmypost1">
                            {ok.item
                              ? ok.item.map((res) => {
                                  return (
                                    <img
                                      className="img-bad"
                                      alt=""
                                      src={`${res.url}`}
                                      style={{ overflow: "hidden" }}
                                      onClick={() => (
                                        Setimagemodal(res.url),
                                        handleopenmodal()
                                      )}
                                    />
                                  );
                                })
                              : null}
                            <Modalimage
                              isopen={isopen}
                              handleopenmodal={handleopenmodal}
                              handleclosemodal={handleclosemodal}
                              imagemodal={imagemodal}
                            />
                          </div>
                        </Form>
                      </div>
                      <div className="line-comments1"></div>
                      <div className="container-mypost4">
                        <Commentmypost postid={ok.uid} />
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}{" "}
        </div>
      ) : null}
    </div>
  );
};
export default Seepost;
