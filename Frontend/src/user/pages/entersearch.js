import React, { useEffect, useState } from "react";
import * as moment from "moment";
import "moment/locale/th";
import NavbarPage from "../components/navnew";
import Notfound from "../components/Notfound";

import { Link, useHistory, useLocation } from "react-router-dom";
import Chatbot from "../components/chatbot";

import { Form, Col } from "react-bootstrap";

import "./entersearch.css";

const Entersearch = () => {
  const history = useHistory();
  const [show, Setshow] = useState();
  const [search, Setsearch] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const ok = async () => {
    await Setshow(location.state.getdata);
    await Setsearch(location.state.search);
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  useEffect(() => {
    ok();
    setLoading(false);
  }, [location]);

  return loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      {show && show.length !== 0 ? (
        <div>
          {" "}
          <NavbarPage
            SetshowDropdown={SetshowDropdown}
            showDropdown={showDropdown}
          />
          <div className="container-bigpost1">
            <div className="row postbigrow">
              <div className="column-post-left1">
                <Link to={`/linkruleshow/`}>
                  <div className="container-post1">
                    <div className="row postrow">
                      <div className="column1-postrow1">
                        <div className="post-img">
                          <img className="monkey" src="/img/logo v3.png" />
                        </div>
                      </div>
                      <div className="column2-postrow2">
                        <div className="post-linkpost1">
                          แจ้งข้อมูลคนโกงได้ที่นี่เลย
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <h1 className="h1-posts">
                  {" "}
                  มีโพสต์ทั้งหมด {show ? show.length : null} โพสต์
                </h1>

                {show
                  ? show.map((res) => {
                      return (
                        <div>
                          <div className="container-entersearch2">
                            <div className="container-entersearch3">
                              <Form className="formsize-post">
                                <Form.Row>
                                  <Form.Group
                                    as={Col}
                                    className="้post-left col-lg-6 col-12"
                                    controlId="formGridName"
                                  >
                                    <Form.Label>
                                      ชื่อ - นามสกุลผู้โกง
                                    </Form.Label>
                                  </Form.Group>

                                  <Form.Group>
                                    <span className="spanpost">
                                      {res.name} {res.surname}
                                    </span>
                                  </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                  <Form.Group
                                    as={Col}
                                    className="post-left col-lg-6 col-12"
                                    controlId="formGridId"
                                  >
                                    <Form.Label>
                                      เลขที่บัญชี (ผู้โกง)
                                    </Form.Label>
                                  </Form.Group>

                                  <Form.Group>
                                    <span className="spanpost">
                                      {res.accountnumber}
                                    </span>
                                  </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                  <Form.Group
                                    as={Col}
                                    className="post-left col-lg-6 col-12"
                                    controlId="formGridNameproduct"
                                  >
                                    <Form.Label>ชื่อสินค้า</Form.Label>
                                  </Form.Group>

                                  <Form.Group>
                                    <span className="spanpost">
                                      {res.nameproduct}{" "}
                                    </span>
                                  </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                  <Form.Group
                                    as={Col}
                                    className="post-left col-lg-6 col-12"
                                    controlId="formGridDate"
                                  >
                                    <Form.Label>วันที่โดนโกง</Form.Label>
                                  </Form.Group>

                                  <Form.Group>
                                    <span className="spanpost">
                                      {moment(
                                        new Date(res.datetimes.seconds * 1000)
                                      ).format("MM/DD/YYYY HH:mm")}{" "}
                                    </span>
                                  </Form.Group>
                                </Form.Row>
                              </Form>
                              <div className="postother">
                                <Link
                                  className="postother1"
                                  onClick={() => (
                                    history.push(`/mypost/${res.uid}`),
                                    window.location.reload(true)
                                  )}
                                >
                                  ดูเพิ่มเติม
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className="column-post-right1">
                <Link to={`https://www.facebook.com/porpraewz.mgn`}>
                  <div className="container-postright1">
                    <div className="post-linkpost2">
                      ติดต่อเพจน้องพะโล้ <br />
                      เพื่ออัพเดทข่าวสารและพูดคุยกันได้ที่นี่
                    </div>
                    <div className="post-img1">
                      <img className="facebook" src="/img/facebook.jpg" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Chatbot />{" "}
        </div>
      ) : (
        <Notfound
          search={search}
          SetshowDropdown={SetshowDropdown}
          showDropdown={showDropdown}
        />
      )}
    </div>
  );
};

export default Entersearch;
