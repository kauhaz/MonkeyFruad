
import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import usercontext from "../context/usercontext";

const  Listcomment = ( {commentid }) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
    let { user, setUser } = useContext(usercontext);
    const [item , Setitem] = useState([])
    const [checkedittext , Setcheckedittext] = useState(false)
    // const [edittextcomment , Setedittextcomment] = useState()
    const [textcomment , Settextcomment] = useState()
  
      
  
    const deleted = async (commentid) => {
        const postdelete = await Axios.post(`http://localhost:7000/post/delete/comment/${commentid}`);
        // const getcomment = await Axios.get(`http://localhost:7000/post/comment/${uid}`)
        // console.log( getcomment.data.item);
        // Setallcomment( getcomment.data.item);
        window.location.reload(false);
    };
    const edit = async () =>{
      Setcheckedittext(true)
    }
    const handleedit = async (commentid) =>{
    const editcomment = await Axios.post(`http://localhost:7000/post/edit/comment/${commentid}`,  {textcomment} )
    
    }
  

    return (
        <div>
               <div className="row mypostcommentrow">
         <div className="column1 mypostcommentrow1">
        <div class="vl"></div>
        <div className="mypost-comment-img1">
          <img className="img-circle1" src="/img/profile.png" />
          <div className="mypost-comment-name1">
           {commentid ? "@" : null}{commentid.username}
            <span className="mypost-comment-time1"> {commentid.datetime} </span>
          </div>
          <br />
         {checkedittext ? <div><input value={textcomment} onChange={(e) =>{Settextcomment(e.target.value)}}></input> <button onClick={() => handleedit(commentid.commentid)}>ตกลง</button> </div>: <div className="mypost-comment-comments1">
            <div className="mypostcomment1">{commentid.textcomment}</div> 
          </div>  
         } 
        </div> 
       </div> 
       {user && commentid.userid == user.uid ? <div className="column2 mypostcommentrow2">
        <div className="menu-containermypostcommentsetting">
          <div onClick={onClick} className="mypostcommentbuttonsetting">
            <img 
              className="mypostcommentimg-setting"
              src="/img/setting.png"
              alt="avatar"
            ></img> 
       </div>

          <div
            className={`mypostcommentmenusetting ${
              isActive ? "active" : "inactive"
            }`}
          >
            <ul className="ul-mypostcommentmenusetting">
           <li className="li-mypostcommentmenusetting">
                <a className="a-mypostcommentmenusetting"
                onClick={() => edit(commentid.commentid)}
                >
                    แก้ไขคอมเมนต์
                </a>
              </li> 
              <li className="li-mypostcommentmenusetting">
                <a
                  className="a-mypostcommentmenusetting"
                  onClick={() => deleted(commentid.commentid)}
                >
                  {" "}
                  ลบคอมเมนต์{" "}
                </a>
              </li> 
            </ul>
          </div>
        </div>
      </div> : null }
    </div>
</div>
    )
}
export default Listcomment