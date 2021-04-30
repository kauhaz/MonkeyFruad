import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./forgetpass.css";
import Chatbot from "../components/chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import axios from "axios";
import NavbarPage from "../components/navnew";

const Forgetpass = () => {
  let history = useHistory();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [email, setEmail] = useState("");
  const [sendEmail, setSendemail] = useState();
  const [sendEmailFaliure, setSendEmailFaliure] = useState();
  const ForgetEmailSubmit = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setSendemail(true);
        setSendEmailFaliure(false);
      })
      .catch(function (error) {
        setSendEmailFaliure(true);
        setSendemail(false);
      });
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
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

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .required("จำเป็นต้องกรอกช่องนี้"),
    password: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
  });

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-forget">
        <form className="ForgetPassForm">
          <img src="/img/logoLogin.png" className="Logo-forget" />
          <p className="h1 text-center mb-4 font-weight-bold">Reset password</p>
          <p className="text-left my-0 mb-4 text2-forget">
            กรอกอีเมลที่เชื่อมกับบัญชีของคุณ
            จากนั้นเราจะส่งอีเมลพร้อมคำแนะนำในการรีเซ็ทรหัสผ่านของคุณ
          </p>
          {sendEmail ? (
            <div className="alert-forgetpass sent">
              <span>ได้ส่งคำขอไปยัง Email ดังกล่าวแล้ว</span>
            </div>
          ) : null}
          {sendEmailFaliure ? (
            <div className="alert-forgetpass unsent">
              <span>ไม่มีอีเมลดังกล่าวในระบบ กรุณากรอกอีเมลใหม่</span>
            </div>
          ) : null}
          <div className="ForgetPassInputForm">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group-forgetpass mb-4">
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        touched
                          ? ""
                          : sendEmailFaliure
                          ? "is-invalid"
                          : "is-valid"
                      }`}
                      id="email"
                      placeholder="Email"
                      onKeyUp={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <button
            onClick={ForgetEmailSubmit}
            className="btn-block ForgetPassButton"
          >
            <p className="mx-auto my-1">ส่งไปที่อีเมล</p>
          </button>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Forgetpass;
