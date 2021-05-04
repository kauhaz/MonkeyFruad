import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Col, Button } from "react-bootstrap";
import _ from "lodash";
import Axios from "axios";
import NavbarPage from "../components/navbarAdmin";
import Commentmypost from "../components/commentmypost";
import Modalimage from "../../user/components/Modalimage";
import "../../user/pages/mypost.css";
import * as moment from "moment";
import "moment/locale/th";
import Modaldelete from "../../user/components/Modaldelete";

const Seepost = () => {
  const { v4: uuidv4 } = require("uuid");
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const [mypost, Setmypost] = useState();
  const [showDropdown, SetshowDropdown] = useState(true); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();

  const [modalcommentid, Setmodalcommentid] = useState();
  const [modalcommentmore, Setmodalcommentmore] = useState();
  const [isOpenModalDelete, SetisOpenModalDelete] = useState(false);
  const [click, Setclick] = useState();
  const [fuck, Setfuck] = useState([]);
  const [imagesFile, setImagesFile] = useState();
  const [files, Setfiles] = useState("");

  const inputTextArea = useRef(null);
  let { uid } = useParams();
  const history = useHistory();
  let uuid = uuidv4();
  const ok = async () => {
    try {
      const ok = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/post/mypost/${uid}`
      );
      Setmypost(ok.data.item);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteClick = async (e) => {
    e.preventDefault();
    await Axios.post(`https://monkeyfruad01.herokuapp.com/post/delete/${uid}`);
    history.push("/report");
  };
  const handleopenmodal = async () => {
    Setisopen(true);
  };
  const handleclosemodal = async () => {
    Setisopen(false);
  };

  const handlemodalopen = async () => {
    SetisOpenModalDelete(true);
  };
  const handlemodalclose = async () => {
    SetisOpenModalDelete(false);
  };
  const handledeletetorerender = async () => {
    Setclick(uuid);
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
                    <div className="container-mypost2">
                      <button
                        onClick={() => (
                          Setmodalcommentid(ok.uid),
                          Setmodalcommentmore(ok),
                          setIsActive(false),
                          handlemodalopen()
                        )}
                        variant="primary"
                        className="mypostbuttonreported"
                        title="ลบโพสต์"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <Modaldelete
                        text="deletemypostAdminMyPost"
                        openmodal={isOpenModalDelete}
                        handlemodalclose={handlemodalclose}
                        modalcommentid={modalcommentid}
                        modalcommentmore={modalcommentmore}
                        setIsActive={setIsActive}
                        Setfuck={Setfuck}
                        setImagesFile={setImagesFile}
                        Setfiles={Setfiles}
                        handledeletetorerender={handledeletetorerender}
                      />
                      <div className="mypost-profile-img">
                        {ok.photoURL ? (
                          <img
                            className="img-circle profile-mypost"
                            src={`${ok.photoURL.url}`}
                          />
                        ) : (
                          <img
                            className="img-circle profile-mypost"
                            src="/img/profile.png"
                          />
                        )}
                        <div className="mypost-name">
                          {ok.username ? "@" : null}
                          {ok ? ok.username : null}
                        </div>
                        <br />
                        <div className="mypost-date">
                          {moment(new Date(ok.date.seconds * 1000)).format(
                            "DD/MM/YYYY HH:mm"
                          )}{" "}
                        </div>
                      </div>

                      <div className="mypostprofile-bad-img">
                        {ok.resultfile ? (
                          <img
                            className="img-circle profile-mypost2"
                            src={`${ok.resultfile.url}`}
                          />
                        ) : (
                          <img
                            className="img-circle profile-mypost2"
                            src="/img/profile.png"
                          />
                        )}
                      </div>

                      <div className="container-myposts3">
                        <Form className="formsize-mypost">
                          <Form.Row>
                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridName"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                ชื่อ (ผู้โกง){" "}
                              </Form.Label>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridName"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.name}
                                </div>
                              </Form.Label>
                            </Form.Group>

                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridLastname"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                นามสกุล (ผู้โกง){" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridLastname"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.surname}
                                </div>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridId"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                เลขบัตรประชาชน (ผู้โกง){" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridId"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.id}
                                </div>
                              </Form.Label>
                            </Form.Group>

                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridAccountnumber"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                เลขที่บัญชี (ผู้โกง){" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-1"
                              controlId="formGridAccountnumber"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.accountnumber}
                                </div>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridNameproduct"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                ชื่อสินค้า{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridNameproduct"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.nameproduct}
                                </div>
                              </Form.Label>
                            </Form.Group>

                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridCategory"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                หมวดหมู่สินค้า{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridCategory"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.productcategory}
                                </div>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridPrice"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                จำนวนเงิน{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridPrice"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.money.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  บาท
                                </div>
                              </Form.Label>
                            </Form.Group>

                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridCategory"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                ธนาคาร{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridCategory"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.bank}
                                </div>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridDate"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                วันที่โดนโกง{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridDate"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {moment(
                                    new Date(ok.datetimes.seconds * 1000)
                                  ).format("DD/MM/YYYY HH:mm")}{" "}
                                </div>
                              </Form.Label>
                            </Form.Group>

                            <div className="col-1 none-mypost"></div>
                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-6"
                              controlId="formGridSocial"
                            >
                              <Form.Label className="text-mypost text-mypost-left">
                                ช่องทางที่โดนโกง{" "}
                              </Form.Label>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="col-lg-3 col-sm-3 col-5"
                              controlId="formGridSocial"
                            >
                              <Form.Label className="text-mypost">
                                <div className="spanmypost text-mypost-right">
                                  {ok.social}
                                </div>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>
                          <br />

                          <Form.Row>
                            <Form.Group
                              as={Col}
                              controlId="formGridSocial"
                              className="number-mypost"
                            >
                              <Form.Label className="text-mypost">
                                จำนวนครั้งที่{" "}
                                <span className="spanmypostname">
                                  {ok.name} {ok.surname}
                                </span>{" "}
                                <div className="none-mypost"></div>
                                ถูกแจ้ง{" "}
                                <span className="spanmypost">
                                  {ok.count} ครั้ง
                                </span>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              controlId="formGridSocial"
                              className="number-mypost"
                            >
                              <Form.Label className="text-mypost">
                                ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                <span className="spanmypost">
                                  {/* {ok.summoney} บาท */}
                                  {ok.summoney.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  บาท
                                </span>
                              </Form.Label>
                            </Form.Group>
                          </Form.Row>

                          <Form.Group
                            controlId="exampleForm.ControlTextarea1"
                            className="moredetail-mypost"
                          >
                            <Form.Label className="text-mypost1">
                              รายละเอียดเพิ่มเติม{" "}
                              <div className="spanmypostmore">{ok.other}</div>
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
                    <div className="container-postbottoms"></div>
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
