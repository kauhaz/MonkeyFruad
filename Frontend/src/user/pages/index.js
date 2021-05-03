import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavbarPage from "../components/navnew";
import ScrollToTop from "../components/ScrollToTop";

import axios from "axios";

import Chatbot from "../components/chatbot";
import "./index.css";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import * as moment from "moment";
import "moment/locale/th";

import { MDBCard, MDBCardBody, MDBCardImage } from "mdbreact";

const Home = () => {
  const [ThiefCount, setThiefCount] = useState();
  const [FacebookCount, setFacebookCount] = useState();
  const [InstragramCount, setInstragramCount] = useState();
  const [LineCount, setLineCount] = useState();
  const [TwitterCount, setTwitterCount] = useState();
  const [WebsiteCount, setWebsiteCount] = useState();
  const [search, Setsearch] = useState();
  const [searching, Setsearching] = useState();
  const [lastsearch, Setlastsearch] = useState();
  const [haha, Sethaha] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [error, Seterror] = useState();
  const [allpost, Setallpost] = useState();
  const [accountNumber, setAccountNumber] = useState();
  let history = useHistory();
  let i = 0; //forsearch
  const Getdata = async () => {
    try {
      const thiefcount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/thief/orderbycount"
      );
      setThiefCount(thiefcount.data.data);
      const facebookCount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/post/orderbyfacebook"
      );
      setFacebookCount(facebookCount.data.data);
      const instragramCount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/post/orderbyinstragram"
      );
      setInstragramCount(instragramCount.data.data);
      const lineCount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/post/orderbyline"
      );
      setLineCount(lineCount.data.data);
      const twitterCount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/post/orderbytwitter"
      );
      setTwitterCount(twitterCount.data.data);
      const websiteCount = await axios.get(
        "https://monkeyfruad01.herokuapp.com/post/orderbywebsite"
      );
      setWebsiteCount(websiteCount.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const RankSeePost = (accountnumber) => {
    let search = accountnumber;
    const getdata = allpost.filter((doc) => {
      return doc.accountnumber.includes(search);
    });
    if (getdata) {
      history.push({
        pathname: "/entersearch",
        search: "are you ok",
        state: {
          getdata,
          search,
        },
      });
    }
  };

  const handlesearch = (e) => {
    try {
      e.preventDefault();

      if (search) {
        const getdata = allpost.filter((doc) => {
          return (
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.surname.toLowerCase().includes(search.toLowerCase()) ||
            doc.accountnumber.includes(search) ||
            (doc.name.toLowerCase() + " " + doc.surname.toLowerCase()).includes(
              search.toLowerCase()
            )
          );
        });

        Setsearch("");

        if (getdata) {
          history.push({
            pathname: "/entersearch",
            search: "are you ok",
            state: {
              getdata,
              search,
            },
          });
        }
      } else {
        Seterror("กรุณากรอก ชื่อ นามสกุล หรือ เลขบัญชีคนร้าย");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const Go_FacebookPost = () => {
    history.push("/postfacebook");
  };
  const Go_Instragram = () => {
    history.push("/postinstragram");
  };
  const Go_Line = () => {
    history.push("/postline");
  };
  const Go_Twitter = () => {
    history.push("/posttwitter");
  };
  const Go_Other = () => {
    history.push("/postother");
  };
  const ok = async () => {
    try {
      const getallthief = await axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/thief`
      );
      const getallpost = await axios.get(
        `https://monkeyfruad01.herokuapp.com/post/post`
      );
      Setallpost(getallpost.data.item);
      const getthief = getallthief.data.item;
      if (search) {
        Setsearching(getallthief.data.item);
        Setlastsearch(
          getthief.filter((doc) => {
            if (
              (
                doc.name.toLowerCase() +
                " " +
                doc.surname.toLowerCase()
              ).startsWith(search.toLowerCase())
            ) {
              Sethaha(true);
            }
            if (doc.accountnumber.startsWith(search)) {
              Sethaha(false);
            }
            if (doc.name.toLowerCase().startsWith(search.toLowerCase())) {
              Sethaha(true);
            }
            if (doc.surname.toLowerCase().startsWith(search.toLowerCase())) {
              Sethaha(true);
            }
            return (
              doc.name.toLowerCase().startsWith(search.toLowerCase()) ||
              doc.surname.toLowerCase().startsWith(search.toLowerCase()) ||
              doc.accountnumber.startsWith(search) ||
              (
                doc.name.toLowerCase() +
                " " +
                doc.surname.toLowerCase()
              ).startsWith(search.toLowerCase())
            );
          })
        );
      }
      if (!search) {
        Setlastsearch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await ok();
    await Getdata();
  }, [search]);

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container1-index">
        <div className="row-section1">
          <div className="column1-index">
            <div className="text1-index">ค้นหาผ่านเว็บไซต์ของเราได้ที่นี่</div>
            <MDBCol>
              <MDBFormInline className="mr-auto mb-4" onSubmit={handlesearch}>
                <div className="containermini1-index">
                  <input
                    className="mr-sm-2 box1-index"
                    type="text"
                    placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี"
                    aria-label="Search"
                    onChange={(e) => {
                      Setsearch(e.target.value);
                      SetshowDropdown(true);
                    }}
                  />
                  <button type="submit" className="button1-index">
                    ค้นหา
                  </button>
                </div>
              </MDBFormInline>

              {error}

              <div className="gg-index">
                {lastsearch
                  ? lastsearch.map((doc) => {
                    let thiefNameAndSurname = `${doc.name} ${doc.surname}`;
                    let thiefAccountNumber = `${doc.accountnumber}`;
                      i++;
                      return (
                        <div>
                          {i <= 10 ? (
                            <div>
                              {" "}
                              {haha ? (
                                showDropdown ? (
                                  <button
                                    className="search-index"
                                    onClick={() => (
                                      history.push(
                                        `/thief/post/${thiefNameAndSurname}`
                                      ),
                                      window.location.reload(true)
                                    )}
                                  >
                                    <div className="Fall-crisp">
                                      {" "}
                                      {doc.name} {doc.surname}{" "}
                                    </div>
                                  </button>
                                ) : null
                              ) : (
                                
                                  <button
                                    className="search-nav"
                                    onClick={() =>
                                      (
                                        history.push(
                                          `/thief/post/${thiefAccountNumber}`
                                        ),
                                        window.location.reload(true)
                                      )
                                    }
                                  >
                                    <div> {doc.accountnumber}</div>
                                  </button>
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}

                {lastsearch ? (
                  showDropdown ? (
                    <div
                      className="dropsearch-index Fall-crisp"
                      onClick={(e) => handlesearch(e)}
                    >
                      ค้นหา {search}
                    </div>
                  ) : null
                ) : null}
              </div>
            </MDBCol>
          </div>
          <div className="line-index"></div>
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
            ? ThiefCount.map((element, index) => {
                return (
                  <div className="column3-index" key={index}>
                    <div className={`coin${index + 1}-index rank-index1`}>
                      {index + 1}
                    </div>
                    <MDBCard>
                      <div className="emty-index"></div>
                      <MDBCardBody cascade className="text-center">
                        <p className="text3-index">
                          เลขที่บัญชี : {element.accountnumber} <br />
                          ธนาคาร : {element.bank}
                        </p>
                        <p className="text4-index">
                          จำนวนครั้งที่ถูกแจ้ง : {element.count} ครั้ง <br />
                          ยอดทั้งหมด :{" "}
                          {element.summoney.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}{" "}
                          บาท
                          <br />
                          ล่าสุด :{" "}
                          {moment(
                            new Date(element.wanteedon.seconds * 1000)
                          ).format("MM/DD/YYYY HH:mm")}
                        </p>
                        <a
                          onClick={() => RankSeePost(element.accountnumber)}
                          className="orange-text mt-1 d-flex justify-content-end align-items-center"
                        >
                          <div className="readmore-index">
                            ดูโพสต์ที่เกี่ยวข้องทั้งหมด{" "}
                            <MDBIcon
                              icon="chevron-right"
                              className="ml-2"
                              size="sm"
                            ></MDBIcon>
                          </div>
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
              {FacebookCount
                ? FacebookCount.map((element, index) => {
                    return (
                      <div className="column4-index" key={index}>
                        <MDBCard>
                          {element.resultfile ? (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={`${element.resultfile.url}`}
                                className="image3-index"
                                hover
                              />
                            </a>
                          ) : (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={"/img/profile.png"}
                                className="image3-index"
                                hover
                              />
                            </a>
                          )}
                          <MDBCardBody>
                            <div className="Fall-crisp cardbody-index">
                              <strong className="text5-index">
                                {element.name} {element.surname}
                              </strong>

                              <hr />
                              <p className="text7-index">
                                สินค้า : {element.nameproduct}
                                <br />
                                เลขบัญชี : {element.accountnumber}
                                <br />
                                จำนวนเงิน :{" "}
                                {element.money.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}{" "}
                                บาท <br />
                                วันที่โอน :{" "}
                                {moment(
                                  new Date(element.datetimes.seconds * 1000)
                                ).format("MM/DD/YYYY HH:mm")}
                                <br />
                              </p>
                            </div>
                            <a
                              href={`/mypost/${element.uid}`}
                              className="d-flex justify-content-end readmore1-index readmoresize-index"
                            >
                              <div className="">
                                อ่านเพิ่มเติม{" "}
                                <MDBIcon
                                  icon="chevron-right"
                                  className="ml-2"
                                  size="sm"
                                ></MDBIcon>
                              </div>
                            </a>
                          </MDBCardBody>
                          <div className="time-index">
                            <MDBIcon far icon="clock" />
                            <span>
                              {" "}
                              {moment(
                                new Date(element.date.seconds * 1000)
                              ).format("lll")}
                            </span>
                          </div>
                        </MDBCard>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="row">
              <a onClick={Go_FacebookPost} className=" seemore-index">
                <div className="readmore1-index">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headinstargram-index">โกงผ่าน Instargram ล่าสุด</div>
          <div className="instargrambox-index">
            <div className="row">
              {InstragramCount
                ? InstragramCount.map((element, index) => {
                    return (
                      <div className="column4-index" key={index}>
                        <MDBCard>
                          {element.resultfile ? (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={`${element.resultfile.url}`}
                                className="image3-index"
                                hover
                              />
                            </a>
                          ) : (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={"/img/profile.png"}
                                className="image3-index"
                                hover
                              />
                            </a>
                          )}
                          <MDBCardBody>
                            <div className="Fall-crisp cardbody-index">
                              <strong className="text5-index">
                                {" "}
                                {element.name} {element.surname}
                              </strong>

                              <hr />
                              <p className="text7-index">
                                สินค้า : {element.nameproduct} <br />
                                เลขบัญชี : {element.accountnumber}
                                <br />
                                จำนวนเงิน :{" "}
                                {element.money.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}{" "}
                                บาท <br />
                                วันที่โอน :{" "}
                                {moment(
                                  new Date(element.datetimes.seconds * 1000)
                                ).format("MM/DD/YYYY HH:mm")}
                                <br />
                              </p>
                            </div>
                            <a
                              href={`/mypost/${element.uid}`}
                              className="d-flex justify-content-end readmore2-index readmoresize-index"
                            >
                              <div className="">
                                อ่านเพิ่มเติม{" "}
                                <MDBIcon
                                  icon="chevron-right"
                                  className="ml-2"
                                  size="sm"
                                ></MDBIcon>
                              </div>
                            </a>
                          </MDBCardBody>
                          <div className="time2-index">
                            <MDBIcon far icon="clock" />
                            <span>
                              {" "}
                              {moment(
                                new Date(element.date.seconds * 1000)
                              ).format("lll")}
                            </span>
                          </div>
                        </MDBCard>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="row">
              <a onClick={Go_Instragram} className=" seemore-index">
                <div className="readmore2-index">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headline-index">โกงผ่าน Line ล่าสุด</div>
          <div className="linebox-index">
            <div className="row">
              {LineCount
                ? LineCount.map((element, index) => {
                    return (
                      <div className="column4-index" key={index}>
                        <MDBCard>
                          {element.resultfile ? (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={`${element.resultfile.url}`}
                                className="image3-index"
                                hover
                              />
                            </a>
                          ) : (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={"/img/profile.png"}
                                className="image3-index"
                                hover
                              />
                            </a>
                          )}
                          <MDBCardBody>
                            <div className="Fall-crisp cardbody-index">
                              <strong className="text5-index">
                                {element.name} {element.surname}
                              </strong>

                              <hr />
                              <p className="text7-index">
                                สินค้า : {element.nameproduct}
                                <br />
                                เลขบัญชี : {element.accountnumber}
                                <br />
                                จำนวนเงิน :{" "}
                                {element.money.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}{" "}
                                บาท <br />
                                วันที่โอน :{" "}
                                {moment(
                                  new Date(element.datetimes.seconds * 1000)
                                ).format("MM/DD/YYYY HH:mm")}
                                <br />
                              </p>
                            </div>
                            <a
                              href={`/mypost/${element.uid}`}
                              className="d-flex justify-content-end readmore3-index readmoresize-index"
                            >
                              <div className="">
                                อ่านเพิ่มเติม{" "}
                                <MDBIcon
                                  icon="chevron-right"
                                  className="ml-2"
                                  size="sm"
                                ></MDBIcon>
                              </div>
                            </a>
                          </MDBCardBody>
                          <div className="time3-index">
                            <MDBIcon far icon="clock" />
                            <span>
                              {" "}
                              {moment(
                                new Date(element.date.seconds * 1000)
                              ).format("lll")}
                            </span>
                          </div>
                        </MDBCard>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="row">
              <a onClick={Go_Line} className=" seemore-index">
                <div className="readmore3-index">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headtwitter-index">โกงผ่าน Twitter ล่าสุด</div>
          <div className="twitterbox-index">
            <div className="row">
              {TwitterCount
                ? TwitterCount.map((element, index) => {
                    return (
                      <div className="column4-index" key={index}>
                        <MDBCard>
                          {element.resultfile ? (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={`${element.resultfile.url}`}
                                className="image3-index"
                                hover
                              />
                            </a>
                          ) : (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={"/img/profile.png"}
                                className="image3-index"
                                hover
                              />
                            </a>
                          )}
                          <MDBCardBody>
                            <div className="Fall-crisp cardbody-index">
                              <strong className="text5-index">
                                {element.name} {element.surname}
                              </strong>

                              <hr />
                              <p className="text7-index">
                                สินค้า : {element.nameproduct}
                                {element.name} <br />
                                เลขที่บัญชี : {element.accountnumber}
                                <br />
                                จำนวนเงิน :{" "}
                                {element.money.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}{" "}
                                บาท <br />
                                วันที่โอน :{" "}
                                {moment(
                                  new Date(element.datetimes.seconds * 1000)
                                ).format("MM/DD/YYYY HH:mm")}{" "}
                                <br />
                              </p>
                            </div>
                            <a
                              href={`/mypost/${element.uid}`}
                              className="d-flex justify-content-end readmore4-index readmoresize-index"
                            >
                              <div className="">
                                อ่านเพิ่มเติม{" "}
                                <MDBIcon
                                  icon="chevron-right"
                                  className="ml-2"
                                  size="sm"
                                ></MDBIcon>
                              </div>
                            </a>
                          </MDBCardBody>
                          <div className="time4-index">
                            <MDBIcon far icon="clock" />
                            <span>
                              {" "}
                              {moment(
                                new Date(element.date.seconds * 1000)
                              ).format("lll")}
                            </span>
                          </div>
                        </MDBCard>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="row">
              <a onClick={Go_Twitter} className=" seemore-index">
                <div className="readmore4-index">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="box-index">
          <div className="headother-index">โกงผ่านช่องทางอื่นๆ ล่าสุด</div>
          <div className="otherbox-index">
            <div className="row">
              {WebsiteCount
                ? WebsiteCount.map((element, index) => {
                    return (
                      <div className="column4-index" key={index}>
                        <MDBCard>
                          {element.resultfile ? (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={`${element.resultfile.url}`}
                                className="image3-index"
                                hover
                              />
                            </a>
                          ) : (
                            <a href={`/mypost/${element.uid}`}>
                              <MDBCardImage
                                src={"/img/profile.png"}
                                className="image3-index"
                                hover
                              />
                            </a>
                          )}
                          <MDBCardBody>
                            <div className="Fall-crisp cardbody-index">
                              <strong className="text5-index">
                                {element.name} {element.surname}
                              </strong>

                              <hr />
                              <p className="text7-index">
                                สินค้า : {element.nameproduct} <br />
                                เลขที่บัญชี : {element.accountnumber}
                                <br />
                                จำนวนเงิน :{" "}
                                {element.money.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}{" "}
                                บาท <br />
                                วันที่โอน :{" "}
                                {moment(
                                  new Date(element.datetimes.seconds * 1000)
                                ).format("MM/DD/YYYY HH:mm")}
                                <br />
                              </p>
                            </div>
                            <a
                              href={`/mypost/${element.uid}`}
                              className="d-flex justify-content-end readmore5-index readmoresize-index"
                            >
                              <div className="">
                                อ่านเพิ่มเติม{" "}
                                <MDBIcon
                                  icon="chevron-right"
                                  className="ml-2"
                                  size="sm"
                                ></MDBIcon>
                              </div>
                            </a>
                          </MDBCardBody>
                          <div className="time5-index">
                            <MDBIcon far icon="clock" />
                            <span>
                              {" "}
                              {moment(
                                new Date(element.date.seconds * 1000)
                              ).format("lll")}
                            </span>
                          </div>
                        </MDBCard>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="row">
              <a onClick={Go_Other} className=" seemore-index">
                <div className="readmore5-index">
                  ดูทั้งหมด{" "}
                  <MDBIcon
                    icon="chevron-right"
                    className="ml-2"
                    size="sm"
                  ></MDBIcon>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="container-indexbottoms"></div>
      </div>
      <ScrollToTop/>
      <Chatbot />
    </div>
  );
};

export default Home;
