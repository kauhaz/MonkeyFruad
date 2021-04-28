import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "../../user/components/listcomment.css";
import * as moment from "moment";
import "moment/locale/th";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import Modalimage from "../../user/components/Modalimage";

const Listcommentpost = ({
  commentmore,
  handledeletetorerender,
  handleedittorerender,
  setIsActive,
  isActive,
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

  const handleopenmodal = async () => {
    Setisopen(true);
  };
  const handleclosemodal = async () => {
    Setisopen(false);
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
  if (commentmore && commentmore.photocomment) {
    console.log(commentmore.photocomment);
  }
  const deleted = async (commentid, commentmore) => {
    console.log(commentmore);
    const postdelete = await Axios.post(
      `https://monkeyfruad01.herokuapp.com/post/delete/comment/${commentid}`,
      commentmore
    );
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

  // console.log(imagesFile)
  return (
    <div>
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
            </div>

            <br />
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
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Listcommentpost;
