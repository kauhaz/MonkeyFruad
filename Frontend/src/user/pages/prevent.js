import React , { useState} from "react";
import NavbarPage from "../components/navnew";
import Chatbot from "../components/chatbot";
import "./prevent.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Prevent = () => {
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  return (
    <div className="bg-prevent-page" onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="h1-prevent">รู้ไว้ไม่โดนโกง</div>
      <div className="container-prevent ">
        <div className="row-prevent">
          <div className="column-prevent">
            <img src="/img/prevent1.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ซื้อสินค้าออนไลน์แล้วไม่ได้รับสินค้าตามกำหนด
              <span className="text-none-prevent textwhite-prevent"></span>
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
              <span className="text-none-prevent textwhite-prevent"></span>
            </div>
          </div>
        </div>

        <div className="row-prevent2">
          <div className="column-prevent2-1">
            <img src="/img/emty.png" className="image1-prevent1" />
          </div>
          <div className="column-prevent2 column-prevent2-l">
            <img src="/img/prevent6.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ปลอม SMS จากธนาคารเพื่อหลอกโอนเงิน หรือหลอกว่าให้โอนเงินคืน
              เพราะโอนเงินเกิน
            </div>
          </div>
          <div className="column-prevent2 column-prevent2-r">
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
          <div className="column-prevent column-prevent3-1">
            <img src="/img/prevent4.png" className="image1-prevent" />
            <div className="text-content-prevent">
              เปลี่ยนชื่อและเบอร์โทรฯไม่ซ้ำกัน
            </div>
          </div>
          <div className="column-prevent column-prevent3-2">
            <img src="/img/prevent5.png" className="image1-prevent" />
            <div className="text-content-prevent">
              นัดเจอเพื่อรับของก่อนแล้วโอนทีหลัง
            </div>
          </div>
          <div className="column-prevent column-prevent3-3">
            <img src="/img/prevent8.png" className="image1-prevent" />
            <div className="text-content-prevent">
              ขายสินค้าถูกกว่าท้องตลาดเกินไป
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Prevent;
