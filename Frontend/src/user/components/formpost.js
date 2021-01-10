import React, { useState } from "react";
import { Form, Col, Button, Image, roundedCircle } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formpost.css";
const Formpost = () => {

  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  
  const [imagesFile, setImagesFile] = useState([]); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState("/img/profile.png"); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [id, setId] = useState();
  const [accountnumber, setAccountnumber] = useState();
  const [nameproduct, setNameproduct] = useState();
  const [productcategory, setProductcategory] = useState();
  const [money, setMoney] = useState();
  const [bank, setBank] = useState();
  const [datetime, setDatetime] = useState();
  const [social, setSocial] = useState();
  const [other, setOther] = useState();
 
  const ImageHoverZoom = ({ imagePreviewUrl }) => {
    
  }

  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {  
  
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onload = (event) => {
      setImagesProfile(event.target.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
    };

  };

// ฟังก์ชันอัพโหลดไฟล์ 
  const FileUpload = (event) => { 
   
    setImagesFile([]); // reset state รูป เพื่อกันในกรณีที่กดเลือกไฟล์ซ้ำแล้วรูปต่อกันจากอันเดิม
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล

    //ทำการวนข้อมูลภายใน Array
    for (var i = 0; i < files.length; i++) {
      let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
      reader.readAsDataURL(files[i]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
      reader.onload = (event) => {
        // ใส่ข้อมูลเข้าไปยัง state ผาน  setimagesPreviewUrls
        setImagesFile((prevState) => [...prevState, event.target.result]);
        //  PrevState เป็น Parameter ในการเรียก State ก่อนหน้ามาแล้วรวม Array กับ fileที่อัพโหลดเข้ามา
      };
    }
  };
  
  return (
    <div className="container-formpost">
      <div className="container-formpost1">
        <div className="profile-badformpost-img">
          <img className="img-circle" src={imagesProfile} />
          <div className="rank-label-container">
            <span className="label label-default rank-label">
              <div className="formpost-ImageUpload">
                <label htmlFor="FileInput">
                  <div className="fileinput">
                    <img className="uploadiconprofile" src="/img/edit.png" />
                  </div>
                </label>
                <div className="buttoninputprofile">
                  <input
                    className="uploadinputprofile"
                    id="FileInput"
                    type="file"
                    onChange={ProfileChange}
                    multiple
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <Form className="formsize-formpost">
          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridName"
            >
              <Form.Label>
                ชื่อ (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="name" placeholder="" onChange={(event)=>{
                setName(event.target.value)
              }} required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label>
                นามสกุล (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="lastname" placeholder="" required onChange={(event)=>{
                setSurname(event.target.value)
              }} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridId"
            >
              <Form.Label>
                เลขบัตรประชาชน (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="id" placeholder="" required onChange={(event)=>{
                setId(event.target.value)
              }} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label>
                เลขที่บัญชี (ผู้โกง)<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="accountnumber" placeholder="" required onChange={(event)=>{
                setAccountnumber(event.target.value)
              }} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridNameproduct"
            >
              <Form.Label>
                ชื่อสินค้า<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="nameproduct" placeholder="" required  onChange={(event)=>{
                setNameproduct(event.target.value)
              }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                หมวดหมู่สินค้า<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required onChange={(event)=>{
                setProductcategory(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>แฟชั่น</option>
                <option>ออนไลน์</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridPrice"
            >
              <Form.Label>
                จำนวนเงิน (บาท)<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="nameproduct" placeholder="" required onChange={(event)=>{
                setMoney(event.target.value)
              }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>
                ธนาคาร<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required onChange={(event)=>{
                setBank(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>ธนาคารกรุงเทพ</option>
                <option>ธนาคารกรุงไทย</option>
                <option>ธนาคารกรุงศรีอยุธยา</option>
                <option>ธนาคารกสิกรไทย</option>
                <option>ธนาคารเกียรตินาคิน</option>
                <option>ธนาคารซีไอเอ็มบีไทย</option>
                <option>ธนาคารทหารไทย</option>
                <option>ธนาคารทิสโก้</option>
                <option>ธนาคารไทยพาณิชย์</option>
                <option>ธนาคารธนชาต</option>
                <option>ธนาคารนครหลวงไทย</option>
                <option>ธนาคารยูโอบี</option>
                <option>ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
                <option>ธนาคารไอซีบีซี</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formpost-left col-lg-6 col-12"
              controlId="formGridDate"
            >
              <Form.Label>
                วันที่โดนโกง<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control type="datetime-local" placeholder="" required  onChange={(event)=>{
                setDatetime(event.target.value)
              }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label>
                ช่องทางที่โดนโกง<span className="spanformpost">*</span>
              </Form.Label>
              <Form.Control as="select" defaultValue="Choose..." required onChange={(event)=>{
                setSocial(event.target.value)
              }}>
                <option>เลือก...</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Line</option>
                <option>Website</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(event)=>{
                setOther(event.target.value)
              }} />
          </Form.Group>

          <Form.File.Label>
            <span className="spanformpost">
              **กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ
              (แชท)
            </span>
          </Form.File.Label>

          <input
            className="uploadsformpostuploadslip"
            type="file"
            onChange={FileUpload}
            multiple
          />
          <div className="container-img-holder-imgpreview">
            {imagesFile.map((imagePreviewUrl) => {
              return (
                <img
                  key={imagePreviewUrl}
                  className="imgpreview"
                  alt="previewImg"
                  src={imagePreviewUrl}
                  style={{ overflow: "hidden" }}
                  onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                  onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                />
              );
            })}
          </div>

          <Form.Row className="linkrule1">
            <Form.Check aria-label="option 1" className="linkrule2"/><a className="linkrule3" href="about.html">ยอมรับข้อตกลง</a>
          </Form.Row>

          <a className="buttonformpost" type="submit" href="/post/mypost">
            โพสต์
          </a>
        </Form>
      </div>
    </div>
  );
};

export default Formpost;
