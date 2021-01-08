import React from "react";
import Navbar from "../components/navbar";
import Chatbot from "../components/chatbot";
import "./prevent.css";
import {Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Prevent = () => {
  return (
    <div>
      <Navbar />
      <h1>รู้ไว้ไม่โดนโกง</h1>
      <div className="container-prevent">
          <div className="a1 a1-left">
            <img src="/prevent1.png" className="image1" />
            <p className="text-content">ซื้อสินค้าออนไลน์แล้ว<br className="br"/>ไม่ได้รับสินค้าตามกำหนด</p>
          </div>
          <div className="a1 a1-right">
            <img src="/prevent2.png" className="image1" />
            <p className="text-content">ล่อลวงให้โอนเงินค่าสินค้าล่วงหน้า<br className="br"/>โดยไม่มีหลักฐานที่น่าเชื่อถือเพียงพอ</p>
          </div>
          <div className="a1">
            <img src="/prevent3.png" className="image1" />
            <p className="text-content">เมื่อโอนเงินแล้วผู้ขายจะหายตัวไป<br className="br"/>ปิดช่องทางการติดต่อทุกทาง<p className="text-none textwhite">a<br/></p></p>
          </div>
          <div className="b1 b1-left">
            <img src="/prevent6.png" className="image1" />
            <p className="text-content">ปลอม SMS จากธนาคารเพื่อ<br className="br"/>หลอกโอนเงิน หรือหลอกว่าให้<br className="br"/>โอนเงินคืน เพราะโอนเงินเกิน</p>
          </div>
          <div className="b1 b1-right">
            <img src="/prevent7.png" className="image1" />
            <p className="text-content">อ้างว่า เว็บซื้อขายสินค้า เป็นคนกลาง<br className="br"/>ในการซื้อขายสินค้า ให้เหยื่อติดต่อ<br className="br"/>รับเงินจากคืนเว็บไซต์เอง</p>
          </div>
          <div className="a1">
            <img src="/prevent4.png" className="image1" />
            <p className="text-content">เปลี่ยนชื่อและเบอร์โทรฯ <br className="text-none2"/> ไม่ซ้ำกัน<p className="text-none textwhite"><br/>a<br/><br className="text-none3"/></p></p>
          </div>
          <div className="a1">
            <img src="/prevent5.png" className="image1" />
            <p className="text-content">นัดเจอเพื่อรับของก่อนแล้วโอนทีหลัง</p>
          </div>
          <div className="a1">
            <img src="/prevent8.png" className="image1" />
            <p className="text-content">ขายสินค้าถูกกว่าท้องตลาดเกินไป</p>
          </div>
        </div>
       <Chatbot/>
      </div>
      

  );
};

export default Prevent;
