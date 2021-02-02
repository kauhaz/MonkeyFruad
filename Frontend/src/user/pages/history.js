import React, { useEffect, useState ,useContext} from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom"

import Historyitem from "../components/historyitem"
import NavbarPage from "../components/navnew";
import "./history.css";
import usercontext from "../context/usercontext"
import Axios from "axios"
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";

const History = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(!isActive);
  }
  const [mypost,   Setmypost] = useState();
  const [error,   Seterror] = useState();
  // let { user , setUser} = useContext(usercontext)

  let user = auth.currentUser;
    
const ok =async () =>{
  try{
        const ok = await Axios.post("http://localhost:7000/post/postapi", {result:user})
        console.log(ok.data.item)
        Setmypost(ok.data.item)
  }catch(err){
      console.log("error")
  }
}
useEffect(() => {
ok()

}, [user])    

  return (
  
    <div>
      <NavbarPage />
      <h1 className="h1-history">ประวัติการโพสต์</h1>
      <div className="container-history5">{mypost ? <h2 className="h2-history2">ทั้งหมด {mypost.length} โพสต์</h2> : null}</div>
      {mypost ? mypost.map((ok,index) =>{
        return (
          <Historyitem ok={ok} user={user} key={index} />
        )
      }) : null}
    
    <Chatbot/>
    </div>
  );
};

export default History;