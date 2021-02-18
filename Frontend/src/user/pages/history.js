import React, { useEffect, useState, useContext } from "react";
import Historyitem from "../components/historyitem";
import NavbarPage from "../components/navnew";
import "./history.css";
import usercontext from "../context/usercontext";
import Axios from "axios";
import Chatbot from "../components/chatbot";
const { v4: uuidv4 } = require("uuid");

const History = () => {
  const [mypost, Setmypost] = useState();
  const [click, Setclick] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  let { user} = useContext(usercontext);
  let uuid = uuidv4();
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const ok = async () => {
    try {
      const ok = await Axios.post("http://localhost:7000/post/postapi", {
        result: user,
      });
      Setmypost(ok.data.item);
    } catch (err) {
      console.log("error");
    }
  };
  const handledeletetorerender = async () => {
    Setclick(uuid);
  };
  useEffect(() => {
    ok();
  }, [click]);
  console.log(mypost);

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-history">ประวัติการโพสต์</h1>
      <div className="container-history5">
        {mypost ? (
          <h2 className="h2-history">ทั้งหมด {mypost.length} โพสต์</h2>
        ) : null}
      </div>
      {mypost
        ? mypost.map((ok, index) => {
            return (
              <Historyitem
                ok={ok}
                user={user}
                key={index}
                handledeletetorerender={handledeletetorerender}
              />
            );
          })
        : null}

      <Chatbot />
    </div>
  );
};

export default History;
