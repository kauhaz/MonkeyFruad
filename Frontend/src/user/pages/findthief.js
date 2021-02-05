
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Formpost from "../components/formpost";
import NavbarPage from "../components/navnew";
import Axios from "axios"
import Post from "./post"


const Findthief = () => {
  
    const  { uid } =  useParams()
    const [show, Setshow] = useState()

    const ok = async () => {
          
        const getpost = await Axios.get(`http://localhost:7000/thief/post/${uid}`);
        Setshow(getpost.data.item);

      };

      useEffect(() => {
        ok();
      }, []);
    
  
  return (
    <div className="allpage">
        {show ? show.map(show =>{
            return (<div>
                 <Post show={show}/>
            </div>)
        }) : null}
       
     
    </div>
  );
};

export default Findthief;
