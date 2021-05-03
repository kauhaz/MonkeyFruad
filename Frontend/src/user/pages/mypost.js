import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Form, Col, Button } from "react-bootstrap";
import _ from "lodash";
import ClipLoaderReport from "../components/clipLoaderReport";
import Axios from "axios";
import NavbarPage from "../components/navnew";
import Chatbot from "../components/chatbot";
import ScrollToTop from "../components/ScrollToTop";

// import Commentitem from "../components/commentitem";
import Commentitemformypost from "../components/commentitemformypost";
import "./mypost.css";
import * as moment from "moment";
import "moment/locale/th";
import usercontext from "../context/usercontext";
import Modalimage from "../components/Modalimage";
import Modaldelete from "../components/Modaldelete";

const Mypost = () => {
  const [selectone, setSelectone] = useState("");
  const [selecttwo, setSelecttwo] = useState("");
  const [selecthree, setSelecthree] = useState("");
  const [checkselectone, Setcheckselectone] = useState(false);
  const [checkselecttwo, Setcheckselecttwo] = useState(false);
  const [checkselectthree, Setcheckselectthree] = useState(false);
  const [description, setDescription] = useState("");
  const [reportsubmitsuccess, setReportsubmitsuccess] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [Show, setShow] = useState(false);
  const [Showmodalsuccessreport, setShowmodalsuccessreport] = useState(false);
  const [mypost, Setmypost] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState("");
  const [ErrorFileUploads, SetErrorFileUploads] = useState();
  const [loading, Setloading] = useState(false);
  const [ErrorNotselect, SetErrorNotselect] = useState(false);
  const inputTextArea = useRef(null);
  let { user } = useContext(usercontext);
  let { uid } = useParams();
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();
  const history = useHistory();
  const [error, Seterror] = useState();

  const [fuck, Setfuck] = useState([]);
  const { v4: uuidv4 } = require("uuid");
  let uuid = uuidv4();

  const [modalcommentid, Setmodalcommentid] = useState();
  const [modalcommentmore, Setmodalcommentmore] = useState();
  const [isOpenModalDelete, SetisOpenModalDelete] = useState(false);
  const [click, Setclick] = useState();

  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const handleClose = () => {
    setShow(false);
    setSelectone("");
    setSelecttwo("");
    setSelecthree("");
    setDescription("");
    Setcheckselectone(false);
    Setcheckselecttwo(false);
    Setcheckselectthree(false);
    setReportsubmitsuccess(false);
    SetErrorFileUploads();
    SetErrorNotselect(false);
    setImagesFile();
    Setfiles("");
    Setfuck([]);
  };
  const handleModalSuccessReportClose = () => {
    setShowmodalsuccessreport(false);
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

  const handleShow = () => setShow(true);

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
  console.log("files", files);
  const FileUpload = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    SetErrorFileUploads();
    setImagesFile([]);
    var myfuck = [];
    var files = [];
    let date = new Date();

    setTimeout(() => {
      if (myfuck) {
        myfuck.forEach((doc) => {
          files.push(doc);
        });
      }
      console.log(files);

      let filesnew = [...files, ...fuck, ...event.target.files];

      Setfiles([...files, ...fuck, ...event.target.files]);
      Setfuck((prevState) => [...prevState, ...event.target.files]);
      Seterror();

      for (var i = 0; i < filesnew.length; i++) {
        let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
        reader.readAsDataURL(filesnew[i]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
        reader.onloadend = () => {
          // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
          setImagesFile((prevState) => [...prevState, reader.result]);
          //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
        };
      }
    }, 50);
  };
  const handledeleteimage = async (index) => {
    try {
      if (imagesFile) {
        console.log("b");
        imagesFile.splice(index, 1);
        setImagesFile([...imagesFile]);
      }
      if (imagesFile && imagesFile.length === 0) {
        setImagesFile();
      }

      if (fuck) {
        console.log("c");
        fuck.splice(index, 1);
        Setfuck([...fuck]);
      }

      let date = new Date();
      var myFile = [];

      if (files) {
        console.log("d");
        files.splice(index, 1);
        Setfiles([...files]);
      }
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
      formData.append("selectThree", selecthree);
      formData.append("userreport", useruid);
      if (
        checkselectone == false &&
        checkselecttwo == false &&
        checkselectthree == false
      ) {
        SetErrorNotselect(true);
      } else if (!files) {
        SetErrorFileUploads(
          "** กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน **"
        );
      } else if (files && files.length === 0) {
        SetErrorFileUploads(
          "** กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน **"
        );
      } else {
        Setloading(true);
        Axios.post(
          `https://monkeyfruad01.herokuapp.com/post/report/${uid}`,
          formData
        )
          .then((result) => {
            setReportsubmitsuccess(true);
            Setloading(false);
            handleClose();
            setShowmodalsuccessreport(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(mypost)
  const handleselect = (e) => {
    if (!checkselectone) {
      setSelectone("");
    }
    if (!checkselecttwo) {
      setSelecttwo("");
    }
    if (!checkselectthree) {
      setSelecthree("");
      setDescription("");
    }
  };
  useEffect(() => {
    ok();
    handleselect();
  }, [checkselectone, checkselecttwo, checkselectthree, imagesFile]);
  // console.log("selectonevalue : ", selectone, "check:", checkselectone);
  // console.log("selecttwovalue : ", selecttwo, "check:", checkselecttwo);
  // console.log("selectthreevalue : ", selecthree, "check:", checkselectthree);
  // console.log("description : ", description);
  // console.log("fileupload : ", files);
  // console.log("reportsubmitsuccess : ", reportsubmitsuccess);
  // console.log("loading : ", loading);
  return (
    <div
      className="allpage"
      onClick={() => {
        Hiddendropdown();
        if (isActive == true) {
          setIsActive(false);
        }
      }}
    >
      <Modal
        show={Showmodalsuccessreport}
        onHide={handleModalSuccessReportClose}
        className="modalreport2"
      >
        <Modal.Header closeButton>
          <Modal.Title className="showsuccessreport">
            รายงานโพสต์สำเร็จ
          </Modal.Title>
        </Modal.Header>
      </Modal>
      {mypost ? (
        <div>
          {" "}
          <NavbarPage
            SetshowDropdown={SetshowDropdown}
            showDropdown={showDropdown}
          />
          {mypost
            ? mypost.map((ok) => {
                return (
                  <div>
                    <div className="container-mypost2">
                      {user && user.uid != ok.useruid ? (
                        <div className="mypostbuttonreport" title="รายงานโพสต์">
                          <button
                            variant="primary"
                            onClick={handleShow}
                            className="mypostbuttonreported"
                          >
                            <i class="fa fa-flag"></i>
                          </button>
                        </div>
                      ) : null}
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
                      {user && user.uid != ok.useruid ? (
                        <div>
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
                                  {ErrorNotselect ? (
                                    <h1 className="h1-formpostfileerror">
                                      กรุณาเลือกอย่างน้อย 1 ตัวเลือก
                                    </h1>
                                  ) : (
                                    <h1 className="h1-formpostfileerror"></h1>
                                  )}
                                  <input
                                    type="checkbox"
                                    class="custom-control-input reportcheckboxinput1"
                                    id="defaultInlinereport1"
                                    onChange={(e) => {
                                      setSelectone(e.target.value);
                                      SetErrorNotselect(false);
                                    }}
                                    value="ข้อมูลไม่ถูกต้อง"
                                    onClick={() => {
                                      Setcheckselectone(!checkselectone);
                                      setReportsubmitsuccess(false);
                                    }}
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
                                    onChange={(e) => {
                                      setSelecttwo(e.target.value);
                                      SetErrorNotselect(false);
                                    }}
                                    onClick={() => {
                                      Setcheckselecttwo(!checkselecttwo);
                                      setReportsubmitsuccess(false);
                                    }}
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
                                    onChange={(e) => {
                                      setSelecthree(e.target.value);
                                      SetErrorNotselect(false);
                                    }}
                                    onClick={() => {
                                      Setcheckselectthree(!checkselectthree);
                                      setReportsubmitsuccess(false);
                                    }}
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
                                    className="formreport form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="4"
                                    placeholder="อธิบายรายละเอียดเพิ่มเติม"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                </div>
                                <span className="spanreport">
                                  *กรุณาแนบหลักฐานประกอบเพื่อเพิ่มความน่าเชื่อถือสำหรับการรายงาน
                                </span>
                                <div className="imgcommentitemreport1">
                                  {!imagesFile ? (
                                    <div>
                                      <label>
                                        <img
                                          className="uploadprovereport"
                                          src="/img/addimage.png"
                                        />
                                        <input
                                          id="FileInput"
                                          className="uploadsreport"
                                          type="file"
                                          onChange={(e) => {
                                            FileUpload(e);
                                            setReportsubmitsuccess(false);
                                          }}
                                          multiple
                                          accept="image/png, image/jpeg , image/jpg"
                                        />
                                      </label>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                                {loading ? null : (
                                  <div className="imgcommentitempostreport1">
                                    {imagesFile
                                      ? imagesFile.map(
                                          (imagePreviewUrl, index) => {
                                            return (
                                              <div className="postdeletereport">
                                                <img
                                                  key={index}
                                                  className="imgpreviewreport"
                                                  alt="previewImg"
                                                  src={imagePreviewUrl}
                                                />
                                                <div className="deleteimgreports1">
                                                  <img
                                                    className="deleteimgreports2"
                                                    src="/img/delete2.png"
                                                    onClick={() => {
                                                      handledeleteimage(index);
                                                      setReportsubmitsuccess(
                                                        false
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                        )
                                      : null}
                                    {imagesFile ? (
                                      <div className="uploadproveeditreport">
                                        <label className="uploadproveeditreport1">
                                          <img
                                            className="uploadproveeditreport2"
                                            src="/img/last1.png"
                                          />
                                          <input
                                            id="FileInput"
                                            className="uploadsreport"
                                            type="file"
                                            onChange={(e) => {
                                              FileUpload(e);
                                              setReportsubmitsuccess(false);
                                            }}
                                            multiple
                                            accept="image/png, image/jpeg , image/jpg"
                                          />
                                        </label>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                )}
                                {ErrorFileUploads ? (
                                  <h1 className="h1-formpostfileerror">
                                    {ErrorFileUploads}
                                  </h1>
                                ) : (
                                  " "
                                )}
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
                                    <span className="spanreport2">
                                      การรายงานโพสต์สำเร็จ
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {loading ? (
                                  <ClipLoaderReport loading={loading} />
                                ) : (
                                  <Button
                                    clsssName="buttonreportsave"
                                    variant="primary"
                                    onClick={(e) => handlesubmit(e)}
                                  >
                                    บันทึก
                                  </Button>
                                )}
                              </Modal.Footer>
                            </Modal>
                          </Form.Row>
                        </div>
                      ) : null}

                      {user && user.uid == ok.useruid ? (
                        <div className="container-mypostsetiing">
                          <div className="menu-containermypostsetting">
                            <div
                              onClick={() => setIsActive(!isActive)}
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
                                    onClick={() => (
                                      Setmodalcommentid(ok.uid),
                                      Setmodalcommentmore(ok),
                                      setIsActive(false),
                                      handlemodalopen()
                                    )}
                                  >
                                    {" "}
                                    ลบโพสต์{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <Modaldelete
                              text="deletemypost"
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
                          </div>
                        </div>
                      ) : null}

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
                                  {((ok.id && ok.id) === "") ? "-" : ok.id}
                                
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
                                  ).format("MM/DD/YYYY HH:mm")}{" "}
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
                              <div className="spanmypostmore">{((ok.other && ok.other) === "") ? "-" : ok.other}</div>
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
                        <Commentitemformypost postid={ok.uid} />
                      </div>
                      {/* <button onClick={()=>handle()}></button> */}
                    </div>
                    <div className="container-mypostbottoms"></div>
                  </div>
                );
              })
            : null}{" "}
        </div>
      ) : null}
      <ScrollToTop/>
      <Chatbot />
    </div>
  );
};
export default Mypost;
