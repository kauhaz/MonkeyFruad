import React, { useState, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import Chatbot from "../components/chatbot";
import axios from "axios";
import NavbarPage from "../components/navnew";
import { MDBInputGroup } from "mdbreact";
import usercontext from "../context/usercontext";
const EditProfile = () => {
  var { user} = useContext(usercontext);
  let history = useHistory();
  // ที่เก็บ state
  const [imagesProfile, setImagesProfile] = useState(""); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [photo, Setphoto] = useState("");
  const [male, setMale] = useState();
  const [loading, setLoading] = useState(true);
  const [showDropdown, SetshowDropdown] = useState(true);
  // ฟังกชันการเลือกเพศใน input
  const selectSex = (e) => {
    if (e.target.value === "ชาย") {
      setSex(e.target.value);
      setMale(true);
    } else if (e.target.value === "หญิง") {
      setSex(e.target.value);
      setMale(false);
    }
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const ProfileChange = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setphoto(files[0]);
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onloadend = () => {
      setImagesProfile(reader.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
    };
  };

  const SubmitHandle = async (e) => {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("photo", photo);
      formdata.append("username", username);
      formdata.append("firstname", firstname);
      formdata.append("surname", surname);
      formdata.append("sex", sex);
      formdata.append("phone", phone);
      formdata.append("province", province);
      await axios.post(
        `http://localhost:7000/user/edit/profile/${user.uid}`,
        formdata
      );
      console.log("ok");
      history.push(`/profile/${user.uid}`);
    } catch (err) {
      console.log(err);
    }
  };
  const setSexFirst = (result) => {
    if (result.data.data.sex === "ชาย") {
      return setMale(true);
    } else if (result.data.data.sex === "หญิง") {
      return setMale(false);
    }
  };
  useMemo(async () => {
    await axios
      .post("http://localhost:7000/user/session", { user: user })
      .then((result) => {
        setUsername(result.data.data.username);
        setFirstname(result.data.data.firstname);
        setSurname(result.data.data.surname);
        setSexFirst(result);
        setSex(result.data.data.sex);
        setPhone(result.data.data.phone);
        setProvince(result.data.data.province);
        Setphoto(result.data.data.photoURL);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, [user]);
  // Style มาตรฐานของ Formik
  const styles = {
    row: {
      marginTop: "8rem",
    },
    txt1: {
      fontFamily: "Roboto",
      fontSize: "2.2rem",
      color: "#fff",
      marginBottom: "1rem",
      fontWeight: "700",
      textAlign: "center",
    },
    txt2: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      color: "#fff",
    },
  };

  return loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-signup">
        <form className="LoginForm" onSubmit={SubmitHandle}>
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">
            แก้ไขข้อมูลส่วนตัว
          </p>
          <div className="profile-badformpost-img">
            {imagesProfile ? (
              <img className="img-circle" src={imagesProfile} />
            ) : photo ? (
              <img className="img-circle" src={`${photo.url}`} />
            ) : (
              <img className="img-circle" src={"/img/profile.png"} />
            )}
            <div className="rank-label-container">
              <span className="label label-default rank-label">
                <div className="formpost-ImageUpload">
                  <label htmlFor="FileInput">
                    <div className="fileinput">
                      <img className="uploadiconprofile" src="/img/edit.png" />
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

          <div className="col-md-12">
            <div className="form-group my-0">
              <label className="label-form-title-profile pt-2">Username</label>
              <div className="form-inside-profile">
                <MDBInputGroup
                  material
                  value={username}
                  containerClassName="mt-0"
                  size="sm"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group my-0">
              <label className="label-form-title-profile pt-2">ชื่อจริง</label>
              <div className="form-inside-profile">
                <MDBInputGroup
                  material
                  containerClassName="mt-0"
                  size="sm"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group my-0">
              <label className="label-form-title-profile pt-2">นามสกุล</label>
              <div className="form-inside-profile">
                <MDBInputGroup
                  material
                  containerClassName="mt-0"
                  size="sm"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group my-0">
              <label className="label-form-title-profile">เพศ</label>
              <div className="form-inside-profile">
                {male ? (
                  <div>
                    <div className="profile-data d-inline mr-2">
                      <input
                        required
                        onChange={selectSex}
                        name="gender"
                        type="radio"
                        id="male"
                        value="ชาย"
                        className="mr-1"
                        checked="checked"
                      />
                      <label htmlFor="male">ชาย</label>
                    </div>
                    <div className="profile-data d-inline">
                      <input
                        required
                        onChange={selectSex}
                        name="gender"
                        type="radio"
                        id="female"
                        value="หญิง"
                        className="mr-1"
                      />
                      <label htmlFor="female">หญิง</label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="profile-data d-inline mr-2">
                      <input
                        required
                        onChange={selectSex}
                        name="gender"
                        type="radio"
                        id="male"
                        value="ชาย"
                        className="mr-1"
                      />
                      <label htmlFor="male">ชาย</label>
                    </div>
                    <div className="profile-data d-inline">
                      <input
                        required
                        onChange={selectSex}
                        name="gender"
                        type="radio"
                        id="female"
                        value="หญิง"
                        className="mr-1"
                        checked="checked"
                      />
                      <label htmlFor="female">หญิง</label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group my-0">
              <label className="label-form-title-profile pt-2">
                เบอร์โทรศัพท์
              </label>
              <div className="form-inside-profile">
                <MDBInputGroup
                  material
                  containerClassName="mt-0"
                  size="sm"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group mt-0 mb-5">
              <label className="label-form-title-profile pt-1">จังหวัด</label>
              <div className="form-inside-profile">
                <select
                  as="select"
                  name="province"
                  className="province-select"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                >
                  <option selected>กรุณาเลือกจังหวัด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="กระบี่">กระบี่ </option>
                  <option value="กาญจนบุรี">กาญจนบุรี </option>
                  <option value="กาฬสินธุ์">กาฬสินธุ์ </option>
                  <option value="กำแพงเพชร">กำแพงเพชร </option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="จันทบุรี">จันทบุรี</option>
                  <option value="ฉะเชิงเทรา">ฉะเชิงเทรา </option>
                  <option value="ชัยนาท">ชัยนาท </option>
                  <option value="ชัยภูมิ">ชัยภูมิ </option>
                  <option value="ชุมพร">ชุมพร </option>
                  <option value="ชลบุรี">ชลบุรี </option>
                  <option value="เชียงใหม่">เชียงใหม่ </option>
                  <option value="เชียงราย">เชียงราย </option>
                  <option value="ตรัง">ตรัง </option>
                  <option value="ตราด">ตราด </option>
                  <option value="ตาก">ตาก </option>
                  <option value="นครนายก">นครนายก </option>
                  <option value="นครปฐม">นครปฐม </option>
                  <option value="นครพนม">นครพนม </option>
                  <option value="นครราชสีมา">นครราชสีมา </option>
                  <option value="นครศรีธรรมราช">นครศรีธรรมราช </option>
                  <option value="นครสวรรค์">นครสวรรค์ </option>
                  <option value="นราธิวาส">นราธิวาส </option>
                  <option value="น่าน">น่าน </option>
                  <option value="นนทบุรี">นนทบุรี </option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                  <option value="บุรีรัมย์">บุรีรัมย์</option>
                  <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์ </option>
                  <option value="ปทุมธานี">ปทุมธานี </option>
                  <option value="ปราจีนบุรี">ปราจีนบุรี </option>
                  <option value="ปัตตานี">ปัตตานี </option>
                  <option value="พะเยา">พะเยา </option>
                  <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา </option>
                  <option value="พังงา">พังงา </option>
                  <option value="พิจิตร">พิจิตร </option>
                  <option value="พิษณุโลก">พิษณุโลก </option>
                  <option value="เพชรบุรี">เพชรบุรี </option>
                  <option value="เพชรบูรณ์">เพชรบูรณ์ </option>
                  <option value="แพร่">แพร่ </option>
                  <option value="พัทลุง">พัทลุง </option>
                  <option value="ภูเก็ต">ภูเก็ต </option>
                  <option value="มหาสารคาม">มหาสารคาม </option>
                  <option value="มุกดาหาร">มุกดาหาร </option>
                  <option value="แม่ฮ่องสอน">แม่ฮ่องสอน </option>
                  <option value="ยโสธร">ยโสธร </option>
                  <option value="ยะลา">ยะลา </option>
                  <option value="ร้อยเอ็ด">ร้อยเอ็ด </option>
                  <option value="ระนอง">ระนอง </option>
                  <option value="ระยอง">ระยอง </option>
                  <option value="ราชบุรี">ราชบุรี</option>
                  <option value="ลพบุรี">ลพบุรี </option>
                  <option value="ลำปาง">ลำปาง </option>
                  <option value="ลำพูน">ลำพูน </option>
                  <option value="เลย">เลย </option>
                  <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                  <option value="สกลนคร">สกลนคร</option>
                  <option value="สงขลา">สงขลา </option>
                  <option value="สมุทรสาคร">สมุทรสาคร </option>
                  <option value="สมุทรปราการ">สมุทรปราการ </option>
                  <option value="สมุทรสงคราม">สมุทรสงคราม </option>
                  <option value="สระแก้ว">สระแก้ว </option>
                  <option value="สระบุรี">สระบุรี </option>
                  <option value="สิงห์บุรี">สิงห์บุรี </option>
                  <option value="สุโขทัย">สุโขทัย </option>
                  <option value="สุพรรณบุรี">สุพรรณบุรี </option>
                  <option value="สุราษฎร์ธานี">สุราษฎร์ธานี </option>
                  <option value="สุรินทร์">สุรินทร์ </option>
                  <option value="สตูล">สตูล </option>
                  <option value="หนองคาย">หนองคาย </option>
                  <option value="หนองบัวลำภู">หนองบัวลำภู </option>
                  <option value="อำนาจเจริญ">อำนาจเจริญ </option>
                  <option value="อุดรธานี">อุดรธานี </option>
                  <option value="อุตรดิตถ์">อุตรดิตถ์ </option>
                  <option value="อุทัยธานี">อุทัยธานี </option>
                  <option value="อุบลราชธานี">อุบลราชธานี</option>
                  <option value="อ่างทอง">อ่างทอง </option>
                </select>
              </div>
            </div>

            <div className="col-md-12 mt-2">
              <button type="submit" className="btn-block LoginFacebook">
                <div>
                  <i class="fas fa-save pr-1"></i>
                </div>
                <p className="mx-auto my-1">บันทึกข้อมูล</p>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default EditProfile;
