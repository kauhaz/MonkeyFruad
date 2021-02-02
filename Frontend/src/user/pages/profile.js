import React, { useState, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";
import Chatbot from "../components/chatbot";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import NavbarPage from "../components/navnew";
import usercontext from "../context/usercontext";
const Profile = () => {
  let history = useHistory();
  var { user, setUser } = useContext(usercontext);
  // ที่เก็บ state
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [surname, setSurname] = useState();
  const [sex, setSex] = useState();
  const [phone, setPhone] = useState();
  const [province, setProvince] = useState();
  const [imagesProfile, setImagesProfile] = useState(""); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [photo, Setphoto] = useState("");
  const [loading, setLoading] = useState(true);
  useMemo(async () =>  {
    try {
   var profiledata = await axios.post("http://localhost:7000/user/session", { user: user })
        setUsername(profiledata.data.data.username);
        setFirstname(profiledata.data.data.firstname);
        setSurname(profiledata.data.data.surname);
        setSex(profiledata.data.data.sex);
        setPhone(profiledata.data.data.phone);
        setProvince(profiledata.data.data.province);
        Setphoto(profiledata.data.data.photoURL);
    }
    catch (err){
      console.log(err)
    }
    setLoading(false);
  }, [user]);
  return loading ? (
    ""
  ) : (
    <div>
      <NavbarPage />
      <div className="container-signup">
        <form className="LoginForm">
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">
            ข้อมูลส่วนตัว
          </p>

          <div className="profile-badformpost-img">
          {imagesProfile ? (
              <img className="img-circle" src={imagesProfile} />
            ) : photo ? (
              <img className="img-circle" src={`${photo.url}`} />
            ) : (
              <img className="img-circle" src={"/img/profile.png"} />
            )}
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">Username</label>
            <div className="form-inside-profile">
              <p>{username}</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">ชื่อจริง</label>
            <div className="form-inside-profile">
              <p>{firstname}</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">นามสกุล</label>
            <div className="form-inside-profile">
              <p>{surname}</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">เพศ</label>
            <div className="form-inside-profile">
              <p>{sex}</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">เบอร์โทรศัพท์</label>
            <div className="form-inside-profile">
              <p>{phone}</p>
            </div>
          </div>

          <div className="form-group my-0">
            <label className="label-form-title-profile">จังหวัด</label>
            <div className="form-inside-profile">
              <p>{province}</p>
            </div>
          </div>

          <div className="col-md-12 mt-2">
            {/* <button className="btn-block LoginFacebook"> */}
              <div>
                <i class="fas fa-user-edit"></i>
              </div>
              <a href={`/profile/edit/${user.uid}`} className="mx-auto my-1 btn-block LoginFacebook">
                แก้ไขข้อมูลส่วนตัว
              </a>
            {/* </button> */}
            {/* <button className="btn-block LoginGoogle"> */}
              <div>
                <i class="fas fa-unlock"></i>
              </div>
              <a href="/changepass" className="mx-auto my-1 btn-block LoginGoogle">
                เปลี่ยนรหัสผ่าน
              </a>
            {/* </button> */}
          </div>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Profile;
