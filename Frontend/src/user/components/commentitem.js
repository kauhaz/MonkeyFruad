import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./commentitem.css";
import usercontext from "../context/usercontext";
import Listcomment from "./listcomment";
import _ from "lodash";
import { MDBInput } from "mdbreact";
const { v4: uuidv4, NIL } = require("uuid");

const Commentitem = ({ postid }) => {
  const onClick = () => setIsActive(!isActive);
  let { user, setUser } = useContext(usercontext);

  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState();
  const [isActive, setIsActive] = useState(false);
  const [commentmore, Setcommentmore] = useState();
  const [showcommentall, Setshowcommentall] = useState();
  const [hidebutton, Sethidebutton] = useState(true);
  const [click, Setclick] = useState();
  const [showdelete, Setshowdelete] = useState();
  const [showedit, Setshowedit] = useState();
  const [item, Setitem] = useState([]);
  const [checkedittext, Setcheckedittext] = useState(false);

  const [data, Setdata] = useState();
  const [show, Setshow] = useState();
  const [error, Seterror] = useState();

  const [textcomment, Settextcomment] = useState("");
  const [photourl, Setphotourl] = useState();
  const [photopublic_id, Setphotopublic_id] = useState();
  let history = useHistory();

  let uuid = uuidv4();

  // ฟังก์ชันอัพโหลดไฟล์
  const FileUpload = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    setImagesFile([]); // reset state รูป เพื่อกันในกรณีที่กดเลือกไฟล์ซ้ำแล้วรูปต่อกันจากอันเดิม
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setfiles(files);
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


  const handlecomment = async () => {
    try {
      if (user) {
        let formdata = new FormData();
        let useruid = user.uid;
        _.forEach(files, (file) => {
          formdata.append("photocomment", file);
        });
        formdata.append("textcomment", textcomment);
        formdata.append("username", data[0].username);
        formdata.append("userid", user.uid);
        formdata.append("photourl", photourl);
        formdata.append("photopublic_id", photopublic_id);
        const sentcomment = await Axios.post(
          `http://localhost:7000/post/comment/${postid}`,
          formdata
        );
        Setclick(sentcomment);
        Settextcomment("");
        setImagesFile([]);
        Seterror();
      } else {
        history.push({
          pathname: "/login",
          search: `?login=false`,
          state: {
            login: false,
          },
        });
      }
    } catch (err) {
      err && Seterror(err.response.data.msg);
    }
  };

  const handlemorecomment = async () => {
    try {
      Setshowcommentall(true);
      Sethidebutton(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handledeletetorerender = async () => {
    try {
      Setshowdelete(uuid);
    } catch (err) {
      console.log(err);
    }
  };

  const handleedittorerender = async () => {
    try {
      Setshowedit(uuid);
    } catch (err) {
      console.log(err);
    }
  };

  const gg = async () => {
    try {
      const getcommentall = await Axios.get(
        `http://localhost:7000/post/commentmore/${postid}`
      );
      Setcommentmore(getcommentall.data.item);
      if (user) {
        const nameuser = await Axios.post("http://localhost:7000/user/userid", {
          result: user,
        });
        Setdata(nameuser.data.item);

        var profiledata = await Axios.post(
          "http://localhost:7000/user/session",
          {
            user: user,
          }
        );
        Setphotourl(profiledata.data.data.photoURL.url);
        Setphotopublic_id(profiledata.data.data.photoURL.public_id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gg();
  }, [click, showdelete, showedit]);

  return (
    <div>
      {showcommentall ? (
        <div>
          {" "}
          {commentmore
            ? commentmore.map((commentmore) => {
                return (
                  <Listcomment
                    commentmore={commentmore}
                    handledeletetorerender={handledeletetorerender}
                    handleedittorerender={handleedittorerender}
                  />
                );
              })
            : null}{" "}
        </div>
      ) : (
        <div>
          {commentmore ? (
            <div>
              <Listcomment
                commentmore={commentmore[0]}
                handledeletetorerender={handledeletetorerender}
                handleedittorerender={handleedittorerender}
              />{" "}
              <Listcomment
                commentmore={commentmore[1]}
                handledeletetorerender={handledeletetorerender}
                handleedittorerender={handleedittorerender}
              />{" "}
              <Listcomment
                commentmore={commentmore[2]}
                handledeletetorerender={handledeletetorerender}
                handleedittorerender={handleedittorerender}
              />{" "}
            </div>
          ) : null}
        </div>
      )}

      {commentmore && commentmore.length > 3 ? (
        <div>
          {hidebutton ? (
            <button onClick={handlemorecomment} className="postother2">
              ดูอีก {commentmore.length - 3} ความคิดเห็น
            </button>
          ) : null}{" "}
        </div>
      ) : null}

      <div className="row post-comment-comments1">
        <div className="post-profilecomment-img1">
          {photourl ? (
            <img className="img-circle" src={`${photourl}`} />
          ) : (
            <img className="img-circle" src="/img/profile.png" />
          )}
        </div>

        <div className="row post-comment-commentsall">
          {imagesFile.map((imagePreviewUrl) => {
            return (
              <img
                key={imagePreviewUrl}
                className="imgpreview1"
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
            );
          })}

          <div className="container-img-holder-imgpreview1">
            <label>
              <img className="uploadprove1" src="/img/addphoto.png" />
              <input
                id="FileInput"
                className="uploadspostcomment"
                type="file"
                onChange={FileUpload}
                multiple
                accept="image/png, image/jpeg , image/jpg"
              />
            </label>
          </div>

          <div
            className="post-writecommemt col-lg-6 col-10"
            controlId="exampleForm.ControlTextarea1"
          >
            {/* <div className="cmp">
              <form className="cmpf" action="" method="post">
                <textarea
                  rows="3"
                  cols="15"
                  className="inputcomment1"
                  label="เขียนความคิดเห็น..."
                  // size="25"
                  value={textcomment}
                  onChange={(e) => {
                    Settextcomment(e.target.value);
                  }}
                />
                <br />
                <br />
              </form>
            </div> */}
            <textarea
              rows="3"
              cols="15"
              className="inputcomment1"
              placeholder="เขียนความคิดเห็น..."
              value={textcomment}
              onChange={(e) => {
                Settextcomment(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="column2 mypostbuttonsend">
              <button
                className="mypostbuttonsends"
                onClick={() => handlecomment()}
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <h1 className="h1-postfileerror">{error}</h1>
      </div>
    </div>
  );
};

export default Commentitem;
