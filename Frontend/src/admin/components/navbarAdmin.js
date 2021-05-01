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
import "../../user/components/navnew.css";
import { auth } from "../../user/Frontfirebase";
import usercontext from "../../user/context/usercontext";
import axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
import { Nav } from "react-bootstrap";
import Cliploading from "../../user/components/clipLoader";

const NavbarPage = (props) => {
  var { user } = useContext(usercontext);
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
  const [accountNumber, setAccountNumber] = useState();
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
          console.log(getdata);
          history.push({
            pathname: "/adminentersearch",
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
  const adminhandlesearch = () => {
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
            pathname: "/adminentersearch",
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

  const initUser = async () => {
    await axios
      .post("https://monkeyfruad01.herokuapp.com/user/session", {
        user: user,
      })
      .then((result) => {
        if (result.data.data.role === "admin") {
          setAdmin(true);
        }
      });
  };
  useEffect(async () => {
    if (user) {
      await initUser();
      setLoading(false);
    }
    initSearch();
    setLoading(false);
  }, [user, search]);
  return admin ? (
    <Router>
      <MDBNavbar light expand="lg" className="navbarnew navbar-expand-lg">
        <MDBNavbarBrand href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem className="jud">
              <Nav.Link href="/"> จัดการโพสต์ </Nav.Link>
            </MDBNavItem>
            <MDBNavItem className="jud">
              <Nav.Link href="/report">ดูรายงาน</Nav.Link>
            </MDBNavItem>
            <MDBNavItem className="jud">
              <Nav.Link href="/dashboard">สรุปข้อมูล</Nav.Link>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <div className=" my-0">
                <input
                  className="box-nav mr-sm-2 search-admin"
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

            <button onClick={() => adminhandlesearch()} className="button-nav button-nav-admin">
              ค้นหา
            </button>
            <MDBNavItem className="jud">
              <Nav.Link onClick={logout} href="/login">
                ออกจากระบบ
              </Nav.Link>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <div className="ggadmin">
        {lastsearch
          ? lastsearch.map((doc) => {
            let thiefNameAndSurname = `${doc.name} ${doc.surname}`;
            let thiefAccountNumber = `${doc.accountnumber}`;
              console.log(thiefNameAndSurname);
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
                                pathname: `/admin/thief/post/${thiefNameAndSurname}`,
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
                      ) : (
                        props.showDropdown ? (
                          <button
                            className="search-nav"
                            onClick={() =>
                              (
                              history.push({
                                pathname: `/admin/thief/post/${thiefAccountNumber}`,
                                search: "?are you ok",
                              }),
                              window.location.reload(true)
                              )}
                          >
                            <div> {doc.accountnumber}</div>
                          </button>
                        ) : null
                      ) }
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
        {lastsearch ? (
          props.showDropdown ? (
            <div className="dropsearch-nav" onClick={() => adminhandlesearch()}>
              ค้นหา {search}
            </div>
          ) : null
        ) : null}
      </div>
    </Router>
  ) : (
    <Router>
      <MDBNavbar light expand="lg" className="navbarnew navbar-expand-lg">
        <MDBNavbarBrand href="/">
          <img src="/img/logo-mf.png" className="logo-nav" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left className="center-nav">
            <MDBNavItem>
              <Nav.Link href="/"> จัดการโพสต์ </Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/report">ดูรายงาน</Nav.Link>
            </MDBNavItem>
            <MDBNavItem>
              <Nav.Link href="/dashboard">สรุปข้อมูล</Nav.Link>
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

            <button onClick={() => adminhandlesearch()} className="button-nav">
              ค้นหา
            </button>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <div className="gg">
        {lastsearch
          ? lastsearch.map((doc) => {
            let thiefNameAndSurname = `${doc.name} ${doc.surname}`;
            let thiefAccountNumber = `${doc.accountnumber}`;
              console.log(thiefNameAndSurname);
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
                      ) : (
                        props.showDropdown ? (
                          <button
                            className="search-nav"
                            onClick={() =>
                              (
                                history.push({
                                  pathname: `/thief/post/${thiefAccountNumber}`,
                                  search: "?are you ok",
                                }),
                                window.location.reload(true)
                              )
                            }
                          >
                            <div> {doc.accountnumber}</div>
                          </button>
                        ) : null
                      )}
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
