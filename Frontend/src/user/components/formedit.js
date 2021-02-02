import React, { useEffect, useState, Component , useContext } from "react";
import { Form, Col, FormControl } from "react-bootstrap";
import {useParams , useHistory } from "react-router-dom"
import {
  auth,
  googleProvider,
  facebookProvider,
  firestore
} from "../Frontfirebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formedit.css";
import Axios from "axios"
import _ from "lodash"
import Chatbot from "../components/chatbot";
import usercontext from "../context/usercontext"
// import image from "D:/PROJECT ALL/MonkeyFruad/Frontend/src/uploads/logo192.png"

const Formedit = () => {

  // เก็บ State ทุก Input เพื่อส่งไปหลังบ้าน
  const [show, Setshow] = useState();
  const [imagesFile, setImagesFile] = useState(); //สร้าง State เพื่อเก็บไฟล์ที่อัพโหลด
  const [imagesProfile, setImagesProfile] = useState(); //สร้าง State เพื่อเก็บรูปโปรไฟล์
  const [files, Setfiles] = useState();
  const [photo, Setphoto] = useState();
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
  const [other, setOther] = useState("");
  const [error, Seterror] = useState();
  // const [files, setfiles] = useState();
   

// console.log(files)
  const { uid } = useParams()
  // ฟังก์ชันเปลี่ยนรูปโปร
  const ProfileChange = (event) => {  
  
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setphoto(files[0])
    Seterror()
    let reader = new FileReader(); //ใช้ Class  FileReader เป็นตัวอ่านไฟล์
    reader.readAsDataURL(files[0]); //เป็นคำสั่งสำหรับการแปลง url มาเป็น file
    reader.onload = (event) => {
      setImagesProfile(event.target.result); // ใส่ข้อมูลเข้าไปยัง state ผาน setImagesProfile
    };

  };

// ฟังก์ชันอัพโหลดไฟล์ 
  const FileUpload = (event) => { 
    event.preventDefault(); // ใส่ไว้ไม่ให้ refresh หน้าเว็บ
    setImagesFile([]); // reset state รูป เพื่อกันในกรณีที่กดเลือกไฟล์ซ้ำแล้วรูปต่อกันจากอันเดิม
    let files = event.target.files; //ใช้เพื่อแสดงไฟลทั้งหมดที่กดเลือกไฟล
    Setfiles(files)
    Seterror()
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

  let history = useHistory()


  const ok = async () =>{
  
    const hello = await Axios.get(`http://localhost:7000/post/edit/${uid}`)
    
    let gethistory = hello.data.item
    console.log(show)
 
    Setshow(gethistory)
    setName(gethistory[0].name)
    setSurname(gethistory[0].surname)
    setId(gethistory[0].id)
    setAccountnumber(gethistory[0].accountnumber)
    setNameproduct(gethistory[0].nameproduct)
    setProductcategory(gethistory[0].productcategory)
    setMoney(gethistory[0].money)
    setBank(gethistory[0].bank)
    setDatetime(gethistory[0].datetime)
    setSocial(gethistory[0].social)
    setOther(gethistory[0].other)

  }


  useEffect(() => {
    ok()
}, [])


  const handlesubmit = async (e) =>{
    e.preventDefault()
    try{
    
      let formdata = new FormData()
      _.forEach(files , file => {
        formdata.append("eiei" ,file)
      })
      formdata.append("photo" , photo)
      formdata.append("name" , name)
      formdata.append("surname" , surname)
      formdata.append("id" , id)
      formdata.append("accountnumber" , accountnumber)
      formdata.append("nameproduct" , nameproduct)
      formdata.append("productcategory" , productcategory)
      formdata.append("money" , money)
      formdata.append("bank" , bank)
      formdata.append("datetime" , datetime)
      formdata.append("social" , social)
      formdata.append("other" , other)
      
      // let sentdata = {imagesFile,imagesProfile,name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other}
      let data = await Axios.post(`http://localhost:7000/post/edit/${uid}`,formdata)
      
      history.push(`/mypost/${uid}`)
    
    }catch(err){
      err && Seterror(err.response.data.msg)
    }
  }
  return (
    <div>
      {show ? show.map(ok=>{
        return (
          <div>
      <div className="container-formedit">
      <div className="container-formedit1">
        <div className="profile-badformedit-img">
          {imagesProfile ? <img className="img-circle" src={imagesProfile} /> : ok.resultfileitem ? <img className="img-circle" src={`${ok.resultfileitem.url}`} /> : <img className="img-circle" src={"/img/profile.png"} />}
          <div className="rank-label-container-edit">
            <span className="label label-default rank-label">
              <div className="formedit-ImageUpload">
                <label htmlFor="FileInput">
                  <div className="fileinputedit">
                    <img className="uploadiconprofileedit" src="/img/edit.png" />
                  </div>
                </label>
                <div className="buttoninputeditprofile">
                  <input
                    className="uploadinputeditprofile"
                    id="FileInput"
                    type="file"
                    onChange={ProfileChange}
                    accept="image/png, image/jpeg , image/jpg"
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
        <Form className="formsize-formedit" onSubmit={handlesubmit}>
          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridName"
            >
              <Form.Label className="text-formedit">
                ชื่อ (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>

              {show ? <Form.Control type="text" id="name" pattern="[a-z,ก-๛]{1,}" title="กรอกตัวหนังสือเท่านั้น" placeholder="" value={name} onChange={(event)=>{setName(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setName(event.target.value)}} required />} */}
              </Form.Group>

            <Form.Group as={Col} controlId="formGridLastname">
              <Form.Label className="text-formedit">
                นามสกุล (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="text" id="lastname" pattern="[a-z,ก-๛]{1,}" title="กรอกตัวหนังสือเท่านั้น" placeholder="" value={surname} onChange={(event)=>{setSurname(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setSurname(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridId"
            >
              <Form.Label className="text-formedit">
                เลขบัตรประชาชน (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="text" id="numberid" pattern="[0-9]{1,}" minlength="2" maxlength="13" title="กรอกตัวเลขเท่านั้น" placeholder="" value={id} onChange={(event)=>{setId(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setId(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccountnumber">
              <Form.Label className="text-formedit">
                เลขที่บัญชี (ผู้โกง)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="text" id="accountnumber" pattern="[0-9]{1,}" minlength="2" maxlength="10" title="กรอกตัวเลขเท่านั้น" placeholder="" value={accountnumber} onChange={(event)=>{setAccountnumber(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setAccountnumber(event.target.value)}} required />} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridNameproduct"
            >
              <Form.Label className="text-formedit">
                ชื่อสินค้า<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={nameproduct} onChange={(event)=>{setNameproduct(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setNameproduct(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label className="text-formedit">
                หมวดหมู่สินค้า<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control as="select" required value={productcategory} onChange={(event)=>{
                //value={show[0].productcategory}
                setProductcategory(event.target.value)
              }}>
                  <option value="" selected disabled hidden>กรุณาเลือก...</option>
                <option>เสื้อผ้า</option>
                <option>เครื่องประดับ</option>
                <option>รองเท้า</option>
                <option>กระเป๋า</option>
                <option>มือถือและอุปกรณ์เสริม</option>
                <option>อาหารและเครื่องดื่ม</option>
                <option>อาหารเสริมและผลิตภัณฑ์สุขภาพ</option>
                <option>เครื่องสำอางค์และอุปกรณ์เสริมความงาม</option>
                <option>คอมพิวเตอร์แล็ปท็อป</option>
                <option>กล้องและอุปกรณ์ถ่ายภาพ</option>
                <option>กีฬาและกิจกรรมกลางแจ้ง</option>
                <option>สื่อบันเทิงภายในบ้าน</option>
                <option>เกมส์และฮ๊อบบี้</option>
                <option>ยานยนต์</option>
                <option>ตั๋วและบัตรกำนัน</option>
                <option>เครื่องใช้ไฟฟ้า</option>
                <option>เฟอร์นิเจอร์และของตกแต่งบ้าน</option>
                <option>สัตว์เลี้ยง</option>
                <option>เครื่องเขียน</option>
                <option>หนังสือ</option>
                <option>เครื่องดนตรี</option>
                <option>อื่นๆ</option>
                </Form.Control> : null}
              {/* // <Form.Control as="select" defaultValue="Choose..."   required  onChange={(event)=>{ */}
              {/* //   setProductcategory(event.target.value)
              // }}>
              //   <option>เลือก...</option>
              //   <option>แฟชั่น</option>
              //   <option>ออนไลน์</option>
              // </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridPrice"
            >
              <Form.Label className="text-formedit">
                จำนวนเงิน (บาท)<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="text" id="nameproduct" pattern="[0-9]{1,}" title="กรอกตัวเลขเท่านั้น" placeholder="" value={money} onChange={(event)=>{setMoney(event.target.value)}} required /> : null}
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setMoney(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label className="text-formedit">
                ธนาคาร<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control as="select"   value={bank} required  onChange={(event)=>{
             
             setBank(event.target.value)
           }}>
               <option value="" selected disabled hidden>กรุณาเลือก...</option>
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
                </Form.Control> : null }
          {/* //     <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{ */}
             
          {/* //    setBank(event.target.value)
          //  }}>
          //    <option>เลือก...</option>
          //    <option>ธนาคารกรุงเทพ</option>
          //    <option>ธนาคารกรุงไทย</option>
          //    <option>ธนาคารกรุงศรีอยุธยา</option>
          //    <option>ธนาคารกสิกรไทย</option>
          //    <option>ธนาคารเกียรตินาคิน</option>
          //    <option>ธนาคารซีไอเอ็มบีไทย</option>
          //    <option>ธนาคารทหารไทย</option>
          //    <option>ธนาคารทิสโก้</option>
          //    <option>ธนาคารไทยพาณิชย์</option>
          //    <option>ธนาคารธนชาต</option>
          //    <option>ธนาคารนครหลวงไทย</option>
          //    <option>ธนาคารยูโอบี</option>
          //    <option>ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
          //    <option>ธนาคารไอซีบีซี</option>
          //  </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              className="formedit-left col-lg-6 col-12"
              controlId="formGridDate"
            >
              <Form.Label className="text-formedit">
                วันที่โดนโกง<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control type="name" placeholder="" value={datetime} onChange={(event)=>{setDatetime(event.target.value)}} required /> : null }
              {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setDatetime(event.target.value)}} required />} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSocial">
              <Form.Label className="text-formedit">
                ช่องทางที่โดนโกง<span className="spanformedit">*</span>
              </Form.Label>
              {show ? <Form.Control as="select"   value={social} required  onChange={(event)=>{
              
              setSocial(event.target.value)
            }}>
                <option value="" selected disabled hidden>กรุณาเลือก...</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Line</option>
                <option>Website</option>
                </Form.Control> : null }
                 {/* <Form.Control as="select" defaultValue="Choose..."  required  onChange={(event)=>{
              
              setSocial(event.target.value)
            }}>
              <option>เลือก...</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Twitter</option>
              <option>Line</option>
              <option>Website</option>
            </Form.Control>} */}
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="text-formedit">รายละเอียดเพิ่มเติม</Form.Label>
            {show ? <Form.Control type="name" placeholder="" value={other} onChange={(event)=>{setOther(event.target.value)}}  /> : null}
            {/* <Form.Control type="name" placeholder=""  onChange={(event)=>{setOther(event.target.value)}} required />} */}
          </Form.Group>         

          <Form.File.Label>
            <span className="spanformedit">
              * กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ
              (แชท)
            </span>
            <br></br>
            <span className="spanformpost">
            **ต้องเป็นไฟล์ png หรือ jpeg เท่านั้น
            </span>
          </Form.File.Label>
           
          <br></br> 
          <input
            className="uploadsformedituploadslip"
            type="file"
            onChange={FileUpload}
            multiple
            accept="image/png, image/jpeg , image/jpg"
            
          />

           <h1 className="h1-formpostfileerror">{error}</h1> 

          <div className="container-img-holder-imgpreviewedit">
            {imagesFile ? imagesFile.map((imagePreviewUrl) => {
              return (
                <img
                  key={imagePreviewUrl}
                  className="imgpreviewedit"
                  alt="previewImg"
                  src={imagePreviewUrl}
                  style={{ overflow: "hidden" }}
                  onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
                  onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
                />
              );
            }) :    ok.item ? ok.item.map(res => { 
              return ( 
                <img className="imgpreviewedit" src={`${res.url}`}  /> 
           )
           }) : null }
             

        
          </div>
            
          {/* <Form.Row className="linkrule1">
            <Form.Check aria-label="option 1" className="linkrule2"/><a className="linkrule3" href="about.html">ยอมรับข้อตกลง</a>
          </Form.Row> */}

          <button className="buttonformedit" variant="success" type="submit">
            โพสต์
          </button>
        
        </Form>
      </div>
    </div>
          </div>
        )
      }) : null}
   
    <Chatbot/>
    </div>
  );
};

export default Formedit;
