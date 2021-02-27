import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "../../user/components/Listcomment2.css";
import * as moment from "moment";
import "moment/locale/th";
import _ from "lodash";
const Listcomment = ({ commentmore }) => {
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
                <div className="mypostcomment1">{commentmore.textcomment}</div>

                {commentmore.photocomment
                  ? commentmore.photocomment.map((doc) => {
                      return (
                        <div>
                          <img
                            className="imgcommentmypost"
                            src={`${doc.url}`}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Listcomment;
