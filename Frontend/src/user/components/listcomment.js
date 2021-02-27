import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import usercontext from "../context/usercontext";
import "./listcomment.css";
import * as moment from "moment";
import "moment/locale/th";
import _ from "lodash";
import ClipLoader from "./clipLoader";
import { v4 as uuidv4 } from "uuid";

const Listcomment = ({
  commentmore,
  handledeletetorerender,
  handleedittorerender,
}) => {
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagecomment, Setimagecomment] = useState();

  const [files, Setfiles] = useState();
  const [error, Seterror] = useState();
  const [isActive, setIsActive] = useState(false);
  const [item, Setitem] = useState([]);
  const [checkedittext, Setcheckedittext] = useState(false);
  const [textcomment, Settextcomment] = useState();
  const [edittextcomment, Setedittextcomment] = useState("");
  const [imagecomment2, Setimagecomment2] = useState();
  const [fuck, Setfuck] = useState([]);

  const [loading, Setloading] = useState();
  let { user, setUser } = useContext(usercontext);

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
  // console.log(fuck);
  // console.log(imagesFile);
  // console.log(files);
  // console.log(imagecomment)
  console.log(imagesFile);

  const handledeleteimage = async (index) => {
    try {
      if (imagecomment) {
        console.log("a");
        imagecomment.splice(index, 1);
        Setimagecomment([...imagecomment]);
      }
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
  if(commentmore && commentmore.photocomment){
    console.log(commentmore.photocomment)
  }
  const deleted = async (commentid,commentmore) => {
      console.log(commentmore)
    const postdelete = await Axios.post(
      `http://localhost:7000/post/delete/comment/${commentid}`,commentmore);
    setIsActive(false);
    Setfuck([]);
    setImagesFile();
    Setfiles();
    handledeletetorerender();
  };

  const edit = async () => {
    Setcheckedittext(true);
    setIsActive(false);
    var myfuck = [];
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
      Setfiles([...myfuck]);
    }, 50);
  };
  const handleedit = async (commentid) => {
    try {
      let formdata = new FormData();
      _.forEach(files, (file) => {
        formdata.append("photocomment", file);
      });
      formdata.append("edittextcomment", edittextcomment);
      formdata.append("photocomment", imagecomment);

      Setloading(true);
      const editcomment = await Axios.post(
        `http://localhost:7000/post/edit/comment/${commentid}`,
        formdata
      );

      handleedittorerender();
      Setfuck([]);
      setImagesFile();
      Setfiles();
      Setcheckedittext(false);
      Setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const gg = async () => {
    try {
      if (commentmore) {
        Setedittextcomment(commentmore.textcomment);
        Setimagecomment(commentmore.photocomment);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gg();
  }, [commentmore]);

  // console.log(imagesFile)
  return (
    <div>
      {commentmore ? (
        <div className="postcommentrows">
          {/* <div class="vl"></div> */}
          <div className="post-comment-img1">
            <div className="header-post-comment">
              <div className="post-profilecomment-img1">
                {commentmore.photoURL ? (
                  <img
                    className="img-circle"
                    src={`${commentmore.photoURL.url}`}
                  />
                ) : (
                  <img className="img-circle" src="/img/profile.png" />
                )}
              </div>
              <div className="post-comment-name1">
                {commentmore ? "@" : null}
                {commentmore.username}
                <span className="post-comment-time1">
                  {" "}
                  {moment(new Date(commentmore.datetime.seconds * 1000)).format(
                    "LTS"
                  )}{" "}
                </span>
              </div>
              {user && commentmore.userid == user.uid ? (
                <div>
                  <div className="menu-containerpostcommentsetting">
                    <div
                      onClick={() => setIsActive(!isActive)}
                      className="postcommentbuttonsetting"
                    >
                      <img
                        className="postcommentimg-setting"
                        src="/img/setting.png"
                        alt="avatar"
                      />
                    </div>

                    <div
                      className={`postcommentmenusetting ${
                        isActive ? "active" : "inactive"
                      }`}
                    >
                      <ul className="ul-postcommentmenusetting">
                        <li className="li-postcommentmenusetting">
                          <a
                            className="a-postcommentmenusetting"
                            onClick={() => edit(commentmore.commentid)}
                          >
                            แก้ไขคอมเมนต์
                          </a>
                        </li>
                        <li className="li-postcommentmenusetting">
                          <a
                            className="a-postcommentmenusetting"
                            onClick={() => deleted(commentmore.commentid,commentmore)}
                          >
                            {" "}
                            ลบคอมเมนต์{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <br />
            {loading ? (
              <div className="col-lg-10 col-4">
                <ClipLoader loading={loading} />
              </div>
            ) : checkedittext ? (
              <div className="row comment">
                <div className="commenttextareapost">
                  <textarea
                    value={edittextcomment}
                    onChange={(e) => {
                      Setedittextcomment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="buttoncommentpostsave1">
                  <button
                    className="buttoncommentpostsave2"
                    onClick={() => handleedit(commentmore.commentid)}
                  >
                    บันทึก
                  </button>
                </div>

                <div className="container-img-holder-imgpreview1">
                  {!imagecomment && !imagesFile ? (
                    <div>
                      <label>
                        <img
                          className="uploadprovepost1"
                          src="/img/addphoto.png"
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
                  ) : null}
                </div>
                <div>
                  <div className="imgcommentitempost">
                    {imagesFile
                      ? imagesFile.map((imagePreviewUrl, index) => {
                          return (
                            <div className="imgcommentitempost1">
                              <img
                                key={index}
                                className="imgpreviewmypost1"
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
                              <div className="deleteimgposts1">
                                <img
                                  className="deleteimgposts2"
                                  src="/img/delete2.png"
                                  onClick={() => handledeleteimage(index)}
                                />
                              </div>
                            </div>
                          );
                        })
                      : imagecomment
                      ? imagecomment
                        ? imagecomment.map((doc, index) => {
                            return (
                              <div>
                                <img
                                  className="imgpreviewpost1"
                                  src={`${doc.url}`}
                                />
                                <div className="deleteimgposts1">
                                  <img
                                    className="deleteimgposts2"
                                    src="/img/delete2.png"
                                    onClick={() => handledeleteimage(index)}
                                  />
                                </div>
                              </div>
                            );
                          })
                        : null
                      : null}
                    {imagecomment || imagesFile ? (
                      <div>
                        <label>
                          <img
                            className="uploadprovepost2"
                            src="/img/addphoto.png"
                          />
                          <input
                            id="FileInput"
                            className="uploadspostcomment"
                            type="file"
                            onChange={FileUpload}
                            multiple
                            accept="image/png, image/jpeg , image/jpg"
                          />
                        </label>{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="post-comment-comments2">
                <div className="postcomment1">{commentmore.textcomment}</div>
                <div className="imglistcomment">
                  {/* {loading ? <ClipLoader /> : <div></div>} */}
                  {imagecomment
                    ? imagecomment
                      ? imagecomment.map((doc) => {
                          return (
                            <div className="imglistcommentpost1">
                              <img
                                className="listcommentpost2"
                                src={`${doc.url}`}
                              />
                            </div>
                          );
                        })
                      : null
                    : null}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Listcomment;
