import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Chatbot from "../components/chatbot";
import "./helpnew.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarPage from "../components/navnew";
const Helpnew = () => {
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  return (
    <div className="page" onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="h1-helpnew">ทำอย่างไรเมื่อโดนโกง</div>
      <div className="container-helpnew">
        <div className="row-helpnew1">
          <div className="column-helpnew">
            <Card className="card-helpnew">
            <img src="/img/help1.png" className="image-helpnew1" />
              <Card.Body>
                <div className="title-helpnew">
                  ขั้นตอนที่ 1{" "}
                  <span className="titlered-helpnew">รวบรวมหลักฐาน</span>
                </div>
                <div className="cardtext-helpnew">
                  โดยต้องเตรียมหลักฐานดังนี้
                  <li>รูปโปรไฟล์ของคนร้าย</li>
                  <li>ชื่อ เลขที่บัญชีคนร้าย</li>
                  <li>หลักฐานการโอนเงินเข้าบัญชี</li>
                  <li>สมุดบัญชีธนาคาร</li>
                  <li>สำเนาบัตรประชาชนของตัวเอง</li>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew">
            <Card className="card-helpnew">
            <img src="img/help2.png" className="image-helpnew1" />
              <Card.Body>
                <div className="title-helpnew">
                  ขั้นตอนที่ 2{" "}
                  <span className="titlered-helpnew">แจ้งความ</span>
                </div>
                <div className="cardtext-helpnew">
                  นำหลักฐานทั้งหมดเข้าแจ้งความที่สถานีตำรวจในท้องที่เกิดเหตุ
                  ภายใน3เดือนตั้งแต่วันที่รู้ว่าถูกโกง
                  โดยระบุว่าต้องการดำเนินคดีจนกว่าจะถึงที่สุดไม่ใช่แค่ลงบันทึกประจำวัน
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew">
            <Card className="card-helpnew">
            <img src="/img/help3.png" className="image-helpnew1" />
              <Card.Body>
                <div className="title-helpnew">
                  ขั้นตอนที่ 3{" "}
                  <span className="titlered-helpnew">ติดต่อธนาคาร</span>
                </div>
                <div className="cardtext-helpnew">
                  โดยต้องเตรียมเอกสารดังนี้
                  <li>เอกสารหนังสือแจ้งความตัวจริง</li>
                  <li>เอกสาร ใบสำเนาบันทึกประจำวัน</li>
                  <li>Statement ที่มีการโอนเงิน</li>
                  <li>หมายเลขบัญชีของคนร้าย</li>
                  <li>หลักฐานที่ถูกโกง</li>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew">
            <Card className="card-helpnew">
            <img src="/img/help4.png" className="image-helpnew1" />
              <Card.Body>
                <div className="title-helpnew">
                  ขั้นตอนที่ 4{" "}
                  <span className="titlered-helpnew">ธนาคารอายัดบัญชี</span>
                  <span className="titlered-helpnew textmargin-helpnew">
                    คนร้าย
                  </span>
                </div>
                <div className="cardtext-helpnew">
                  หลังจากที่ส่งเรื่องให้ธนาคารแล้ว
                  ธนาคารจะดำเนินการอายัดบัญชีปลายทาง
                  และตรวจสอบข้อมูลก่อนจะพิจารณาการคืนเงิน
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="h1-helpnew2">
        หน่วยงานที่ให้ความช่วยเหลือที่เกี่ยวข้องเมื่อถูกโกง
      </div>
      <div className="container-helpnew2">
        <div className="row-helpnew2">
          <div className="column-helpnew2">
            <img src="/img/canhelp5.png" className="image-helpnew2" />
            
            <Card className="card-helpnew2">
              <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  สำนักงานคณะกรรมการอาหารและยา{" "}
                  <span className="textnone2-helpnew">(อย.)</span>
                  <br />
                  โทร 1556
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew2">
            <img src="/img/canhelp2.png" className="image-helpnew2" />
            <Card className="card-helpnew2">
            <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  กองบังคับการปราบปรามการกระทำผิด
                  <br />
                  เกี่ยวกับอาชญากรรมทางเทคโนโลยี
                  <br />
                  โทร 02 142 2556
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew2">
            <img src="/img/canhelp3.png" className="image-helpnew2" />
            <Card className="card-helpnew2">
            <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  สำนักงานคณะกรรมการคุ้มครองผู้บริโภค
                  <br />
                  โทร 02 143 9774
                  <br />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row-helpnew2">
          <div className="column-helpnew2">
            <img src="/img/canhelp4.png" className="image-helpnew2" />
            <Card className="card-helpnew2">
            <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  กรมพัฒนาธุรกิจการค้า (DBD)
                  <br />
                  โทร 02 528 7600
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew2">
            <img src="/img/canhelp1.png" className="image-helpnew2" />
            <Card className="card-helpnew2">
            <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์
                  <br />
                  โทร 1212
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-helpnew2">
            <img src="/img/canhelp6.png" className="image-helpnew2" />
            <Card className="card-helpnew2">
            <div className="emty-help"></div>
              <Card.Body>
                <div className="text-helpnew">
                  กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม
                  <br />
                  โทร 02 141 6747
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Helpnew;
