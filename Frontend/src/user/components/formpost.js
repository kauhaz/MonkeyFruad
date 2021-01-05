import React, { useEffect, useState, Component} from "react";
import { Form,Col,FormControl,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./formpost.css";
class Formpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          files: [],
          imagesPreviewUrls: []
        };
        this._handleImageChange = this._handleImageChange.bind(this);
      }
    
      _handleImageChange(e) {
        e.preventDefault();
        this.setState({
            files: [],
            imagesPreviewUrls: []
        })
    
        let files = Array.from(e.target.files);
    
        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                     files: [...this.state.files, file],
                     imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        });
      }

    render () {
        return (
            <div className="container">
                <div className="container2">
                    <div className="profile-headers-img">
                        <img className="img-circle" src="/profile.png" />
                        <div className="rank-label-container">
                            <span className="label label-default rank-label">
                                <div class="ImageUpload">
                                    <label for="FileInput">
                                        <div className="fileinput">
                                            <img className="uplodeprofile" src="/edit.png" />
                                        </div>   
                                    </label> 
                                    <div className="buttoninput">
                                        <input id="FileInput" type="file" onchange="readURL(this,'Picture')" />
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <Form className="formsize">
                        <Form.Row>
                            <Form.Group as={Col} className="left col-lg-6 col-12" controlId="formGridName">
                                <Form.Label>ชื่อ (ผู้โกง)<span>*</span></Form.Label>
                                <Form.Control type="name" placeholder="" required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastname">
                                <Form.Label>นามสกุล (ผู้โกง)<span>*</span></Form.Label>
                                <Form.Control type="lastname" placeholder="" required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} className="left col-lg-6 col-12" controlId="formGridId">
                                <Form.Label>เลขบัตรประชาชน (ผู้โกง)<span>*</span></Form.Label>
                                <Form.Control type="id" placeholder="" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAccountnumber">
                                <Form.Label>เลขที่บัญชี (ผู้โกง)<span>*</span></Form.Label>
                                <Form.Control type="accountnumber" placeholder="" required/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} className="left col-lg-6 col-12" controlId="formGridNameproduct">
                                <Form.Label>ชื่อสินค้า<span>*</span></Form.Label>
                                <Form.Control type="nameproduct" placeholder="" required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>หมวดหมู่สินค้า<span>*</span></Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." required>
                                    <option>เลือก...</option>
                                    <option>แฟชั่น</option>
                                    <option>ออนไลน์</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} className="left col-lg-6 col-12" controlId="formGridPrice">
                                <Form.Label>จำนวนเงิน (บาท)<span>*</span></Form.Label>
                                <Form.Control type="nameproduct" placeholder="" required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>ธนาคาร<span>*</span></Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." required>
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
                            <Form.Group as={Col} className="left col-lg-6 col-12" controlId="formGridDate">
                                <Form.Label>วันที่โดนโกง<span>*</span></Form.Label>
                                <Form.Control type="datetime-local" placeholder="" required/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSocial">
                                <Form.Label>ช่องทางที่โดนโกง<span>*</span></Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." required>
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
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    
                        <Form.File.Label>
                            <span>**กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง เช่น ภาพถ่ายหน้าจอ (แชท)</span>
                        </Form.File.Label>

                        <input className="upload" type="file" accept='image/*' onChange={this._handleImageChange} multiple/>
                        <div className="img-holder">
                            {this.state.imagesPreviewUrls.map((imagePreviewUrl) => {
                                return <img key={imagePreviewUrl} className="imgpreview"alt='previewImg' src={imagePreviewUrl} />
                            })}
                        </div>

                        <Form.Row>
                            <Form.Group id="formGridCheckbox">
                                <Form.Check className="checkbox" type="checkbox" required/>
                                <a className="linkrule" href="about.html">ยอมรับข้อตกลง</a>
                            </Form.Group>
                        </Form.Row>    

                        <Button className="buttonpost" variant="success" type="submit">
                            โพสต์
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
};

export default Formpost;
