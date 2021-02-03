import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./commentitem.css";
import usercontext from "../context/usercontext";
import Listcomment from "./listcomment"
import _ from "lodash"



const Commentitem = ({   postid  }) => {

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  let { user, setUser } = useContext(usercontext);
  const [comment , Setcomment] = useState()
  const [commentmore , Setcommentmore] = useState()
  const [showcommentall , Setshowcommentall] = useState()
  const [item , Setitem] = useState([])
  const [checkedittext , Setcheckedittext] = useState(false)
  // const [edittextcomment , Setedittextcomment] = useState()
  const [data, Setdata] = useState();
  const [show, Setshow] = useState();

  const [textcomment, Settextcomment] = useState();
  const [photo,  Setphoto] = useState();
  

    

  const deleted = async (commentid) => {
      const postdelete = await Axios.post(`http://localhost:7000/post/delete/comment/${commentid}`);
      window.location.reload(false);
  };
  const handlecomment = async () =>{
    try{
    
      console.log(postid)
      let sentdata = {textcomment , username : data[0].username , userid : user.uid , photoURL : photo}
      
      const sentcomment = await Axios.post(`http://localhost:7000/post/comment/${postid}`, sentdata)
     
      
    }catch(err){
      console.log(err)
    }
  }
 
   const handlemorecomment = async () =>{
    try{
      Setshowcommentall(true)

    }catch(err){
      console.log(err)
    }
  }
 
  console.log(comment)
  const gg = async () => {
    try {
      

      const getcommentall = await Axios.get(`http://localhost:7000/post/commentmore/${postid}` )
      Setcommentmore(getcommentall.data.item)

      const nameuser = await Axios.post("http://localhost:7000/user/userid", { result: user,});
      Setdata(nameuser.data.item);

      var profiledata = await Axios.post("http://localhost:7000/user/session", { user: user })
      Setphoto(profiledata.data.data.photoURL);

    } catch (err) {
      console.log(err);
    }

  };
  useEffect(() => {
    gg();
  }, []);
  

  
  return (
      <div>
        {showcommentall ? <div> {commentmore ? commentmore.map(commentmore =>{
return (
       <Listcomment  commentmore={commentmore} /> 
)
}) : null } </div> : <div>{commentmore ?  <div><Listcomment  commentmore={commentmore[0]}   />  <Listcomment  commentmore={commentmore[1]}   /> <Listcomment  commentmore={commentmore[2]}   /> </div>: null}</div>}
     
      
  {(commentmore && commentmore.length > 3) ? <button onClick={handlemorecomment} className="postother2">ดูอีก {commentmore.length - 3} ความคิดเห็น</button> : null}


  <div className="row post-comment-comments1">
                <div className="post-profilecomment-img1">
                  {photo ? <img className="img-circle" src={`${photo.url}`}  /> : <img className="img-circle" src="/img/profile.png" /> }
             
                </div>
                <div className="row post-comment-commentsall">
                  <div
                    className="post-writecommemt col-lg-6 col-10"
                    controlId="exampleForm.ControlTextarea1"
                  >
                     <input className="inputcomment" placeholder="เขียนความคิดเห็น..." value={textcomment} onChange={(e) =>{Settextcomment(e.target.value)}}/>
                  </div>

                          <div>
                            <div className="column2 mypostbuttonsend">
                              <button className="mypostbuttonsends" onClick={handlecomment}>
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                       
                          </div>
                </div>
                
              </div>
      
    </div> 
  );
};

export default Commentitem;


 