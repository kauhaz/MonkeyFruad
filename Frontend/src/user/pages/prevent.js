import React from "react";
import Navbar from "../components/navbar";
import Chatbot from "../components/chatbot";
import "./prevent.css";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Prevent = () => {
  return (
    <div>
      <Navbar />
      <div className="h1-prevent">รู้ไว้ไม่โดนโกง</div>
      <div className="container-prevent">
        <div className="row-prevent">
          <div className="column-prevent">
            <img src="/img/prevent1.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ซื้อสินค้าออนไลน์แล้วไม่ได้รับสินค้าตามกำหนด
              <span className="text-none-prevent textwhite-prevent">
                <br />a<br />
              </span>
            </div>
          </div>
          <div className="column-prevent">
            <img src="/img/prevent2.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ล่อลวงให้โอนเงินค่าสินค้าล่วงหน้าโดยไม่มีหลักฐานที่น่าเชื่อถือเพียงพอ
            </div>
          </div>
          <div className="column-prevent">
            <img src="/img/prevent3.png" className="image1-prevent" />
            <div className="text-content-prevent">
              เมื่อโอนเงินแล้วผู้ขายจะหายตัวไปปิดช่องทางการติดต่อทุกทาง
              <span className="text-none-prevent textwhite-prevent">
                <br />a
              </span>
            </div>
          </div>
        </div>

        <div className="row-prevent2">
          <div className="column-prevent2-1">
            <img src="/img/emty.png" className="image1-prevent1" />
          </div>
          <div className="column-prevent2">
            <img src="/img/prevent6.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ปลอม SMS จากธนาคารเพื่อหลอกโอนเงิน หรือหลอกว่าให้โอนเงินคืน
              เพราะโอนเงินเกิน
            </div>
          </div>
          <div className="column-prevent2">
            <img src="/img/prevent7.png" className="image1-prevent" />
            <div className="text-content-prevent">
              อ้างว่าเป็นคนกลางในการซื้อขายสินค้า
              ให้เหยื่อทำเรื่องขอเงินคืนจากร้านต้นทางด้วยตนเอง
            </div>
          </div>
          <div className="column-prevent2-1">
            <img src="/img/emty.png" className="image1-prevent1" />
          </div>
        </div>

        <div className="row-prevent">
          <div className="column-prevent">
            <img src="/img/prevent4.png" className="image1-prevent" />
            <div className="text-content-prevent">
              เปลี่ยนชื่อและเบอร์โทรฯ{" "}
              <span className="br-prevent">
                <br />
              </span>
              ไม่ซ้ำกัน<span className="show-prevent">a</span>
            </div>
          </div>
          <div className="column-prevent">
            <img src="/img/prevent5.png" className="image1-prevent" />
            <div className="text-content-prevent">
              นัดเจอเพื่อรับของก่อน
              <span className="br-prevent">
                <br />
              </span>
              แล้วโอนทีหลัง
            </div>
          </div>
          <div className="column-prevent">
            <img src="/img/prevent8.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ขายสินค้าถูกกว่า
              <span className="br-prevent">
                <br />
              </span>
              ท้องตลาดเกินไป
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Prevent;
