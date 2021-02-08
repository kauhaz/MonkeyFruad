import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "./navnew.css";
import { auth } from "../Frontfirebase";
import usercontext from "../context/usercontext";
import axios from "axios";
import { Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
const NavbarPage = ({show}) => {
  var { user, setUser } = useContext(usercontext);

  const [displayname, setDisplayname] = useState();
  const [role, Setrole] = useState();
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsopen] = useState(false);
  const [search, Setsearch] = useState();
  const [searching, Setsearching] = useState();
  const [lastsearch, Setlastsearch] = useState();
  const [refresh, Setrefresh] = useState();

  const [haha, Sethaha] = useState();
  const [error, Seterror] = useState();

  let history = useHistory();

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



  const handlesearch = () => {
    try {
      if (search) {
        const getdata = searching.filter((doc) => {
          return (
            doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.surname.toLowerCase().includes(search.toLowerCase()) ||
            doc.accountnumber.includes(search)
          );
        });

        Setsearch("");
        if (getdata) {
          (history.push({
            pathname: "/entersearch",
            search: "?are you ok",
            state: {
              getdata,
              search
            },
          }))
        }
      } else {
        Seterror("กรุณากรอก ชื่อ นามสกุล หรือ เลขบัญชีคนร้าย");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ok = async () => {
    try {
      
      const getallthief = await axios.get(`http://localhost:7000/thief/thief`);
      Setsearching(getallthief.data.item);
      const getthief = getallthief.data.item; 
      console.log(search)
      if(search){
        Seterror()
        Setlastsearch(
          getthief.filter((doc) => {
            if (doc.accountnumber.startsWith(search)) {
              Sethaha(true);
              Setrole(false);
            }
            if (doc.name.toLowerCase().startsWith(search.toLowerCase())) {
              Sethaha(false);
              Setrole(true);
            }
            if (doc.surname.toLowerCase().startsWith(search.toLowerCase())) {
              Sethaha(false);
              Setrole(true);
            }
            return (
              doc.name.toLowerCase().startsWith(search.toLowerCase()) ||
              doc.surname.toLowerCase().startsWith(search.toLowerCase()) ||
              doc.accountnumber.startsWith(search)
            );
          })
        );
      }
      if(!search){
        Setlastsearch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useMemo(async () => {
    if (user) {
      await axios
        .post("http://localhost:7000/user/session", { user: user })
        .then((result) => {
          if (result.data.data.role === "admin") {
            setAdmin(true);
          }
          setDisplayname(result.data.data.username);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   await ok();  
    setLoading(false);
  }, [user,search]  );

  

  return loading ? (
    ""
  ) : admin ? (
    <Router>
      <MDBNavbar light expand="md" className="navbarnew">
        <MDBNavbarBrand href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <Nav.Link href="/managepost"> จัดการโพสต์ </Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">ดูรายงาน</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/non_verifypost">
                    ยังไม่ตรวจสอบ
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/verifypost">
                    ตรวจสอบแล้ว
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/contractus">ติดต่อเรา</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link onClick={logout} href="/login">
                ออกจากระบบ
              </Nav.Link>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  ) : (
    <Router>
      <MDBNavbar light expand="md" className="navbarnew">
        <Nav.Link href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </Nav.Link>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  โพสต์
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
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
              <MDBDropdown className="">
                <MDBDropdownToggle nav caret>
                  ช่วยเหลือ
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
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
                  onChange={(e) => Setsearch(e.target.value)}
                />
                {error}
              </div>
              <div>
                {lastsearch
                  ? lastsearch.map((doc) => {
                      let thiefid = doc.accountnumber;

                      return (
                        <div>
                          {haha ? (
                            <button
                              onClick={() => (
                                history.push(`/thief/post/${thiefid}`),
                                window.location.reload(true)
                              )}
                            >
                              <div>{doc.accountnumber}</div>
                            </button>
                          ) : (
                            <button
                              onClick={() => (
                                history.push(`/thief/post/${thiefid}`),
                                window.location.reload(true)
                              )}
                            >
                              <div>
                                {doc.name} {doc.surname}
                              </div>
                            </button>
                          )}
                          {/* {role ? <div>{doc.name} {doc.surname}</div> : null} */}
                        </div>
                      );
                    })
                  : null}
              </div>
            </MDBNavItem>

            <button onClick={() => handlesearch()} className="button-nav">
              ค้นหา
            </button>
            <MDBNavItem>
              {user ? (
                <MDBDropdown>
                  <MDBDropdownToggle nav caret left>
                    {displayname}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
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
    </Router>
  );
};

export default NavbarPage;
