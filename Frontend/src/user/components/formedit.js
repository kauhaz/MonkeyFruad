import React, { useEffect, useState} from "react";
import { Form, Col} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formedit.css";
import Axios from "axios";
import _ from "lodash";
import Chatbot from "../components/chatbot";
import Loading from "./pacmanloading";
// import image from "D:/PROJECT ALL/MonkeyFruad/Frontend/src/uploads/logo192.png"

const Formedit = ({ check, Setcheck }) => {
  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  const [show, Setshow] = useState();
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState(); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [files, Setfiles] = useState();
  const [photo, Setphoto] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [id, setId] = useState();
  const [accountnumber, setAccountnumber] = useState();
  const [oldaccountnumber, setOldAccountnumber] = useState();
  const [nameproduct, setNameproduct] = useState();
  const [productcategory, setProductcategory] = useState();
  const [money, setMoney] = useState();
  const [bank, setBank] = useState();
  const [datetime, setDatetime] = useState();
  const [social, setSocial] = useState();
  const [other, setOther] = useState("");
  const [error, Seterror] = useState();
  const [loading, Setloading] = useState();
  // const [files, setfiles] = useState();

  // console.log(files)
  const { uid } = useParams();
  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setphoto(files[0]);
    Seterror();
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onload = (event) => {
      setImagesProfile(event.target.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
    };
  };

  // ฟังก์ชันอัพโหลดไฟล์
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
      reader.onload = (event) => {
        // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
        setImagesFile((prevState) => [...prevState, event.target.result]);
        //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
      };
    }
  };

  let history = useHistory();

  const ok = async () => {
    const hello = await Axios.get(`http://localhost:7000/post/edit/${uid}`);

    let gethistory = hello.data.item;
    let getDatetime = hello.data.datetime;
    Setshow(gethistory);
    setName(gethistory[0].name);
    setSurname(gethistory[0].surname);
    setId(gethistory[0].id);
    setAccountnumber(gethistory[0].accountnumber);
    setOldAccountnumber(gethistory[0].accountnumber)
    setNameproduct(gethistory[0].nameproduct);
    setProductcategory(gethistory[0].productcategory);
    setMoney(gethistory[0].money);
    setBank(gethistory[0].bank);
    setDatetime(getDatetime);
    setSocial(gethistory[0].social);
    setOther(gethistory[0].other);
  };

  useEffect(() => {
    ok();
  }, []);

  const handledeleteimage = async (index) => {
    try{  

      imagesFile.splice(index,1)
      setImagesFile([...imagesFile])  

      files.splice(index,1)
      Setfiles([...files])
      
      
    }catch (err) {
      console.log(err);
    }   
  }

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      let formdata = new FormData();
      _.forEach(files, (file) => {
        formdata.append("eiei", file);
      });
      formdata.append("photo", photo);
      formdata.append("name", name);
      formdata.append("surname", surname);
      formdata.append("id", id);
      formdata.append("accountnumber", accountnumber);
      formdata.append("oldaccountnumber", oldaccountnumber);
      formdata.append("nameproduct", nameproduct);
      formdata.append("productcategory", productcategory);
      formdata.append("money", money);
      formdata.append("bank", bank);
      formdata.append("datetime", datetime);
      formdata.append("social", social);
      formdata.append("other", other);
      if(files && files.length === 0){
        return Seterror("** กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง **")
      }
      // let sentdata = {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other}
      Setloading(true);
      Setcheck(true);
      let data = await Axios.post(
        `http://localhost:7000/post/edit/${uid}`,
        formdata
      );
      Setloading(false);
      history.push(`/mypost/${uid}`);
    } catch (err) {
      Setloading(false);
      Setcheck(false);
      console.log(err)
      err && Seterror(err.response.data.msg);
    }
  };
  console.log(datetime);
  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div>
          {" "}
          {show
            ? show.map((ok) => {
                return (
                  <div>
                    <div className="container-formedit">
                      <div className="container-formedit1">
                        <div className="profile-badformedit-img">
                          {imagesProfile ? (
                            <img className="img-circle" src={imagesProfile} />
                          ) : ok.resultfile ? (
                            <img
                              className="img-circle"
                              src={`${ok.resultfile.url}`}
                            />
                          ) : (
                            <img
                              className="img-circle"
                              src={"/img/profile.png"}
                            />
                          )}
                          <div className="rank-label-container-edit">
                            <span className="label label-default rank-label">
                              <div className="formedit-ImageUpload">
                                <label htmlFor="FileInput">
                                  <div className="fileinputedit">
                                    <img
                                      className="uploadiconprofileedit"
                                      src="/img/edit.png"
                                    />
                                  </div>
                                </label>
                                <div className="buttoninputeditprofile">
                                  <input
                                    className="uploadinputeditprofile"
                                    id="FileInput"
                                    type="file"
                                    onChange={ProfileChange}
                                    accept="image/png, image/jpeg , image/jpg"
                                  />
                                </div>
                              </div>
                            </span>
                          </div>
                        </div>
                        <Form
                          className="formsize-formedit"
                          onSubmit={handlesubmit}
                        >
                          <Form.Row>
                            <Form.Group
                              as={Col}
                              className="formedit-left col-lg-6 col-12"
                              controlId="formGridName"
                            >
                              <Form.Label className="text-formedit">
                                ชื่อ (ผู้โกง)
                                <span className="spanformedit">*</span>
                              </Form.Label>

                              {show ? (
                                <Form.Control
                                  type="text"
                                  id="name"
                                  pattern="[a-z,ก-๛]{1,}"
                                  title="กรอกตัวหนังสือเท่านั้น"
                                  placeholder=""
                                  value={name}
                                  onChange={(event) => {
                                    setName(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastname">
                              <Form.Label className="text-formedit">
                                นามสกุล (ผู้โกง)
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="text"
                                  id="lastname"
                                  pattern="[a-z,ก-๛]{1,}"
                                  title="กรอกตัวหนังสือเท่านั้น"
                                  placeholder=""
                                  value={surname}
                                  onChange={(event) => {
                                    setSurname(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setSurname(event.target.value)}} required />} */}
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group
                              as={Col}
                              className="formedit-left col-lg-6 col-12"
                              controlId="formGridId"
                            >
                              <Form.Label className="text-formedit">
                                เลขบัตรประชาชน (ผู้โกง)
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="text"
                                  id="numberid"
                                  pattern="[0-9]{1,}"
                                  minlength="13"
                                  maxlength="13"
                                  title="กรอกตัวเลขเท่านั้น"
                                  placeholder=""
                                  value={id}
                                  onChange={(event) => {
                                    setId(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setId(event.target.value)}} required />} */}
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              controlId="formGridAccountnumber"
                            >
                              <Form.Label className="text-formedit">
                                เลขที่บัญชี (ผู้โกง)
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="text"
                                  id="accountnumber"
                                  pattern="[0-9]{1,}"
                                  minlength="2"
                                  maxlength="12"
                                  title="กรอกตัวเลขเท่านั้น"
                                  placeholder=""
                                  value={accountnumber}
                                  onChange={(event) => {
                                    setAccountnumber(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setAccountnumber(event.target.value)}} required />} */}
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group
                              as={Col}
                              className="formedit-left col-lg-6 col-12"
                              controlId="formGridNameproduct"
                            >
                              <Form.Label className="text-formedit">
                                ชื่อสินค้า
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="name"
                                  placeholder=""
                                  value={nameproduct}
                                  onChange={(event) => {
                                    setNameproduct(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setNameproduct(event.target.value)}} required />} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                              <Form.Label className="text-formedit">
                                หมวดหมู่สินค้า
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  as="select"
                                  required
                                  value={productcategory}
                                  onChange={(event) => {
                                    //value={show[0].productcategory}
                                    setProductcategory(event.target.value);
                                  }}
                                >
                                  <option value="" selected disabled hidden>
                                    กรุณาเลือก...
                                  </option>
                                  <option>เสื้อผ้า</option>
                                  <option>เครื่องประดับ</option>
                                  <option>รองเท้า</option>
                                  <option>กระเป๋า</option>
                                  <option>มือถือและอุปกรณ์เสริม</option>
                                  <option>อาหารและเครื่องดื่ม</option>
                                  <option>อาหารเสริมและผลิตภัณฑ์สุขภาพ</option>
                                  <option>
                                    เครื่องสำอางค์และอุปกรณ์เสริมความงาม
                                  </option>
                                  <option>คอมพิวเตอร์แล็ปท็อป</option>
                                  <option>กล้องและอุปกรณ์ถ่ายภาพ</option>
                                  <option>กีฬาและกิจกรรมกลางแจ้ง</option>
                                  <option>สื่อบันเทิงภายในบ้าน</option>
                                  <option>เกมส์และฮ๊อบบี้</option>
                                  <option>ยานยนต์</option>
                                  <option>ตั๋วและบัตรกำนัน</option>
                                  <option>เครื่องใช้ไฟฟ้า</option>
                                  <option>เฟอร์นิเจอร์และของตกแต่งบ้าน</option>
                                  <option>สัตว์เลี้ยง</option>
                                  <option>เครื่องเขียน</option>
                                  <option>หนังสือ</option>
                                  <option>เครื่องดนตรี</option>
                                  <option>อื่นๆ</option>
                                </Form.Control>
                              ) : null}
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group
                              as={Col}
                              className="formedit-left col-lg-6 col-12"
                              controlId="formGridPrice"
                            >
                              <Form.Label className="text-formedit">
                                จำนวนเงิน (บาท)
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="text"
                                  id="nameproduct"
                                  pattern="[0-9]{1,}"
                                  title="กรอกตัวเลขเท่านั้น"
                                  placeholder=""
                                  value={money}
                                  onChange={(event) => {
                                    setMoney(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setMoney(event.target.value)}} required />} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                              <Form.Label className="text-formedit">
                                ธนาคาร<span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  as="select"
                                  value={bank}
                                  required
                                  onChange={(event) => {
                                    setBank(event.target.value);
                                  }}
                                >
                                  <option value="" selected disabled hidden>
                                    กรุณาเลือก...
                                  </option>
                                  <option>กรุงเทพ</option>
                                  <option>กรุงไทย</option>
                                  <option>กรุงศรีอยุธยา</option>
                                  <option>กสิกรไทย</option>
                                  <option>เกียรตินาคิน</option>
                                  <option>ทหารไทย</option>
                                  <option>ไทยพาณิชย์</option>
                                  <option>ธนชาต</option>
                                  <option>ยูโอบี</option>
                                </Form.Control>
                              ) : null}
                            </Form.Group>
                          </Form.Row>

                          <Form.Row>
                            <Form.Group
                              as={Col}
                              className="formedit-left col-lg-6 col-12"
                              controlId="formGridDate"
                            >
                              <Form.Label className="text-formedit">
                                วันที่โดนโกง
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  type="datetime-local"
                                  placeholder=""
                                  value={datetime}
                                  onChange={(event) => {
                                    setDatetime(event.target.value);
                                  }}
                                  required
                                />
                              ) : null}
                              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setDatetime(event.target.value)}} required />} */}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSocial">
                              <Form.Label className="text-formedit">
                                ช่องทางที่โดนโกง
                                <span className="spanformedit">*</span>
                              </Form.Label>
                              {show ? (
                                <Form.Control
                                  as="select"
                                  value={social}
                                  required
                                  onChange={(event) => {
                                    setSocial(event.target.value);
                                  }}
                                >
                                  <option value="" selected disabled hidden>
                                    กรุณาเลือก...
                                  </option>
                                  <option>Facebook</option>
                                  <option>Instagram</option>
                                  <option>Twitter</option>
                                  <option>Line</option>
                                  <option value="other">อื่นๆ</option>
                                </Form.Control>
                              ) : null}
                            </Form.Group>
                          </Form.Row>

                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="text-formedit">
                              รายละเอียดเพิ่มเติม
                            </Form.Label>
                            {show ? (
                              <Form.Control
                                type="name"
                                placeholder=""
                                value={other}
                                onChange={(event) => {
                                  setOther(event.target.value);
                                }}
                              />
                            ) : null}
                          </Form.Group>

                          <Form.File.Label>
                            <span className="spanformedit">
                              * กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง
                              เช่น ภาพถ่ายหน้าจอ (แชท)
                            </span>
                            <br></br>
                            <span className="spanformpost">
                              **ต้องเป็นไฟล์ png หรือ jpeg เท่านั้น
                            </span>
                          </Form.File.Label>

                          <br></br>

                          <div className="container-img-holder-imgpreviewedit">
                            <label>
                              <img
                                className="uploadprove"
                                src="/img/addimage.png"
                              />
                              <input
                                id="FileInput"
                                className="uploadsformedituploadslip"
                                type="file"
                                onChange={FileUpload}
                                multiple
                                accept="image/png, image/jpeg , image/jpg"
                              />
                            </label>

                            {imagesFile
                              ? imagesFile.map((imagePreviewUrl,index) => {
                                  return (
                                    <div>
                                    <img
                                      key={index}
                                      className="imgpreviewedit"
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
                                    <img src="/img/delete.png"onClick={() => handledeleteimage(index)} />
                                    </div>
                                  );
                                })
                              : ok.item
                              ? ok.item.map((res) => {
                                  return (
                                    <img
                                      className="imgpreviewedit"
                                      src={`${res.url}`}
                                    />
                                  );
                                })
                              : null}
                          </div>

                          <h1 className="h1-formpostfileerror">{error}</h1>

                          <button
                            className="buttonformedit"
                            variant="success"
                            type="submit"
                          >
                            โพสต์
                          </button>
                        </Form>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default Formedit;
