import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const Login = () => {
  // return (
  //   <div>
  //     <Navbar />
  //     <h1>login</h1>
  //   </div>
  // );

// ตัวอย่างจากหนังสือ

  // const myName = 'Bawornsak';
  // return (
  //   <div className="App">
  //     <p>ชื่อของผมคือ: { myName } </p>
  //   </div>
  // );

  let data01 = 20;
  let data02 = 15;
  return (
    <div className="App">
      <p>ผลลัพธ์จากการบวก คือ {data01 + data02} </p>
    </div>
  );
  
  
}

export default Login;
