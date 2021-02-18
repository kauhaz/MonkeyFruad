import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signup.css";
import Chatbot from "../components/chatbot";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import NavbarPage from "../components/navnew";
const Signup = () => {
  let history = useHistory();

  // ที่เก็บ state
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [sex, setSex] = useState("");
  const [date, setDate] = useState();
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailis_inVaild, setEmailis_inVaild] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);

  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  // ฟังกชันการ Signup
  const SignupSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("http://localhost:7000/user/signup", {
        username: username,
        firstname: firstname,
        surname: surname,
        sex: sex,
        date: date,
        phone: phone,
        province: province,
        email: email,
        password: password,
      })
      .then((result) => {
        console.log("signup success", result);
        auth
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
            console.log(result);
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
        history.push("/");
      })
      .catch((err) => {
        setEmailis_inVaild(true);
      });
  };

  // ฟังกชันการ Login ผ่าน Google
  const googleLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(googleProvider);
    console.log(result);
    axios
      .post("http://localhost:7000/user/googlesignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังกชันการ Login ผ่าน Facebook
  const facebookLogin = async (e) => {
    e.preventDefault();
    const result = await auth.signInWithPopup(facebookProvider);
    console.log(result);
    axios
      .post("http://localhost:7000/user/facebooksignup", { result: result })
      .then((result) => {
        console.log(result.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ฟังกชันการเลือกเพศใน input
  const selectSex = (e) => {
    if (e.target.value === "ชาย") {
      setSex(e.target.value);
    } else setSex(e.target.value);
  };

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

  //object schema สำหรับทำ validation
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .test("", "กรุณาใส่ตัวอักษรเท่านั้น", (value) => {
        return !/^[0-9]+$/.test(value);
      }),
    lastname: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .test("", "กรุณาใส่ตัวอักษรเท่านั้น", (value) => {
        return !/^[0-9]+$/.test(value);
      }),
    username: Yup.string()
      .min(2, "สั้นเกินไป")
      .max(50, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    phone: Yup.number()
      .max(10000000000, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      .typeError("กรุณาใส่ตัวเลขเท่านั้น"),
    email: Yup.string()
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .required("จำเป็นต้องกรอกช่องนี้"),
    password: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้"),
    confirmPassword: Yup.string()
      .min(6, "กรุณากรอกตัวอักษรอย่างน้อย 6 ตัว")
      .max(20, "ยาวเกินไป")
      .required("จำเป็นต้องกรอกช่องนี้")
      //check is password match ?
      .test("รหัสผ่านตรงกัน", "รหัสผ่านไม่ตรงกัน", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-signup">
        <form className="LoginForm">
          <img src="/img/logoLogin.png" className="Logo-signup" alt="" />
          <p className="h2 text-center mb-2 font-weight-bold text1-signup">
            สมัครสมาชิก
          </p>
          {emailis_inVaild ? (
            <div className="alert-signup">
              <span>อีเมลนี้มีอยู่ในระบบแล้ว</span>
            </div>
          ) : (
            <p></p>
          )}
          <div className="col-md-12">
            <Formik
              initialValues={{
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                username: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mb-1">
                    <label htmlFor="name" style={styles.txt2}>
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className={`form-control ${
                        touched.username
                          ? errors.username
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="username"
                      placeholder="Username"
                      onKeyUp={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="email" style={styles.txt2}>
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${
                        touched.email
                          ? errors.email
                            ? "is-invalid"
                            : "is-valid"
                          : ""
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

                  <div className="form-group mb-1">
                    <label htmlFor="password" style={styles.txt2}>
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${
                        touched.password
                          ? errors.password
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="password"
                      placeholder="Password"
                      onKeyUp={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="confirmPassword" style={styles.txt2}>
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        touched.confirmPassword
                          ? errors.confirmPassword
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-1">
                    <label htmlFor="name" style={styles.txt2}>
                      ชื่อจริง
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className={`form-control ${
                        touched.name
                          ? errors.name
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="name"
                      placeholder="ชื่อจริง"
                      onKeyUp={(e) => {
                        setFirstname(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="lastname" style={styles.txt2}>
                      นามสกุลจริง
                    </label>
                    <Field
                      name="lastname"
                      type="text"
                      className={`form-control ${
                        touched.lastname
                          ? errors.lastname
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="lastname"
                      placeholder="นามสกุล"
                      onKeyUp={(e) => {
                        setSurname(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="lastname"
                      className="invalid-feedback"
                    />
                  </div>

                  <div
                    className="form-group mb-0 gender"
                    style={{ color: "#6C757D" }}
                  >
                    <label className="label-form-title">เพศ</label>
                    <div className="form-inside">
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
                        />
                        <label htmlFor="female">หญิง</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-4 ">
                    <label htmlFor="phone" style={styles.txt2}>
                      เบอร์โทรศัพท์
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      className={`form-control ${
                        touched.phone
                          ? errors.phone
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      id="phone"
                      placeholder="เบอร์โทรศัพท์"
                      onKeyUp={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="phone"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="Province mb-5" style={{ color: "#6C757D" }}>
                    <label for="province" className="label-form-title">
                      จังหวัด
                    </label>
                    <div className="form-inside">
                      <Field
                        as="select"
                        name="color"
                        className="province-select"
                        onChange={(e) => {
                          setProvince(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          กรุณาเลือกจังหวัด
                        </option>
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
                        <option value="ประจวบคีรีขันธ์">
                          ประจวบคีรีขันธ์{" "}
                        </option>
                        <option value="ปทุมธานี">ปทุมธานี </option>
                        <option value="ปราจีนบุรี">ปราจีนบุรี </option>
                        <option value="ปัตตานี">ปัตตานี </option>
                        <option value="พะเยา">พะเยา </option>
                        <option value="พระนครศรีอยุธยา">
                          พระนครศรีอยุธยา{" "}
                        </option>
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
                      </Field>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <button
              type="submit"
              onClick={SignupSubmit}
              className="btn-block LoginButton"
            >
              <p className="mx-auto my-1">สมัครสมาชิก</p>
            </button>

            <div className="Signup text-center pt-3">
              <span></span>
              <a href="/login">เข้าสู่ระบบ</a>
              <hr></hr>
            </div>

            <button onClick={facebookLogin} className="btn-block LoginFacebook">
              <svg
                className="FacebookIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                viewBox="0 0 90 90"
              >
                <g>
                  <path
                    d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998   C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41   h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </svg>
              <p className="mx-auto my-1">เข้าสู่ระบบด้วย Facebook</p>
            </button>

            <button onClick={googleLogin} className="btn-block LoginGoogle">
              <svg
                className="GoogleIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                fill="#FFFFFF"
                viewBox="0 0 50 50"
              >
                <g>
                  <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z "></path>
                </g>
              </svg>
              <p className="mx-auto my-1">เข้าสู่ระบบด้วย Google</p>
            </button>
          </div>
        </form>
      </div>
      <Chatbot />
    </div>
  );
};

export default Signup;
