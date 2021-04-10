import React, { useContext, useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from "mdbreact";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "./navnew.css";
import { auth } from "../Frontfirebase";
import usercontext from "../context/usercontext";
import axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
import { Nav } from "react-bootstrap";
import Cliploading from "./clipLoader";
const NavbarPage = (props) => {
  var { user } = useContext(usercontext);
  const [displayname, setDisplayname] = useState();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsopen] = useState(false);
  const [search, Setsearch] = useState();
  const [searching, Setsearching] = useState();
  const [lastsearch, Setlastsearch] = useState();
  const [refresh, Setrefresh] = useState();
  const [allpost, Setallpost] = useState();
  const [countNoti, setCountNoti] = useState([]);
  const [noti, setNoti] = useState([]);
  const [haha, Sethaha] = useState(false);
  const [error, Seterror] = useState();
  const [hideCountNoti, SetHideCountNoti] = useState(false);
  const [hideCountNotiAlways, SetHideCountNotiAlways] = useState(false);
  const [reFreshNoti, setReFreshNoti] = useState(false);
  const [accountNumber, setAccountNumber] = useState(false);

  let history = useHistory();
  let i = 0; //forsearch
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signout");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleCollapse = () => {
    setIsopen(!isOpen);
  };
  const notiChangeClick = async () => {
    if (countNoti.length != 0) {
      SetHideCountNoti(true);
      await axios.post(
        `https://monkeyfruad01.herokuapp.com/post/notichangeclick/${user.uid}`,
        { countNoti }
      );
    }
  };
  const notiChangeRead = async (notiId) => {
    await axios.post(
      `https://monkeyfruad01.herokuapp.com/post/notificationread/${notiId}`
    );
  };
  const handlesearch = () => {
    try {
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
          console.log(getdata);
          history.push({
            pathname: "/entersearch",
            search: "?are you ok",
            state: {
              getdata,
              search,
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(haha)
  console.log(accountNumber)
  const initSearch = async () => {
    try {
      const getallthief = await axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/thief`
      );
      Setsearching(getallthief.data.item);
      const getallpost = await axios.get(
        `https://monkeyfruad01.herokuapp.com/post/post`
      );
      Setallpost(getallpost.data.item);
      const getthief = getallthief.data.item;
      if (search) {
        Seterror();
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
              setAccountNumber(true);
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
  console.log(lastsearch)
  const initUser = async () => {
    await axios
      .post("https://monkeyfruad01.herokuapp.com/user/session", {
        user: user,
      })
      .then((result) => {
        setDisplayname(result.data.data.username);
      });
    await axios
      .post(
        `https://monkeyfruad01.herokuapp.com/post/getnotification/${user.uid}`
      )
      .then((result) => {
        setNoti(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .post(
        `https://monkeyfruad01.herokuapp.com/post/getnoticlickfalse/${user.uid}`
      )
      .then((result) => {
        if (result.data[0] === undefined) {
          SetHideCountNotiAlways(true);
        } else {
          SetHideCountNoti(false);
          SetHideCountNotiAlways(false)
          setCountNoti(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(async () => {
    if (user) {
      await initUser();
      setLoading(false);
    }
    initSearch();
    setLoading(false);
    // setTimeout(() => {
    //   setReFreshNoti(!reFreshNoti);
    // }, 2000);
  }, [user, search, hideCountNoti, reFreshNoti]);
  console.log(reFreshNoti);
  return (
    <Router>
      <MDBNavbar light expand="md" className="navbarnew">
        <Nav.Link href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </Nav.Link>
        {/* {props.SetisOpen && props.SetisOpen ? (
          
          
          <MDBBtn
            className="btnslide"
            color="default-color"
            onClick={() => props.SetisOpen(!props.isOpen)}
          >
            <i class="fa fa-filter"></i>
          </MDBBtn>


        ) : null} */}
        {user ? (
          <MDBDropdown>
            <MDBDropdownToggle nav className="noti-mobile">
              <div className="navbar-noti" onClick={() => notiChangeClick()}>
                <img src="/img/notification.png" className="noti-logo"></img>
                {loading ? null : hideCountNotiAlways ? null : hideCountNoti ? null : (
                  <span className="badge">{countNoti.length}</span>
                )}
              </div>
            </MDBDropdownToggle>
            {noti.length != 0 ? (
              <MDBDropdownMenu className="dropdown-default dropdown-top-noti">
                <div className="box-nav-noti">
                  {noti.map((element, index) => {
                    return (
                      <div key={index}>
                        <MDBDropdownItem
                          className="hover-noti-nav"
                          href={`/mypost/${element.postid}`}
                          onClick={() => notiChangeRead(element.uid)}
                        >
                          {element.userCommentData.photoURL ? (
                            <img
                              className="img-circle  profile-nav-noti"
                              src={`${element.userCommentData.photoURL.url}`}
                            />
                          ) : (
                            <img
                              className="img-circle profile-nav-noti"
                              src="/img/profile.png"
                            />
                          )}
                          {element.read ? (
                            <div>
                              <div className="name-nav-noti-read">
                                @{element.userCommentData.username}
                              </div>
                              <p className="text-nav-noti-read">
                                แสดงความคิดเห็นต่อโพสต์ของคุณ
                              </p>
                              <div className="time-nav-noti-read">
                                {moment(new Date(element.date.seconds * 1000))
                                  .startOf()
                                  .fromNow()}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="name-nav-noti">
                                @{element.userCommentData.username}
                              </div>
                              <p className="text-nav-noti">
                                แสดงความคิดเห็นต่อโพสต์ของคุณ
                              </p>
                              <div className="time-nav-noti">
                                {moment(new Date(element.date.seconds * 1000))
                                  .startOf()
                                  .fromNow()}
                              </div>
                            </div>
                          )}
                        </MDBDropdownItem>
                      </div>
                    );
                  })}
                </div>
              </MDBDropdownMenu>
            ) : null}
          </MDBDropdown>
        ) : null}

        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  โพสต์
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default dropdown-top1">
                  <MDBDropdownItem href="/post">โพสต์ทั้งหมด</MDBDropdownItem>
                  <MDBDropdownItem href="/linkruleshow">
                    สร้างโพสต์
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/ranking">จัดอันดับคนโกง</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  ช่วยเหลือ
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default dropdown-top2">
                  <MDBDropdownItem href="/prevent">
                    รู้ไว้ไม่โดนโกง
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/help">
                    หน่วยงานที่ให้ความช่วยเหลือ
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/contractus">ติดต่อ</Nav.Link>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <div className=" my-0">
                <input
                  className="box-nav mr-sm-2"
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือเลขที่บัญชี"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    Setsearch(e.target.value);
                    props.SetshowDropdown(true);
                  }}
                />
              </div>
            </MDBNavItem>

            <button onClick={() => handlesearch()} className="button-nav">
              ค้นหา
            </button>
            {user ? (
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav className="noti-comp">
                    <div
                      className="navbar-noti"
                      onClick={() => notiChangeClick()}
                    >
                      <img
                        src="/img/notification.png"
                        className="noti-logo"
                      ></img>
                      {loading ? null : hideCountNotiAlways ? null : hideCountNoti ? null : (
                        <span className="badge">{countNoti.length}</span>
                      )}
                    </div>
                  </MDBDropdownToggle>

                  {noti.length != 0 ? (
                    <MDBDropdownMenu className="dropdown-default dropdown-top-noti">
                      <div className="box-nav-noti">
                        {noti.map((element, index) => {
                          return (
                            <div key={index}>
                              <MDBDropdownItem
                                className="hover-noti-nav"
                                href={`/mypost/${element.postid}`}
                                onClick={() => notiChangeRead(element.uid)}
                              >
                                {element.userCommentData.photoURL ? (
                                  <img
                                    className="img-circle  profile-nav-noti"
                                    src={`${element.userCommentData.photoURL.url}`}
                                  />
                                ) : (
                                  <img
                                    className="img-circle profile-nav-noti"
                                    src="/img/profile.png"
                                  />
                                )}
                                {element.read ? (
                                  <div>
                                    <div className="name-nav-noti-read">
                                      @{element.userCommentData.username}
                                    </div>
                                    <p className="text-nav-noti-read">
                                      แสดงความคิดเห็นต่อโพสต์ของคุณ
                                    </p>
                                    <div className="time-nav-noti-read">
                                      {moment(
                                        new Date(element.date.seconds * 1000)
                                      )
                                        .startOf()
                                        .fromNow()}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="name-nav-noti">
                                      @{element.userCommentData.username}
                                    </div>
                                    <p className="text-nav-noti">
                                      แสดงความคิดเห็นต่อโพสต์ของคุณ
                                    </p>
                                    <div className="time-nav-noti">
                                      {moment(
                                        new Date(element.date.seconds * 1000)
                                      )
                                        .startOf()
                                        .fromNow()}
                                    </div>
                                  </div>
                                )}
                              </MDBDropdownItem>
                            </div>
                          );
                        })}
                      </div>
                    </MDBDropdownMenu>
                  ) : null}
                </MDBDropdown>
              </MDBNavItem>
            ) : null}

            <MDBNavItem>
              {user ? (
                <MDBDropdown>
                  <MDBDropdownToggle
                    nav
                    caret
                    left
                    className="dropdown-username-nav"
                  >
                    {displayname}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu
                    className="dropdown-default dropdown-bottom"
                    right
                  >
                    <MDBDropdownItem href={`/profile/${user.uid}`}>
                      จัดการโปรไฟล์
                    </MDBDropdownItem>
                    <MDBDropdownItem href="/post/history">
                      ประวัติการโพสต์
                    </MDBDropdownItem>
                    <div className="line-nav"></div>
                    <MDBDropdownItem href="/login" onClick={logout}>
                      ออกจากระบบ
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              ) : (
                <Nav.Link href="/login">เข้าสู่ระบบ</Nav.Link>
              )}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <div className="gg">
        {lastsearch
          ? lastsearch.map((doc) => {
              let thiefNameAndSurname = `${doc.name} ${doc.surname}`;
              let thiefAccountNumber = `${doc.accountnumber}`
              console.log(thiefAccountNumber)
              i++;
              return (
                <div className="boxsearch-nav">
                  {i <= 10 ? (
                    <div>
                      {" "}
                      {haha ? (
                        props.showDropdown ? (
                          <button
                            className="search-nav"
                            onClick={() => (
                              history.push({
                                pathname: `/thief/post/${thiefNameAndSurname}`,
                                search: "?are you ok",
                              }),
                              window.location.reload(true)
                            )}
                          >
                            <div>
                              {" "}
                              {doc.name} {doc.surname}
                            </div>
                          </button>
                        ) : null
                      ) : accountNumber ? (
                        props.showDropdown ? (
                          <button
                            className="search-nav"
                            onClick={() => (
                              history.push({
                                pathname: `/thief/post/${thiefAccountNumber}`,
                                search: "?are you ok",
                              }),
                              window.location.reload(true)
                            )}
                          >
                            <div>
                              {" "}
                              {doc.accountnumber}
                            </div>
                          </button>
                        ) : null
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
        {lastsearch ? (
          props.showDropdown ? (
            <div className="dropsearch-nav" onClick={() => handlesearch()}>
              ค้นหา {search}
            </div>
          ) : null
        ) : null}
      </div>
    </Router>
  );
};

export default NavbarPage;
