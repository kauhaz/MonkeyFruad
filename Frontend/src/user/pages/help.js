import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Card , Button } from 'react-bootstrap';
import "./help.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const Help = () => {
  return (
    <div className="page">
      <Navbar />
      <h1>ทำอย่างไรเมื่อโดนโกง</h1>
      <div className="container-help">
        <div className="row">
          <div className="column">
            <Card className="card">
              <Card.Img variant="top" src="/help1.png" className="image"/>
              <Card.Body>
                <Card.Title>ขั้นตอนที่ 1 <span className="textred">รวบรวมหลักฐาน</span></Card.Title>
                <Card.Text className="cardtext">
                <li>รูปโปรไฟล์ของคนร้าย</li> 
                <li>ชื่อ เลขที่บัญชีคนร้าย</li>
                <li>หลักฐานการโอนเงินเข้าบัญชี </li>
                <li>สมุดบัญชีธนาคาร</li>
                <li>สำเนาบัตรประชาชนของตนเอง</li>
                <span className="textwhite">a</span> 
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="column">
            <Card className="card">
              <Card.Img variant="top" src="/help2.png" className="image" />
              <Card.Body>
                <Card.Title>ขั้นตอนที่ 2 <span className="textred">แจ้งความ</span></Card.Title>
                <Card.Text className="cardtext">
                  นำหลักฐานทั้งหมดเข้าแจ้งความที่สถานีตำรวจในท้องที่เกิดเหตุ
                  ภายใน3เดือนตั้งแต่วันที่รู้ว่าถูกโกง <br/>โดยระบุว่าต้องการดำเนินคดีจนกว่าจะถึงที่สุดไม่ใช่แค่ลงบันทึกประจำวัน
                  <br/> <span className="textwhite">a</span> 
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="column">
            <Card className="card">
              <Card.Img variant="top" src="/help3.png" className="image" />
              <Card.Body>
                <Card.Title>ขั้นตอนที่ 3 <span className="textred">ติดต่อธนาคาร</span></Card.Title>
                <Card.Text className="cardtext">
                โดยต้องเตรียมเอกสารดังนี้
                <li>เอกสารหนังสือแจ้งความตัวจริง</li> 
                <li>เอกสาร ใบสำเนาบันทึกประจำวัน</li>
                <li>statement ที่มีการโอนเงิน</li>
                <li>หมายเลขบัญชีของคนร้าย</li>
                <li>หลักฐานที่ถูกโกง</li>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="column">
            <Card className="card">
              <Card.Img variant="top" src="/help4.png" className="image" />
              <Card.Body>
                <Card.Title>ขั้นตอนที่ 4 <span className="textred">ธนาคารอายัดบัญชี</span>
                                      <span className="textred2">คนร้าย</span></Card.Title>
                <Card.Text className="cardtext">
                หลังจากที่ส่งเรื่องให้ธนาคารแล้ว ธนาคารจะดำเนินการอายัดบัญชีปลายทาง และตรวจสอบข้อมูลก่อนจะพิจารณาการคืนเงิน
                <br/> <span className="textwhite">a</span> 
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <h1>หน่วยงานที่ให้ความช่วยเหลือที่เกี่ยวข้องเมื่อถูกโกง</h1>
        <div className="emty"></div>
        <div className="row">
          <div className="column"> 
          <Card className="card2">
              <Card.Body>
                <Card.Text className="text"><span className="textwhite">a</span><br/><span className="textwhite">a</span><br/>
                  สำนักงานคณะกรรมการอาหารและยา (อย.)<br/>โทร 1556<br/>
                <span className="textwhite">a</span> </Card.Text>
              </Card.Body>
            </Card>   
            <img src="/canhelp5.png" className="image2" />  
          </div>
          <div className="column">
            <Card className="card2">
              <Card.Body>
                <Card.Text className="text"><span className="textwhite">a</span><br/><span className="textwhite">a</span><br/>
                  กองบังคับการปราบปรามการกระทำผิด<br/>เกี่ยวกับอาชญากรรมทางเทคโนโลยี<br/>โทร 02 142 2556</Card.Text>
              </Card.Body>
            </Card> 
            <img src="/canhelp2.png" className="image2" />  
          </div>
          <div className="column">
            <Card className="card2">
              <Card.Body>
                <Card.Text className="text"><span className="textwhite">a</span><br/><span className="textwhite">a</span><br/>
                  สำนักงานคณะกรรมการคุ้มครองผู้บริโภค<br/>โทร 02 143 9774<br/>
                <span className="textwhite">a</span> </Card.Text>
              </Card.Body>
            </Card>
            <img src="/canhelp3.png" className="image2" />  
          </div>
        </div>
        <div className="row">
          <div className="column left">
            <Card className="card2">
                <Card.Body>
                  <Card.Text className="text"><span className="textwhite">a</span><br/><span className="textwhite">a</span><br/>
                    กรมพัฒนาธุรกิจการค้า (DBD)<br/>โทร 02 528 7600<br/>
                  <span className="textwhite">a</span><br/></Card.Text>
                </Card.Body>
              </Card>
            <img src="/canhelp4.png" className="image2" /> 
          </div>
          <div className="column right">
            <Card className="card2">
                <Card.Body>
                  <Card.Text className="text"><span className="textwhite">a</span><br/><span className="textwhite">a</span><br/>
                  สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์<br/>โทร 1212<br/>
                  <span className="textwhite">a</span><br/></Card.Text>
                </Card.Body>
            </Card>
            <img src="/canhelp1.png" className="image2" />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Help;
