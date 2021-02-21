import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Col, Button } from "react-bootstrap";

import Axios from "axios";
import NavbarPage from "../components/navnew";
// import Commentitem from "../components/commentitem";
import Commentitemformypost from "../components/commentitemformypost";
import "./mypost.css";
import * as moment from "moment";
import "moment/locale/th";
import usercontext from "../context/usercontext";
const Mypost = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const [Show, setShow] = useState(false);
  const [mypost, Setmypost] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { user } = useContext(usercontext);

  let { uid } = useParams();
  const history = useHistory();

  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const deleted = async (uid) => {
     await Axios.post(
      `http://localhost:7000/post/delete/${uid}`
    );
    history.push("/post/history");
  };

  const ok = async () => {
    try {
      const ok = await Axios.get(`http://localhost:7000/post/mypost/${uid}`);
      Setmypost(ok.data.item);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ok();
  }, []);
  console.log(mypost);

  return (
    <div className="allpage" onClick={() => Hiddendropdown()}>
      {mypost ? (
        <div>
          {" "}
          <NavbarPage
            SetshowDropdown={SetshowDropdown}
            showDropdown={showDropdown}
          />
          <h1 className="h1-mypost">โพสต์ของฉัน</h1>
          {mypost
            ? mypost.map((ok) => {
                return (
                  <div>
                    <div className="container-mypost">
                      <div className="cotainer-mypost2">
                        <div className="mypost-profile-img">
                          {ok.photoURL ? (
                            <img
                              className="img-circle"
                              src={`${ok.photoURL.url}`}
                            />
                          ) : (
                            <img
                              className="img-circle"
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
                              "MM/DD/YYYY HH:mm"
                            )}{" "}
                            {/* <span className="mypost-time">23:38 </span> */}
                          </div>
                        </div>
                        {user && user.uid != ok.useruid ? (
                          <div>
                            <div className="mypostbuttonreport">
                              <button
                                variant="primary"
                                onClick={handleShow}
                                className="mypostbuttonreported"
                              >
                                <i class="fa fa-flag"></i>
                              </button>
                            </div>
                            <Form.Row>
                              <Modal
                                show={Show}
                                onHide={handleClose}
                                className="modalreport"
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title className="namereport">
                                    รายงานโพสต์
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="bigreport1">
                                  <div class="custom-control custom-checkbox reportcheckbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input reportcheckboxinput1"
                                      id="defaultInlinereport1"
                                    ></input>
                                    <label
                                      class="custom-control-label reportcheckboxlabel1"
                                      for="defaultInlinereport1"
                                    >
                                      ข้อมูลไม่ถูกต้อง
                                    </label>
                                  </div>
                                  <div class="custom-control custom-checkbox reportcheckbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input reportcheckboxinput1"
                                      id="defaultInlinereport2"
                                    ></input>
                                    <label
                                      class="custom-control-label reportcheckboxlabel1"
                                      for="defaultInlinereport2"
                                    >
                                      ข้อมูลไม่เหมาะสม
                                    </label>
                                  </div>
                                  <div class="custom-control custom-checkbox reportcheckbox">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input reportcheckboxinput1"
                                      id="defaultInlinereport3"
                                    ></input>
                                    <label
                                      class="custom-control-label reportcheckboxlabel1"
                                      for="defaultInlinereport3"
                                    >
                                      อื่นๆ (กรุณาระบุในช่องเพิ่มเติม)
                                    </label>
                                  </div>
                                  <div className="form-groupreport">
                                    <label htmlFor="exampleFormControlTextarea1"></label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="4"
                                      placeholder="อธิบายรายละเอียดเพิ่มเติม"
                                    />
                                  </div>
                                  <span className="spanreport">
                                    *กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน
                                  </span>
                                  <div className="container-img-holder-imgpreviewreport">
                                    <label>
                                      <img
                                        className="uploadprovereport"
                                        src="/img/addimage.png"
                                      />
                                      <input
                                        id="FileInput"
                                        className="uploadsreport"
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpeg , image/jpg"
                                      />
                                    </label>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  {/* <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    ยกเลิก
                                  </Button> */}
                                  <Button
                                    clsssName="buttonreportsave"
                                    variant="primary"
                                    onClick={handleClose}
                                  >
                                    บันทึก
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Form.Row>
                          </div>
                        ) : null}

                        {user && user.uid == ok.useruid ? (
                          <div className="container-mypostsetiing">
                            <div className="menu-containermypostsetting">
                              <div
                                onClick={onClick}
                                className="mypostbuttonsetting"
                              >
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
                          </div>
                        ) : null}

                        <div className="container-mypost3">
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
                                  <span className="spanmypost">
                                    {ok.surname}
                                  </span>
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
                                  <span className="spanmypost">
                                    {ok.social}
                                  </span>
                                </Form.Label>
                              </Form.Group>
                            </Form.Row>

                            <Form.Row>
                              <Form.Group as={Col} controlId="formGridSocial">
                                <Form.Label className="text-mypost">
                                  จำนวนครั้งที่ {ok.name} {ok.surname} ถูกแจ้ง{" "}
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
                          </Form>
                          <div className="line-comment1"></div>
                          <div className="container-mypost4">
                            <Commentitemformypost postid={ok.uid} />
                          </div>
                          {/* <button onClick={()=>handle()}></button> */}
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
export default Mypost;
