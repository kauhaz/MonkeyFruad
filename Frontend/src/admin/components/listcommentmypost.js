import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "../../user/components/Listcomment2.css";
import * as moment from "moment";
import "moment/locale/th";
import _ from "lodash";
import Modalimage from "../../user/components/Modalimage"


const Listcommentmypost = ({
  commentmore,
}) => {
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [files, Setfiles] = useState();
  const [error, Seterror] = useState();
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const [item, Setitem] = useState([]);
  const [checkedittext, Setcheckedittext] = useState(false);
  const [textcomment, Settextcomment] = useState();
  const [edittextcomment, Setedittextcomment] = useState();
  const [imagecomment, Setimagecomment] = useState();
  const [loading, Setloading] = useState();
  const [fuck, Setfuck] = useState([]);
  const [isopen, Setisopen] = useState(false);
  const [imagemodal, Setimagemodal] = useState();


  const handleopenmodal = async() =>{
    Setisopen(true)
  }
  const handleclosemodal = async() =>{
    Setisopen(false)
  }

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
    <div>
      {commentmore ? (
        <div className="row mypostcommentrow">
          <div className="column1 mypostcommentrow1">
            <div class="vl"></div>
            <div className="mypost-comment-img1">
              <div className="mypost-profilecomment-img1">
                {commentmore.photoURL ? (
                  <img
                    className="img-circle"
                    src={`${commentmore.photoURL.url}`}
                  />
                ) : (
                  <img className="img-circle" src="/img/profile.png" />
                )}
              </div>
              <div className="mypost-comment-name1">
                {commentmore ? "@" : null}
                {commentmore.username}
                <span className="mypost-comment-time1">
                  {" "}
                  {moment(new Date(commentmore.datetime.seconds * 1000)).format(
                    "LTS"
                  )}{" "}
                </span>
              </div>
              <br />
              
                <div className="mypost-comment-comments1">
                  <div className="mypostcomment1">
                    {commentmore.textcomment}
                  </div>

                  <div className="row imglistcommentmypost">
                    {imagecomment
                      ? imagecomment.map((doc) => {
                          return (
                            <div className="imglistcommentmypost1 col-6">
                              <img
                                className="listcommentmypost2"
                                src={`${doc.url}`}
                                onClick = {() => (Setimagemodal(doc.url),handleopenmodal())}
                              />
                            </div>
                          );
                        })
                      : null}
                      <Modalimage isopen={isopen} handleopenmodal={handleopenmodal} handleclosemodal={handleclosemodal} imagemodal={imagemodal}/>
                  </div>
                </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Listcommentmypost;



