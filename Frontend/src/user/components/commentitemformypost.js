import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./commentitemformypost.css";
import usercontext from "../context/usercontext";
import Listcomment2 from "./Listcomment2";
import Loading from "./clipLoader";
import _ from "lodash";
import Modalimage from "./Modalimage";
import ClipLoaderComentMypost from "./clipLoaderComentMypost";

const { v4: uuidv4 } = require("uuid");

const Commentitemformypost = ({ postid }) => {
  let { user } = useContext(usercontext);
  const [imagecomment, Setimagecomment] = useState();
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState();
  const [commentmore, Setcommentmore] = useState();
  const [showcommentall, Setshowcommentall] = useState();
  const [hidebutton, Sethidebutton] = useState(true);
  const [click, Setclick] = useState();
  const [showdelete, Setshowdelete] = useState();
  const [showedit, Setshowedit] = useState();
  const [data, Setdata] = useState();
  const [error, Seterror] = useState();
  const [textcomment, Settextcomment] = useState("");
  const [photourl, Setphotourl] = useState();
  const [photopublic_id, Setphotopublic_id] = useState();
  const [loading, SetLoading] = useState(false);
  const [fuck, Setfuck] = useState([]);

  let history = useHistory();
  let uuid = uuidv4();

  const FileUpload = (event) => {
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ

    setImagesFile([]);
    var myfuck = [];
    var files = [];
    let date = new Date();
    if (imagecomment) {
      imagecomment.map(async (doc) => {
        const response = await Axios({
          method: "get",
          url: doc.url,
          responseType: "blob",
        });
        await myfuck.push(
          new File([response.data], `filename${uuidv4()}.png`, {
            type: response.data.type,
            lastModified: date,
          })
        );
      });
    }

    setTimeout(() => {
      if (myfuck) {
        myfuck.forEach((doc) => {
          files.push(doc);
        });
      }

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
      if (imagecomment) {
        imagecomment.forEach(async (doc) => {
          const response = await fetch(doc.url);
          const data = await response.blob();
          myFile.push(
            new File([data], `filename${uuidv4()}.png`, {
              type: "image/png",
              lastModified: date,
            })
          );
        });
        Setfiles(myFile);
      }
      if (files) {
        console.log("d");
        files.splice(index, 1);
        Setfiles([...files]);
      }
    } catch (err) {
      console.log(err);
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
        if (!files && !textcomment) {
          return Seterror("กรุณาใส่ข้อความหรือรูปภาพ");
        }
        if (files && files.length === 0) {
          return Seterror("กรุณาใส่ข้อความหรือรูปภาพ");
        }
        SetLoading(true);
        const sentcomment = await Axios.post(
          `https://monkeyfruad01.herokuapp.com/post/comment/${postid}`,
          formdata
        );
        const sendnoti = await Axios.post(
          `https://monkeyfruad01.herokuapp.com/post/notificationnonread/${postid}/${user.uid}`
        );

        Setclick(sentcomment);
        Settextcomment("");
        setImagesFile();
        Setfuck([]);
        Setfiles();
        Seterror();
        SetLoading(false);
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
        `https://monkeyfruad01.herokuapp.com/post/commentmore/${postid}`
      );
      Setcommentmore(getcommentall.data.item);
      if (user) {
        const nameuser = await Axios.post(
          "https://monkeyfruad01.herokuapp.com/user/userid",
          {
            result: user,
          }
        );
        Setdata(nameuser.data.item);

        var profiledata = await Axios.post(
          "https://monkeyfruad01.herokuapp.com/user/session",
          {
            user: user,
          }
        );
        console.log(profiledata);
        if (profiledata.data.data.photoURL) {
          Setphotourl(profiledata.data.data.photoURL.url);
          console.log("ggg");
          Setphotopublic_id(profiledata.data.data.photoURL.public_id);
        }
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
                  <Listcomment2
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
              <Listcomment2
                commentmore={commentmore[0]}
                handledeletetorerender={handledeletetorerender}
                handleedittorerender={handleedittorerender}
              />{" "}
              <Listcomment2
                commentmore={commentmore[1]}
                handledeletetorerender={handledeletetorerender}
                handleedittorerender={handleedittorerender}
              />{" "}
              <Listcomment2
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

      <div className="mypost-comment-comments1">
        <div className="mypost-profilecomment-img1">
          {photourl ? (
            <img className="img-circle profile-comment2" src={`${photourl}`} />
          ) : (
            <img
              className="img-circle profile-comment2"
              src="/img/profile.png"
            />
          )}
        </div>
        <div className="mypost-section-commment">
          {loading ? (
            <div className="col-lg-10 col-4">
              {" "}
              <ClipLoaderComentMypost />{" "}
            </div>
          ) : (
            <div>
              <div className="mypost-comment-commentsall">
                {!imagesFile && !imagecomment ? (
                  <div className="container-img-holder-imgpreview2">
                    <label>
                      <img className="uploadprove2" src="/img/addimg.png" />
                      <input
                        id="FileInput"
                        className="uploadsmypostcomment"
                        type="file"
                        onChange={FileUpload}
                        multiple
                        accept="image/png, image/jpeg , image/jpg"
                      />
                    </label>
                  </div>
                ) : (
                  <div></div>
                )}

                <div
                  className="mypost-writecommemt"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <textarea
                    rows="3"
                    cols="15"
                    className="inputcommentmypost2"
                    placeholder="เขียนความคิดเห็น..."
                    value={textcomment}
                    onChange={(e) => {
                      Settextcomment(e.target.value);
                      Seterror();
                    }}
                  />
                </div>

                <div>
                  <div className="mypostbuttonsendss">
                    <button
                      className="mypostbuttonsends1"
                      onClick={() => handlecomment()}
                    >
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>

                <div className="imgcommentitemmypost2">
                  {imagesFile
                    ? imagesFile.map((imagePreviewUrl, index) => {
                        return (
                          <div className="postdeletemypost">
                            <img
                              key={index}
                              className="imgpreviewb1"
                              alt="previewImg"
                              src={imagePreviewUrl}
                            />
                            <span className="deleteimgmyposts1">
                              <img
                                className="deleteimgmyposts2"
                                src="/img/delete2.png"
                                onClick={() => handledeleteimage(index)}
                              />
                            </span>
                          </div>
                        );
                      })
                    : null}
                  {imagesFile || imagecomment ? (
                    <div className="uploadproveeditmypost">
                      <label className="uploadproveeditmypost1">
                        <img
                          className="uploadproveeditmypost2"
                          src="/img/last1.png"
                        />
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
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
          <h1 className="h1-mypostfileerror">{error}</h1>
        </div>
      </div>
    </div>
  );
};

export default Commentitemformypost;
