import React from 'react'
import {Link} from "react-router-dom" 
import NavbarPage from "./navnew"
import "./Notfound.css"
import Chatbot from "./chatbot";

const Notfound = ({search , SetshowDropdown,showDropdown }) => {
    return (
        <div>

          <NavbarPage  SetshowDropdown={SetshowDropdown}
            showDropdown={showDropdown}/>
          <h1>คำที่คุณค้นหา  "{search}"  ไม่ตรงกับผลลัพธ์ใด ๆ</h1>
        </div>
        

    
    )
}

export default Notfound
