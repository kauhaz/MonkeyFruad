import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../../user/components/commentitemformypost.css";
import Listcomment from "./listcommentmypost";
import _ from "lodash";
const { v4: uuidv4 } = require("uuid");

const Commentmypost = ({ postid }) => {
  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
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

  let history = useHistory();
  let uuid = uuidv4();

  const handlemorecomment = async () => {
    try {
      Setshowcommentall(true);
      Sethidebutton(false);
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gg();
  }, []);

  return (
    <div>
      {showcommentall ? (
        <div>
          {" "}
          {commentmore
            ? commentmore.map((commentmore) => {
                return <Listcomment commentmore={commentmore} />;
              })
            : null}{" "}
        </div>
      ) : (
        <div>
          {commentmore ? (
            <div>
              <Listcomment commentmore={commentmore[0]} />{" "}
              <Listcomment commentmore={commentmore[1]} />{" "}
              <Listcomment commentmore={commentmore[2]} />{" "}
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
    </div>
  );
};

export default Commentmypost;
