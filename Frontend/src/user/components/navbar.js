import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Usernvabar = () => {
  return (
    <div>
      <nav>
        <Link to="/">หน้าแรก</Link>

        <div class="dropdown">
          <button class="dropbtn">โพสต์</button>
          <div class="dropdown-content">
            <Link to="/post">โพสต์ทั้งหมด</Link>
            <Link to="/post/create">สร้างโพสต์</Link>
          </div>
        </div>

        <Link to="/ranking">จัดอันดับ</Link>

        <div class="dropdown">
          <button class="dropbtn">ช่วยเหลือ</button>
          <div class="dropdown-content">
            <Link to="/prevent">รู้ไว้ไม่โดนโกง</Link>
            <Link to="/help">ช่องทางการช่วยเหลือ</Link>
          </div>
        </div>

        <Link to="/contractus">ติดต่อเรา</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
};
export default Usernvabar;
