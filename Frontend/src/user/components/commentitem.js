import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./commentitem.css";
import usercontext from "../context/usercontext";
import Listcomment from "./listcomment"



const Commentitem = ({   postid}) => {

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  let { user, setUser } = useContext(usercontext);
  const [commentid , Setcommentid] = useState()
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

  const gg = async () => {
    try {
      // Settextcomment(commentid.textcomment)
      // Setcomment(commentid)

      const editcomment = await Axios.get(`http://localhost:7000/post/comment/${postid}` )
      Setcommentid(editcomment.data.item)
    } catch (err) {
      console.log(err);
    }

  };
  useEffect(() => {
    gg();
  }, []);
 console.log(commentid)
  
  return (
      <div>

      {commentid ? commentid.map(commentid =>{
          return (
       
                 <Listcomment  commentid={commentid}/> 
            
          )
      }): null}
      
    </div> 
  );
};

export default Commentitem;


 