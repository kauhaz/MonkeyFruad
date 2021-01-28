import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
import usercontext from "../context/usercontext";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";
import "./index.css";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBView, MDBIcon } from 'mdbreact';

const Home = () => {
  // const [data, setData] = useState();
  // // var user = auth.currentUser;
  // let { user , setUser} = useContext(usercontext)
  // const test = () => {
  //   if (user) {
  //     console.log("all user data", user);
  //     console.log("uid user", user.uid);
  //   } else {
  //     console.log("error");
  //   }
  // };
  return (
    <div>
      <NavbarPage />
      {/* <h1 className="h1-index">หน้าหลัก</h1> */}
      <div className="container1-index">
        <div className="row">
          <div className="column1-index">
              <div className="text1-index">ค้นหาผ่านเว็บไซต์ของเราได้ที่นี่</div>
            <MDBCol>
              <MDBFormInline className="mr-auto mb-4">
                <input className="mr-sm-2 box1-index" type="text" placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี" aria-label="Search" />
                <button type="submit" className="button1-index">ค้นหา</button>
              </MDBFormInline>
            </MDBCol>
          </div>
          <div class="line-index"></div>
          <div className="column2-index">
            <div className="text1-index">ค้นหาผ่าน LINE Chatbot น้องพะโล้</div>
            <img src="/img/paloqr.jpg" className="image1-index" />
            <div><a href="https://lin.ee/QlA8OaI" className="textlink-index">คลิกเพื่อเพิ่มเพื่อนน้องพะโล้</a></div>
          </div>
        </div>
      </div>
        <div className="h1-index">รายชื่อคนโกงที่ถูกแจ้งมากที่สุด</div>
      
      <div className="container2-index" >
        <div className="row">
            <div className="column3-index">
              <MDBCard>
                <MDBCardImage className="img-fluid image2-index" src='https://mdbootstrap.com/img/Photos/Others/men.jpg' waves />
                <MDBCardBody cascade className='text-center'>
                <p className="rank-index">อันดับ 1</p>
                  <MDBCardTitle className='card-title'>
                    <strong className="text2-index">ข้าวเหนียว หมูปิ้ง</strong>
                  </MDBCardTitle>
                  <p className='text3-index'>เลขที่บัญชีธนาคาร : 11111111111 <br/>ธนาคาร : กสิกร</p>
                  <p className="text4-index">
                    จำนวนครั้งที่ถูกแจ้ง : 160 ครั้ง <br/>
                    จำนวนเงินทั้งหมด : 1,980,460 บาท<br/>
                    วันที่โกงล่าสุด : 18/01/2021 08:53pm
                  </p>
                  <a href='!#' className='orange-text mt-1 d-flex justify-content-end align-items-center'>
                    <h5 className=''>
                      อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </div>
            
            <div className="column3-index">
              <MDBCard>
                <MDBCardImage className="img-fluid image2-index" src='https://mdbootstrap.com/img/Photos/Others/men.jpg' waves />
                <MDBCardBody cascade className='text-center'>
                <p className="rank-index">อันดับ 2</p>
                  <MDBCardTitle className='card-title'>
                    <strong className="text2-index">ข้าวเหนียว หมูปิ้ง</strong>
                  </MDBCardTitle>
                  <p className='text3-index'>เลขที่บัญชีธนาคาร : 11111111111 <br/>ธนาคาร : กสิกร</p>
                  <p className="text4-index">
                    จำนวนครั้งที่ถูกแจ้ง : 160 ครั้ง <br/>
                    จำนวนเงินทั้งหมด : 1,980,460 บาท<br/>
                    วันที่โกงล่าสุด : 18/01/2021 08:53pm
                  </p>
                  <a href='!#' className='orange-text mt-1 d-flex justify-content-end align-items-center'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </div>
            <div className="column3-index">
              <MDBCard>
                <MDBCardImage className="img-fluid image2-index" src='https://mdbootstrap.com/img/Photos/Others/men.jpg' waves />
                <MDBCardBody cascade className='text-center'>
                <p className="rank-index">อันดับ 3</p>
                  <MDBCardTitle className='card-title'>
                    <strong className="text2-index">ข้าวเหนียว หมูปิ้ง</strong>
                  </MDBCardTitle>
                  <p className='text3-index'>เลขที่บัญชีธนาคาร : 11111111111 <br/>ธนาคาร : กสิกร</p>
                  <p className="text4-index">
                    จำนวนครั้งที่ถูกแจ้ง : 160 ครั้ง <br/>
                    จำนวนเงินทั้งหมด : 1,980,460 บาท<br/>
                    วันที่โกงล่าสุด : 18/01/2021 08:53pm
                  </p>
                  <a href='!#' className='orange-text mt-1 d-flex justify-content-end align-items-center'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
      </div>

      <div className="container3-index">
        <div className="box-index">
          <div className="headfacebook-index">โกงผ่าน Facebook ล่าสุด</div>
          <div className="facebookbox-index">
            <div className="row">
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore1-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore1-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore1-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore1-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
            </div>
            <div className="row">
              <a href='!#' className='readmore1-index seemore'>
                <h4 className=''>
                  ดูทั้งหมด{' '}
                  <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>
        
        <div className="box-index">
          <div className="headinstargram-index">โกงผ่าน Instargram ล่าสุด</div>
          <div className="instargrambox-index">
            <div className="row">
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore2-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time2-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore2-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time2-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore2-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time2-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore2-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time2-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
            </div>
            <div className="row">
              <a href='!#' className='readmore2-index seemore'>
                <h4 className=''>
                  ดูทั้งหมด{' '}
                  <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headline-index">โกงผ่าน Line ล่าสุด</div>
          <div className="linebox-index">
            <div className="row">
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore3-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time3-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore3-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time3-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore3-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time3-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore3-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time3-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
            </div>
            <div className="row">
              <a href='!#' className='readmore3-index seemore'>
                <h4 className=''>
                  ดูทั้งหมด{' '}
                  <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headtwitter-index">โกงผ่าน Twitter ล่าสุด</div>
          <div className="twitterbox-index">
            <div className="row">
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore4-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time4-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore4-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time4-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore4-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time4-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore4-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time4-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
            </div>
            <div className="row">
              <a href='!#' className='readmore4-index seemore'>
                <h4 className=''>
                  ดูทั้งหมด{' '}
                  <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        
        <div className="box-index">
          <div className="headother-index">โกงผ่านช่องทางอื่นๆ ล่าสุด</div>
          <div className="otherbox-index">
            <div className="row">
              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore5-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time5-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore5-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time5-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore5-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time5-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>

              <div className="column4-index">
                <MDBCard>
                <MDBCardImage src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg' className="image3-index" hover/>
                <MDBCardBody>
                <strong className="text5-index">กระเป๋า CHANEL</strong>
                  <hr />
                  <strong className="text6-index">ข้าวเหนียว หมูปิ้ง</strong>
                  <p className="text7-index">
                    เลขที่บัญชี : 1111111111<br/>
                    จำนวนเงิน : 30000 บาท <br/> 
                  </p>
                  <a href='!#' className='d-flex justify-content-end readmore5-index'>
                    <h5 className=''>
                    อ่านเพิ่มเติม{' '}
                      <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                    </h5>
                  </a>
                </MDBCardBody>
                <div className='time5-index'>
                      <MDBIcon far icon='clock' /><span> 05/10/2015 08:57 pm</span>
                </div>
              </MDBCard>
              </div>
            </div>
            <div className="row">
              <a href='!#' className='readmore5-index seemore'>
                <h4 className=''>
                  ดูทั้งหมด{' '}
                  <MDBIcon icon='chevron-right' className='ml-2' size='sm'></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

      </div>
      <Chatbot />
    </div>
  );
};

export default Home;
