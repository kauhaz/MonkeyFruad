
import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import usercontext from "../context/usercontext";

const  Listcomment = ( {comment , commentmore }) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
    let { user, setUser } = useContext(usercontext);
    const [item , Setitem] = useState([])
    const [checkedittext , Setcheckedittext] = useState(false)
    // const [edittextcomment , Setedittextcomment] = useState()
    const [textcomment , Settextcomment] = useState()
    const [edittextcomment , Setedittextcomment] = useState()
  
  
  
    const deleted = async (commentid) => {
        const postdelete = await Axios.post(`http://localhost:7000/post/delete/comment/${commentid}`);
        window.location.reload(false);
    };
    const edit = async () =>{
      Setcheckedittext(true)
    }
    const handleedit = async (commentid) =>{
   console.log(edittextcomment)
    const editcomment = await Axios.post(`http://localhost:7000/post/edit/comment/${commentid}`,  {edittextcomment} )
  
    }

    
    const gg = async () => {
        try {
             if(commentmore){
                Setedittextcomment(commentmore.textcomment) 
             }
             
        } catch (err) {
          console.log(err);
        }
    
      };
      useEffect(() => {
        gg();
      }, []);
  

    return (
        <div>
            {commentmore ?   <div className="row mypostcommentrow">
         <div className="column1 mypostcommentrow1">
        <div class="vl"></div>
        <div className="mypost-comment-img1">
        <div className="post-profilecomment-img1">
                  {commentmore.photoURL ? <img className="img-circle" src={`${commentmore.photoURL.url}`}  /> : <img className="img-circle" src="/img/profile.png" /> }
             
                </div>
          <div className="mypost-comment-name1">
           {commentmore ? "@" : null}{commentmore.username}
            <span className="mypost-comment-time1"> {commentmore.datetime} </span>
          </div>
          <br />
         {checkedittext ? <div><input value={edittextcomment} onChange={(e) =>{Setedittextcomment(e.target.value)}}></input> 
         <button onClick={() => handleedit(commentmore.commentid)}>ตกลง</button> 
         </div> : <div className="mypost-comment-comments1">
            <div className="mypostcomment1">{commentmore.textcomment}</div> 
          </div>  
         } 
        </div> 
       </div> 
       {user && commentmore.userid == user.uid ? <div className="column2 mypostcommentrow2">
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
                onClick={() => edit(commentmore.commentid)}
                >
                    แก้ไขคอมเมนต์
                </a>
              </li> 
              <li className="li-mypostcommentmenusetting">
                <a
                  className="a-mypostcommentmenusetting"
                  onClick={() => deleted(commentmore.commentid)}
                >
                  {" "}
                  ลบคอมเมนต์{" "}
                </a>
              </li> 
            </ul>
          </div>
        </div>
      </div> : null }
    </div> : null  }
             
    
</div>

    )
}
export default Listcomment