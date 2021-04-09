import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import usercontext from "../context/usercontext";
import "./listcomment.css";
import * as moment from "moment";
import "moment/locale/th";
import _ from "lodash";
import ClipLoaderComent from "./clipLoaderComent";
import { v4 as uuidv4 } from "uuid";
import Modalimage from "./Modalimage";
import Modaldelete from "./Modaldelete";
const Listcomment = ({
  commentmore,
  handledeletetorerender,
  handleedittorerender,
}) => {
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagecomment, Setimagecomment] = useState();

  const [files, Setfiles] = useState();
  const [error, Seterror] = useState();
  const [item, Setitem] = useState([]);
  const [checkedittext, Setcheckedittext] = useState(false);
  const [textcomment, Settextcomment] = useState();
  const [edittextcomment, Setedittextcomment] = useState("");
  const [imagecomment2, Setimagecomment2] = useState();
  const [fuck, Setfuck] = useState([]);
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();
  const [loading, Setloading] = useState();
  const [isActive, setIsActive] = useState(false);

  const [modalcommentid, Setmodalcommentid] = useState();
  const [modalcommentmore, Setmodalcommentmore] = useState();
  const [isOpenModalDelete, SetisOpenModalDelete] = useState(false);

  let { user, setUser } = useContext(usercontext);

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
      if (imagecomment) {
        imagecomment.splice(index, 1);
        Setimagecomment([...imagecomment]);
      }
      if (imagecomment && imagecomment.length === 0) {
        Setimagecomment();
      }
      if (imagesFile) {
        imagesFile.splice(index, 1);
        setImagesFile([...imagesFile]);
      }
      if (imagesFile && imagesFile.length === 0) {
        setImagesFile();
      }

      if (fuck) {
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
        files.splice(index, 1);
        Setfiles([...files]);
      }
    } catch (err) {
      console.log(err);
    }
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
        `https://monkeyfruad01.herokuapp.com/post/edit/comment/${commentid}`,
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

  return (
    <div
      onClick={() => {
        if (isActive == true) {
          setIsActive(false);
        }
      }}
    >
      {commentmore ? (
        <div className="postcommentrows">
          <div class="vl"></div>
          <div className="post-comment-img1">
            <div className="header-post-comment">
              <div className="post-profilecomment-img1">
                {commentmore.photoURL ? (
                  <img
                    className="img-circle profile-listcomment1"
                    src={`${commentmore.photoURL.url}`}
                  />
                ) : (
                  <img
                    className="img-circle profile-listcomment1"
                    src="/img/profile.png"
                  />
                )}
              </div>
              <div className="post-comment-name1">
                {commentmore ? "@" : null}
                {commentmore.username}
                <div className="none-postlistcomment2"></div>
                <span className="post-comment-time1">
                  {" "}
                  {moment(new Date(commentmore.datetime.seconds * 1000))
                    .startOf()
                    .fromNow()}{" "}
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
                            onClick={() => (
                              Setmodalcommentid(commentmore.commentid),
                              Setmodalcommentmore(commentmore),
                              setIsActive(false),
                              handlemodalopen()
                            )}
                          >
                            {" "}
                            ลบคอมเมนต์{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Modaldelete
                    text="deletecomment"
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
              ) : null}
            </div>

            <br />
            {loading ? (
              <div>
                <ClipLoaderComent loading={loading} />
              </div>
            ) : checkedittext ? (
              <div className="comment">
                <div className="commentbox">
                  {!imagecomment && !imagesFile ? (
                    <div className="container-img-holder-imgpreview1">
                      <label>
                        <img
                          className="uploadprovepost1"
                          src="/img/addimg.png"
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

                  <div
                    className="post-writecommemt"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <textarea
                      rows="3"
                      cols="15"
                      className="inputlistcomment1"
                      placeholder="เขียนความคิดเห็น..."
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
                </div>

                <div>
                  <div className="imgcommentitempost">
                    {imagesFile
                      ? imagesFile.map((imagePreviewUrl, index) => {
                          return (
                            <div className="postdelete">
                              <img
                                key={index}
                                className="imgpreviewpost1"
                                alt="previewImg"
                                src={imagePreviewUrl}
                              />
                              <span className="deleteimgposts1">
                                <img
                                  className="deleteimgposts2"
                                  src="/img/delete2.png"
                                  onClick={() => handledeleteimage(index)}
                                />
                              </span>
                            </div>
                          );
                        })
                      : imagecomment
                      ? imagecomment
                        ? imagecomment.map((doc, index) => {
                            return (
                              <div className="postdelete">
                                <img
                                  className="imgpreviewpost1"
                                  src={`${doc.url}`}
                                  onClick={() => (
                                    Setimagemodal(doc.url), handleopenmodal()
                                  )}
                                />
                                <span className="deleteimgposts1">
                                  <img
                                    className="deleteimgposts2"
                                    src="/img/delete2.png"
                                    onClick={() => handledeleteimage(index)}
                                  />
                                </span>
                              </div>
                            );
                          })
                        : null
                      : null}

                    {imagecomment || imagesFile ? (
                      <div className="uploadproveedits">
                        <label className="uploadproveedits1">
                          <img
                            className="uploadproveedits2"
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
                                onClick={() => (
                                  Setimagemodal(doc.url), handleopenmodal()
                                )}
                              />
                            </div>
                          );
                        })
                      : null
                    : null}
                  <Modalimage
                    isopen={isopen}
                    handleopenmodal={handleopenmodal}
                    handleclosemodal={handleclosemodal}
                    imagemodal={imagemodal}
                  />
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
