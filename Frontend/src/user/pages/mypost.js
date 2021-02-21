import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Col, Button } from "react-bootstrap";
import _ from "lodash";
import Axios from "axios";
import NavbarPage from "../components/navnew";
// import Commentitem from "../components/commentitem";
import Commentitemformypost from "../components/commentitemformypost";
import "./mypost.css";
import * as moment from "moment";
import "moment/locale/th";
import usercontext from "../context/usercontext";
const Mypost = () => {
  const [selectone, setSelectone] = useState("");
  const [selecttwo, setSelecttwo] = useState("");
  const [selectthree, setSelectthree] = useState("");
  const [checkselectone, Setcheckselectone] = useState(false);
  const [checkselecttwo, Setcheckselecttwo] = useState(false);
  const [checkselectthree, Setcheckselectthree] = useState(false);
  const [description, setDescription] = useState("");
  const [reportsubmitsuccess, setReportsubmitsuccess] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const [Show, setShow] = useState(false);
  const [mypost, Setmypost] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState("");
  const [error, Seterror] = useState();
  const inputTextArea = useRef(null);
  let { user } = useContext(usercontext);
  let { uid } = useParams();
  const history = useHistory();
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const handleClose = () => {
    setShow(false)
    setSelectone("")
    setSelecttwo("")
    setSelectthree("")
    setDescription("")
    Setcheckselectone(false)
    Setcheckselecttwo(false)
    Setcheckselectthree(false)
  }
  const handleShow = () => setShow(true);
  const deleted = async (uid) => {
    await Axios.post(`http://localhost:7000/post/delete/${uid}`);
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
  const FileUpload = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    setImagesFile([]); // reset state รูป เพื่อกันในกรณีที่กดเลือกไฟล์ซ้ำแล้วรูปต่อกันจากอันเดิม
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setfiles([...files]);
    Seterror();

    //ทำการวนข้อมูลภายใน Array
    for (var i = 0; i < files.length; i++) {
      let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
      reader.readAsDataURL(files[i]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
      reader.onloadend = () => {
        // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
        setImagesFile((prevState) => [...prevState, reader.result]);
        //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
      };
    }
  };
  const handledeleteimage = async (index) => {
    try {
      imagesFile.splice(index, 1);
      setImagesFile([...imagesFile]);

      files.splice(index, 1);
      Setfiles([...files]);
    } catch (err) {
      console.log(err);
    }
  };
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      let useruid = user.uid;
      _.forEach(files, (file) => {
        formData.append("filereports", file);
      });
      formData.append("description", description);
      formData.append("selectOne", selectone);
      formData.append("selectTwo", selecttwo);
      formData.append("selectThree", selectthree);
      formData.append("userreport", useruid);
      if (!files) {
        return Seterror(
          "** กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน **"
        );
      } else if (files && files.length === 0) {
        return Seterror(
          "** กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน **"
        );
      } else {
         await Axios.post(
          `http://localhost:7000/post/report/${uid}`,
          formData
        );
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleselect = (e) => {
    if (!checkselectone) {
      setSelectone("");
    }
    if (!checkselecttwo) {
      setSelecttwo("");
    }
    if (!checkselectthree) {
      setSelectthree();
      setDescription("");
    }
  };
  useEffect(() => {
    ok();
    handleselect();
  }, [checkselectone, checkselecttwo, checkselectthree]);
  console.log("selectonevalue : ", selectone, "check:", checkselectone);
  console.log("selecttwovalue : ", selecttwo, "check:", checkselecttwo);
  console.log("selectthreevalue : ", selectthree, "check:", checkselectthree);
  console.log("description : ", description);
  console.log("fileupload : ", files);
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
                                      onChange={(e) =>
                                        setSelectone(e.target.value)
                                      }
                                      value="ข้อมูลไม่ถูกต้อง"
                                      onClick={() =>
                                        Setcheckselectone(!checkselectone)
                                      }
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
                                      value="ข้อมูลไม่เหมาะสม"
                                      onChange={(e) =>
                                        setSelecttwo(e.target.value)
                                      }
                                      onClick={() =>
                                        Setcheckselecttwo(!checkselecttwo)
                                      }
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
                                      value="อื่นๆ"
                                      onChange={(e) =>
                                        setSelectthree(e.target.value)
                                      }
                                      onClick={() =>
                                        Setcheckselectthree(!checkselectthree)
                                      }
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
                                    {checkselectthree ? (
                                      <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="4"
                                        placeholder="อธิบายรายละเอียดเพิ่มเติม"
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                      />
                                    ) : (
                                      <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="4"
                                        placeholder="อธิบายรายละเอียดเพิ่มเติม"
                                        readOnly={true}
                                        ref={inputTextArea}
                                        value={description}
                                      />
                                    )}
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
                                        onChange={FileUpload}
                                      />
                                    </label>
                                    {imagesFile
                                      ? imagesFile.map(
                                          (imagePreviewUrl, index) => {
                                            return (
                                              <div>
                                                <img
                                                  key={index}
                                                  className="imgpreview"
                                                  alt="previewImg"
                                                  src={imagePreviewUrl}
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
                                                <div className="mypost_deleteimgpost1">
                                                  <img
                                                    className="mypost_deleteimgpost2"
                                                    src="/img/delete2.png"
                                                    onClick={() =>
                                                      handledeleteimage(index)
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      : null}
                                  </div>
                                  { error ?
                                  <h1 className="h1-formpostfileerror">
                                    {error}
                                  </h1>
                                  : " "
                                  }
                                </Modal.Body>
                                <Modal.Footer>
                                  {/* <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    ยกเลิก
                                  </Button> */}
                                  {reportsubmitsuccess ? (
                                      <div>
                                        <span>การรายงานโพสต์สำเร็จ</span>
                                      </div>
                                    ) : (
                                     ""
                                    )
                                  }
                                  <Button
                                    clsssName="buttonreportsave"
                                    variant="primary"
                                    onClick={(e) => handlesubmit(e)}
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
