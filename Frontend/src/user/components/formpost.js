import React, { useState,useMemo } from "react";
import { Form, Col} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formpost.css";
import Axios from "axios";
import _ from "lodash";
import { auth} from "../Frontfirebase";
import Chatbot from "../components/chatbot";
import Loading from "./pacmanloading";

const Formpost = ({ check, Setcheck }) => {
  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState("/img/profile.png"); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [files, Setfiles] = useState("");
  const [photo, Setphoto] = useState("");
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
  const [other, setOther] = useState("");
  const [error, Seterror] = useState();
  const [username, setUsername] = useState("");
  const [photoprofileurl, Setphotoprofileurl] = useState();
  const [photoprofilepublic_id, Setphotoprofilepublic_id] = useState();
  const [loading, Setloading] = useState();
  // var { user , setUser} = useContext(usercontext)
  // let { user , setUser} = useContext(usercontext)

  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setphoto(files[0]);
    Seterror();
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onloadend = () => {
      setImagesProfile(reader.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
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
      reader.onloadend = () => {
        // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
        setImagesFile((prevState) => [...prevState, reader.result]);
        //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
      };
    }
  };

  var user = auth.currentUser;
  let history = useHistory();


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

  console.log(files)
  

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      let formdata = new FormData();
      let useruid = user.uid;
      _.forEach(files, (file) => {
        formdata.append("eiei", file);
      });
      formdata.append("photo", photo);
      formdata.append("name", name);
      formdata.append("surname", surname);
      formdata.append("id", id);
      formdata.append("accountnumber", accountnumber);
      formdata.append("nameproduct", nameproduct);
      formdata.append("productcategory", productcategory);
      formdata.append("money", money);
      formdata.append("bank", bank);
      formdata.append("datetime", datetime);
      formdata.append("social", social);
      formdata.append("other", other);
      formdata.append("useruid", useruid);
      formdata.append("username", username);
      formdata.append("photoprofilepublic_id", photoprofilepublic_id);
      formdata.append("photoprofileurl", photoprofileurl);
      if(!files){
        return Seterror("** กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง **")
      }
      if(files && files.length === 0){
        return Seterror("** กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง **")
      }
      
      Setloading(true);
      Setcheck(true);
      const a = await Axios.post("http://localhost:7000/post/create", formdata);
      Setloading(false);
      history.push("/post/history");
    } catch (err) {
      Setloading(false);
      Setcheck(false);
      err && Seterror(err.response.data.msg);
    }
  };
  useMemo(async () => {
    try {
      var profiledata = await Axios.post("http://localhost:7000/user/session", {
        user: user,
      });
      setUsername(profiledata.data.data.username);
      Setphotoprofileurl(profiledata.data.data.photoURL.url);
      Setphotoprofilepublic_id(profiledata.data.data.photoURL.public_id);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="container-formpost">
          <div className="container-formpost1">
            <div className="profile-badformpost-img">
              <img className="img-circle" src={imagesProfile} />
              <div className="rank-label-container">
                <span className="label label-default rank-label">
                  <div className="formpost-ImageUpload">
                    <label htmlFor="FileInput">
                      <div className="fileinput">
                        <img
                          className="uploadiconprofile"
                          src="/img/edit.png"
                        />
                      </div>
                    </label>
                    <div className="buttoninputprofile">
                      <input
                        className="uploadinputprofile"
                        id="FileInput"
                        type="file"
                        onChange={ProfileChange}
                        multiple
                        accept="image/png, image/jpeg , image/jpg"
                      />
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <Form className="formsize-formpost" onSubmit={handlesubmit}>
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="formpost-left col-lg-6 col-12"
                  controlId="formGridName"
                >
                  <Form.Label className="text-formpost">
                    ชื่อ (ผู้โกง)<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    pattern="[a-z,A-Z,ก-๛]{1,}"
                    title="กรอกตัวหนังสือเท่านั้น"
                    placeholder=""
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label className="text-formpost">
                    นามสกุล (ผู้โกง)<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="lastname"
                    pattern="[a-z,A-Z,ก-๛]{1,}"
                    title="กรอกตัวหนังสือเท่านั้น"
                    placeholder=""
                    required
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="formpost-left col-lg-6 col-12"
                  controlId="formGridId"
                >
                  <Form.Label className="text-formpost">
                    เลขบัตรประชาชน (ผู้โกง)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="numberid"
                    pattern="[0-9]{1,}"
                    minlength="13"
                    maxlength="13"
                    title="กรอกตัวเลขเท่านั้น"
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAccountnumber">
                  <Form.Label className="text-formpost">
                    เลขที่บัญชี (ผู้โกง)<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="accountnumber"
                    pattern="[0-9]{1,}"
                    minlength="2"
                    maxlength="12"
                    title="กรอกตัวเลขเท่านั้น"
                    placeholder=""
                    required
                    onChange={(event) => {
                      setAccountnumber(event.target.value);
                    }}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="formpost-left col-lg-6 col-12"
                  controlId="formGridNameproduct"
                >
                  <Form.Label className="text-formpost">
                    ชื่อสินค้า<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="nameproduct"
                    placeholder=""
                    required
                    onChange={(event) => {
                      setNameproduct(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label className="text-formpost">
                    หมวดหมู่สินค้า<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    required
                    onChange={(event) => {
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
                    <option>เครื่องสำอางค์และอุปกรณ์เสริมความงาม</option>
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
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="formpost-left col-lg-6 col-12"
                  controlId="formGridPrice"
                >
                  <Form.Label className="text-formpost">
                    จำนวนเงิน (บาท)<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="nameproduct"
                    pattern="[0-9]{1,}"
                    title="กรอกตัวเลขเท่านั้น"
                    placeholder=""
                    required
                    onChange={(event) => {
                      setMoney(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label className="text-formpost">
                    ธนาคาร<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
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
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="formpost-left col-lg-6 col-12"
                  controlId="formGridDate"
                >
                  <Form.Label className="text-formpost">
                    วันที่โดนโกง<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    placeholder=""
                    required
                    onChange={(event) => {
                      setDatetime(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSocial">
                  <Form.Label className="text-formpost">
                    ช่องทางที่โดนโกง<span className="spanformpost">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
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
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="text-formpost">
                  รายละเอียดเพิ่มเติม
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(event) => {
                    setOther(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.File.Label>
                <span className="spanformpost">
                  *กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น
                  ภาพถ่ายหน้าจอ (แชท)
                </span>
                <br></br>
                <span className="spanformpost">
                  **ต้องเป็นไฟล์ png หรือ jpeg เท่านั้น
                </span>
              </Form.File.Label>

              <br></br>

              <div className="container-img-holder-imgpreview">
                <label>
                  <img className="uploadprove" src="/img/addimage.png" />
                  <input
                    id="FileInput"
                    className="uploadsformpostuploadslip"
                    type="file"
                    onChange={FileUpload}
                    multiple
                    accept="image/png, image/jpeg , image/jpg"
                  />
                </label>

                {imagesFile ? imagesFile.map((imagePreviewUrl,index) => {
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
                      <img src="/img/delete.png"onClick={() => handledeleteimage(index)} />
                    </div>
                  );
                }):null}
              </div>

              <h1 className="h1-formpostfileerror">{error}</h1>

              <button className="buttonformpost" type="submit">
                โพสต์
              </button>
            </Form>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default Formpost;
