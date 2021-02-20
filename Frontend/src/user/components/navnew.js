import React, { useContext, useState, useMemo } from "react";
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
} from "mdbreact";
import { BrowserRouter as Router,useHistory } from "react-router-dom";
import "./navnew.css";
import { auth } from "../Frontfirebase";
import usercontext from "../context/usercontext";
import axios from "axios";
import { Nav } from "react-bootstrap";
const NavbarPage = ({  SetshowDropdown, showDropdown }) => {
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

  const [haha, Sethaha] = useState();
  const [error, Seterror] = useState();

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

  const ok = async () => {
    try {
      const getallthief = await axios.get(`http://localhost:7000/thief/thief`);
      Setsearching(getallthief.data.item);
      const getallpost = await axios.get(`http://localhost:7000/post/post`);
      Setallpost(getallpost.data.item);
      const getthief = getallthief.data.item;
      console.log(search);
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
              Sethaha(true);
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
  }, [user, search]);

  return loading ? (
    ""
  ) : admin ? (
    <Router>
      <MDBNavbar light expand="lg" className="navbarnew navbar-expand-lg">
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
              <MDBDropdown className="">
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
                    SetshowDropdown(true);
                  }}
                />
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
              let thiefid = doc.accountnumber;
              i++;
              return (
                <div className="boxsearch-nav">
                  {i <= 10 ? (
                    <div>
                      {" "}
                      {haha ? (
                        showDropdown ? (
                          <button
                            className="search-nav"
                            onClick={() => (
                              history.push(`/thief/post/${thiefid}`),
                              window.location.reload(true)
                            )}
                          >
                            <div>
                              {" "}
                              {doc.name} {doc.surname} {doc.accountnumber}
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
          showDropdown ? (
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
