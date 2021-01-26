import React, { useEffect, useState } from "react";
import { Card , Button } from 'react-bootstrap';
import Chatbot from "../components/chatbot";
import "./help.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPage from "../components/navnew";
const Help = () => {
  return (
    <div className="page">
      <NavbarPage />
      <div className="h1-help">ทำอย่างไรเมื่อโดนโกง</div>
      <div className="container-help">
        <div className="row-help1">
          <div className="column-help">
            <Card className="card-help card-help-left">
              <Card.Img variant="top" src="/img/help1.png" className="image-help1"/>
              <Card.Body>
                <div className="title-help">ขั้นตอนที่ 1 <span className="textred-help">รวบรวมหลักฐาน</span></div>
                <div className="cardtext-help">
                <li>รูปโปรไฟล์ของ<span className="span-help-2">คนร้าย</span><span className="normal-help">คนร้าย</span></li> 
                <li>ชื่อ เลขที่บัญชี<span className="span-help-2">คนร้าย</span><span className="normal-help">คนร้าย</span></li>
                <li>หลักฐานการโอน<span className="span-help-2">เงินเข้าบัญชี</span><span className="normal-help1">เงิน</span><span className="span-help-3">เข้าบัญชี</span><span className="normal-help">เงินเข้าบัญชี</span></li>
                <li>สมุดบัญชีธนาคาร</li>
                <li>สำเนาบัตร<span className="span-help-2">ประชาชน</span><span className="normal-help1">ประชาชน</span><span className="span-help">ของตนเอง</span><span className="normal-help">ประชาชนของตัวเอง</span></li>
                <span className="textwhite-help">a</span> 
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-help">
            <Card className="card-help">
              <Card.Img variant="top" src="/img/help2.png" className="image-help1" />
              <Card.Body>
                <div className="title-help">ขั้นตอนที่ 2 <span className="textred-help">แจ้งความ</span></div>
                <div className="cardtext-help">
                  นำหลักฐานทั้งหมดเข้าแจ้งความที่สถานีตำรวจในท้องที่เกิดเหตุ
                  ภายใน3เดือนตั้งแต่วันที่รู้ว่าถูกโกง โดยระบุว่าต้องการดำเนินคดีจนกว่าจะถึงที่สุดไม่ใช่แค่ลงบันทึกประจำวัน
                  <br/> <span className="textwhite-help show-help">a</span> 
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-help">
            <Card className="card-help card-help-left">
              <Card.Img variant="top" src="/img/help3.png" className="image-help1" />
              <Card.Body>
                <div className="title-help">ขั้นตอนที่ 3 <span className="textred-help">ติดต่อธนาคาร</span></div>
                <div className="cardtext-help">
                โดยต้องเตรียมเอกสารดังนี้
                <li>เอกสารหนังสือ<span className="span-help-2">แจ้งความตัวจริง</span><span className="normal-help1">แจ้ง</span><span className="span-help-3">ความตัวจริง</span><span className="normal-help">แจ้งความตัวจริง</span></li> 
                <li>เอกสาร ใบสำเนา<span className="span-help-2">บันทึกประจำวัน</span><span className="normal-help1">บันทึก</span><span className="span-help-3">ประจำวัน</span><span className="normal-help">บันทึกประจำวัน</span></li>
                <li>statement <span className="span-help">ที่มีการโอนเงิน</span><span className="normal-help">ที่มีการโอนเงิน</span></li>
                <li>หมายเลขบัญชี<span className="span-help">ของคนร้าย</span><span className="normal-help">ของคนร้าย</span></li>
                <li>หลักฐานที่ถูกโกง</li>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="column-help">
            <Card className="card-help">
              <Card.Img variant="top" src="/img/help4.png" className="image-help1" />
              <Card.Body>
                <div className="title-help">ขั้นตอนที่ 4 <span className="textred-help">ธนาคารอายัดบัญชี</span>
                                      <span className="textred2">คนร้าย</span></div>
                <div className="cardtext-help">
                หลังจากที่ส่งเรื่องให้ธนาคารแล้ว ธนาคารจะดำเนินการอายัดบัญชีปลายทาง และตรวจสอบข้อมูลก่อนจะพิจารณาการคืนเงิน
                <span className="textwhite-help show-help2"><br/>a</span> 
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="h1-help2">หน่วยงานที่ให้ความช่วยเหลือที่เกี่ยวข้องเมื่อถูกโกง</div>
        <div className="emty-help"></div>
        <div className="row-help">
          <div className="column-help"> 
          <Card className="card-help2 card-help2-left">
              <Card.Body>
                <div className="text-help"><span className="textwhite-help">a</span><br/><span className="textwhite-help"><br/>a</span><br/>
                  สำนักงานคณะกรรมการอาหารและยา (อย.)<br/>โทร 1556<br/>
                <span className="textwhite-help">a</span> </div>
              </Card.Body>
            </Card>   
            <img src="/img/canhelp5.png" className="image-help2 image-help2-1" />  
          </div>
          <div className="column-help">
            <Card className="card-help2">
              <Card.Body>
                <div className="text-help"><span className="textwhite-help">a</span><br/><span className="textwhite-help"><br/>a</span><br/>
                  กองบังคับการปราบปรามการกระทำผิด<br/>เกี่ยวกับอาชญากรรมทางเทคโนโลยี<br/>โทร 02 142 2556</div>
              </Card.Body>
            </Card> 
            <img src="/img/canhelp2.png" className="image-help2 image-help2-2" />  
          </div>
          <div className="column-help">
            <Card className="card-help2">
              <Card.Body>
                <div className="text-help"><span className="textwhite-help">a</span><br/><span className="textwhite-help"><br/>a</span><br/>
                  สำนักงานคณะกรรมการคุ้มครองผู้บริโภค<br/>โทร 02 143 9774<br/>
                <span className="textwhite-help">a</span> </div>
              </Card.Body>
            </Card>
            <img src="/img/canhelp3.png" className="image-help2 image-help2-left" />  
          </div>
        </div>
        <div className="row-help">
          <div className="column-help left-help">
            <Card className="card-help2 card-help2-right">
                <Card.Body>
                  <div className="text-help"><span className="textwhite-help">a</span><br/><span className="textwhite-help"><br/>a</span><br/>
                    กรมพัฒนาธุรกิจการค้า (DBD)<br/>โทร 02 528 7600<br/>
                  <span className="textwhite-help">a</span><br/></div>
                </Card.Body>
              </Card>
            <img src="/img/canhelp4.png" className="image-help3 image-help3-left" /> 
          </div>
          <div className="column-help right-help">
            <Card className="card-help2 card-help2-center">
                <Card.Body>
                  <div className="text-help"><span className="textwhite-help">a</span><br/><span className="textwhite-help"><br/>a</span><br/>
                  สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์<br/>โทร 1212<br/>
                  <span className="textwhite-help">a</span><br/></div>
                </Card.Body>
            </Card>
            <img src="/img/canhelp1.png" className="image-help3 image-help3-right" />
          </div>
        </div>
      </div>
      <div>
      </div>
      <Chatbot/>
    </div>
  );
};

export default Help;