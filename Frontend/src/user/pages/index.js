import React, { useEffect, useState, useContext, useMemo } from "react";
import NavbarPage from "../components/navnew";
import usercontext from "../context/usercontext";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../Frontfirebase";
import Chatbot from "../components/chatbot";
import "./index.css";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBView,
  MDBIcon,
} from "mdbreact";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const Home = () => {
  const [ThiefCount, setThiefCount] = useState();
  const [FacebookCount, setFacebookCount] = useState();
  const [InstragramCount, setInstragramCount] = useState();
  const [LineCount, setLineCount] = useState();
  const [TwitterCount, setTwitterCount] = useState();
  const [WebsiteCount, setWebsiteCount] = useState();
const Getdata = async () =>{
  try {
    const thiefcount = await axios.get(
      "http://localhost:7000/thief/orderbycount"
    );
    setThiefCount(thiefcount.data.data);
    const facebookCount = await axios.get(
      "http://localhost:7000/post/orderbyfacebook"
    );
    setFacebookCount(facebookCount.data.data);
    const instragramCount = await axios.get(
      "http://localhost:7000/post/orderbyinstragram"
    );
    setInstragramCount(instragramCount.data.data);
    const lineCount = await axios.get(
      "http://localhost:7000/post/orderbyline"
    );
    setLineCount(lineCount.data.data);
    const twitterCount = await axios.get(
      "http://localhost:7000/post/orderbytwitter"
    );
    setTwitterCount(twitterCount.data.data);
    const websiteCount = await axios.get(
      "http://localhost:7000/post/orderbywebsite"
    );
    setWebsiteCount(websiteCount.data.data);
  } catch (err) {
    console.log(err);
  }
}
  useMemo(async () => {
    await Getdata()
  }, []);
  console.log(InstragramCount)
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
                <div className="containermini1-index">
                  <input
                    className="mr-sm-2 box1-index"
                    type="text"
                    placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี"
                    aria-label="Search"
                  />
                  <button type="submit" className="button1-index">
                    ค้นหา
                  </button>
                </div>
              </MDBFormInline>
            </MDBCol>
          </div>
          <div class="line-index"></div>
          <div className="column2-index">
            <div className="text1-index">ค้นหาผ่าน LINE Chatbot น้องพะโล้</div>
            <img src="/img/paloqr.jpg" className="image1-index" />
            <div>
              <a href="https://lin.ee/QlA8OaI" className="textlink-index">
                คลิกเพื่อเพิ่มเพื่อนน้องพะโล้
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h1-index">เลขที่บัญชีที่ถูกแจ้งมากที่สุด</div>
      <div className="container2-index">
        <div className="row">
          {ThiefCount
            ? ThiefCount.map((element,index) => {
                return (
                    <div className="column3-index">
                      <MDBCard>
                        <MDBCardBody cascade className="text-center">
                          <div className={`coin${index+1} rank-index1`}>{index+1}</div>
                          <p className="text3-index">
                            เลขที่บัญชีธนาคาร : {element.accountnumber} <br />
                            {element.bank}
                          </p>
                          <p className="text4-index">
                            จำนวนครั้งที่ถูกแจ้ง : {element.count} ครั้ง <br />
                            จำนวนเงินทั้งหมด : {element.summoney} บาท
                            <br />
                            วันที่โกงล่าสุด : {element.wanteedon}
                          </p>
                          <a
                            href="!#"
                            className="orange-text mt-1 d-flex justify-content-end align-items-center"
                          >
                            <h6 className="readmore">
                              ดูโพสต์ที่เกี่ยวข้องทั้งหมด{" "}
                              <MDBIcon
                                icon="chevron-right"
                                className="ml-2"
                                size="sm"
                              ></MDBIcon>
                            </h6>
                          </a>
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="container3-index">
        <div className="box-index">
          <div className="headfacebook-index">โกงผ่าน Facebook ล่าสุด</div>
          <div className="facebookbox-index">
            <div className="row">
            { FacebookCount
            ? FacebookCount.map((element,index)=>{
             return (
                  <div className="column4-index">
                <MDBCard>
                  {element.resultfileitem ? (
                    <MDBCardImage
                    src={`${element.resultfileitem.url}`}
                    className="image3-index"
                    hover
                  />
                  ): (
                    <MDBCardImage
                    src={"/img/profile.png"}
                    className="image3-index"
                    hover
                  />
                  )}
                  <MDBCardBody>
                    <strong className="text5-index">{element.nameproduct}</strong>
                    <hr />
                    <strong className="text6-index">{element.name} {element.surname}</strong>
                    <p className="text7-index">
                      เลขที่บัญชี : {element.accountnumber} 
                      <br />
                      จำนวนเงิน : {element.money} บาท <br />
                    </p>
                    <a
                      href={`/mypost/${element.uid}`}
                      className="d-flex justify-content-end readmore1-index"
                    >
                      <h5 className="">
                        อ่านเพิ่มเติม{" "}
                        <MDBIcon
                          icon="chevron-right"
                          className="ml-2"
                          size="sm"
                        ></MDBIcon>
                      </h5>
                    </a>
                  </MDBCardBody>
                  <div className="time-index">
                    <MDBIcon far icon="clock" />
                    <span> {element.datetime}</span>
                  </div>
                </MDBCard>
              </div>
              )
             })
             : null } 
             </div>
             <div className="row">
              <a href="!#" className="readmore1-index seemore">
                <h4 className="">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headinstargram-index">โกงผ่าน Instargram ล่าสุด</div>
          <div className="instargrambox-index">
            <div className="row">
            { InstragramCount
            ? InstragramCount.map((element,index)=>{
             return (
              <div className="column4-index">
                <MDBCard>
                {element.resultfileitem ? (
                    <MDBCardImage
                    src={`${element.resultfileitem.url}`}
                    className="image3-index"
                    hover
                  />
                  ): (
                    <MDBCardImage
                    src={"/img/profile.png"}
                    className="image3-index"
                    hover
                  />
                  )}
                  <MDBCardBody>
                    <strong className="text5-index">{element.nameproduct}</strong>
                    <hr />
                    <strong className="text6-index">{element.name} {element.surname}</strong>
                    <p className="text7-index">
                      เลขที่บัญชี : {element.accountnumber}
                      <br />
                      จำนวนเงิน : {element.money} บาท <br />
                    </p>
                    <a
                      href={`/mypost/${element.uid}`}
                      className="d-flex justify-content-end readmore2-index"
                    >
                      <h5 className="">
                        อ่านเพิ่มเติม{" "}
                        <MDBIcon
                          icon="chevron-right"
                          className="ml-2"
                          size="sm"
                        ></MDBIcon>
                      </h5>
                    </a>
                  </MDBCardBody>
                  <div className="time2-index">
                    <MDBIcon far icon="clock" />
                    <span>{element.datetime}</span>
                  </div>
                </MDBCard>
              </div>
             )})
              : null}
            </div>
            <div className="row">
              <a href="!#" className="readmore2-index seemore">
                <h4 className="">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headline-index">โกงผ่าน Line ล่าสุด</div>
          <div className="linebox-index">
            <div className="row">
            { LineCount
            ? LineCount.map((element,index)=>{
             return (
              <div className="column4-index">
                <MDBCard>
                {element.resultfileitem ? (
                    <MDBCardImage
                    src={`${element.resultfileitem.url}`}
                    className="image3-index"
                    hover
                  />
                  ): (
                    <MDBCardImage
                    src={"/img/profile.png"}
                    className="image3-index"
                    hover
                  />
                  )}
                  <MDBCardBody>
                    <strong className="text5-index">{element.nameproduct}</strong>
                    <hr />
                    <strong className="text6-index">{element.name} {element.surname}</strong>
                    <p className="text7-index">
                      เลขที่บัญชี : {element.accountnumber}
                      <br />
                      จำนวนเงิน : {element.money} บาท <br />
                    </p>
                    <a
                      href={`/mypost/${element.uid}`}
                      className="d-flex justify-content-end readmore3-index"
                    >
                      <h5 className="">
                        อ่านเพิ่มเติม{" "}
                        <MDBIcon
                          icon="chevron-right"
                          className="ml-2"
                          size="sm"
                        ></MDBIcon>
                      </h5>
                    </a>
                  </MDBCardBody>
                  <div className="time3-index">
                    <MDBIcon far icon="clock" />
                    <span>{element.datetime}</span>
                  </div>
                </MDBCard>
              </div>
             )})
             :null }
            </div>
            <div className="row">
              <a href="!#" className="readmore3-index seemore">
                <h4 className="">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headtwitter-index">โกงผ่าน Twitter ล่าสุด</div>
          <div className="twitterbox-index">
            <div className="row">
            { TwitterCount
            ? TwitterCount.map((element,index)=>{
             return (
              <div className="column4-index">
                <MDBCard>
                {element.resultfileitem ? (
                    <MDBCardImage
                    src={`${element.resultfileitem.url}`}
                    className="image3-index"
                    hover
                  />
                  ): (
                    <MDBCardImage
                    src={"/img/profile.png"}
                    className="image3-index"
                    hover
                  />
                  )}
                  <MDBCardBody>
                    <strong className="text5-index">{element.nameproduct}</strong>
                    <hr />
                    <strong className="text6-index">{element.name} {element.surname}</strong>
                    <p className="text7-index">
                      เลขที่บัญชี : {element.accountnumber}
                      <br />
                      จำนวนเงิน : {element.money} บาท <br />
                    </p>
                    <a
                      href={`/mypost/${element.uid}`}
                      className="d-flex justify-content-end readmore4-index"
                    >
                      <h5 className="">
                        อ่านเพิ่มเติม{" "}
                        <MDBIcon
                          icon="chevron-right"
                          className="ml-2"
                          size="sm"
                        ></MDBIcon>
                      </h5>
                    </a>
                  </MDBCardBody>
                  <div className="time4-index">
                    <MDBIcon far icon="clock" />
                    <span>{element.datetime}</span>
                  </div>
                </MDBCard>
              </div>
             )})
             :null}
            </div>
            <div className="row">
              <a href="!#" className="readmore4-index seemore">
                <h4 className="">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </h4>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headother-index">โกงผ่านช่องทางอื่นๆ ล่าสุด</div>
          <div className="otherbox-index">
            <div className="row">
            { WebsiteCount
            ? WebsiteCount.map((element,index)=>{
             return (     
              <div className="column4-index">
                <MDBCard>
                {element.resultfileitem ? (
                    <MDBCardImage
                    src={`${element.resultfileitem.url}`}
                    className="image3-index"
                    hover
                  />
                  ): (
                    <MDBCardImage
                    src={"/img/profile.png"}
                    className="image3-index"
                    hover
                  />
                  )}
                  <MDBCardBody>
                    <strong className="text5-index">{element.nameproduct}</strong>
                    <hr />
                    <strong className="text6-index">{element.name} {element.surname}</strong>
                    <p className="text7-index">
                      เลขที่บัญชี : {element.accountnumber}
                      <br />
                      จำนวนเงิน : {element.money} บาท <br />
                    </p>
                    <a
                      href={`/mypost/${element.uid}`}
                      className="d-flex justify-content-end readmore5-index"
                    >
                      <h5 className="">
                        อ่านเพิ่มเติม{" "}
                        <MDBIcon
                          icon="chevron-right"
                          className="ml-2"
                          size="sm"
                        ></MDBIcon>
                      </h5>
                    </a>
                  </MDBCardBody>
                  <div className="time5-index">
                    <MDBIcon far icon="clock" />
                    <span>{element.datetime}</span>
                  </div>
                </MDBCard>
              </div>
             )})
             :null}
            </div>
            <div className="row">
              <a href="!#" className="readmore5-index seemore">
                <h4 className="">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
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
