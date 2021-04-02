import React, { useEffect, useState } from "react";
import * as moment from "moment";
import "moment/locale/th";
import NavbarPage from "../components/navnew";
import Axios from "axios";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import Chatbot from "../components/chatbot";
import { Form, Col } from "react-bootstrap";
import ClipLoader from "../components/clipLoader";
import "./post.css";

const Findthief = () => {
  const history = useHistory();

  let { uid } = useParams();

  const [show, Setshow] = useState();
  const [loading, Setloading] = useState();
  const [Loading, SetLoading] = useState(true);

  const [showDropdown, SetshowDropdown] = useState(true);

  let location = useLocation();
  const ok = async () => {
    const getpost = await Axios.get(`https://monkeyfruad01.herokuapp.com/thief/post/${uid}`);
    Setshow(getpost.data.item);
    SetLoading(false);
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  useEffect(() => {
    ok();
  }, []);

  console.log(show);
  return Loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-bigpost1">
        <div className="row postbigrow">
          <div className="column-post-left1">
            <Link to={`/linkruleshow/`}>
              <div className="container-post1">
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
            </Link>

            <h1 className="h1-posts">
              {" "}
              ผลการค้นหา <span className="spansearch">"{show && show[0].name} {show && show[0].surname}{" "}
              {show && show[0].accountnumber}"</span> มีทั้งหมด{" "}
              {show ? show.length : null} โพสต์
            </h1>

            {loading ? (
              <ClipLoader />
            ) : (
              <div>
                {show ? (
                  show.map((res) => {
                    return (
                      <div>
                        <div className="container-posts2">
                          <div className="container-postss3">
                            <Form className="formsize-post">
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="้post-left col-lg-6 col-12"
                                  controlId="formGridName"
                                >
                                  <Form.Label>ชื่อ - นามสกุลผู้โกง</Form.Label>
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
                                  <Form.Label>เลขที่บัญชี (ผู้โกง)</Form.Label>
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
                                  controlId="formGridPrice"
                                >
                                  <Form.Label>จำนวนเงิน</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                  <span className="spanpost">
                                    {res.money.toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                    })}{" "}
                                    บาท
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
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="post-left col-lg-6 col-12"
                                  controlId="formGridDate"
                                >
                                  <Form.Label>ช่องทางการโดนโกง</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                  <span className="spanpost">
                                    {res.social}{" "}
                                  </span>
                                </Form.Group>
                              </Form.Row>
                            </Form>
                            <div className="postothers">
                              <Link
                                className="postothers1"
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
                ) : (
                  <div> {loading ? <ClipLoader /> : null}</div>
                )}
              </div>
            )}
            <div className="container-bottoms"></div>
          </div>

          <div className="column-post-right1">
            <a href="https://www.facebook.com/MonkeyFruad-105444291586616">
              <div className="container-postright1">
                <div className="post-linkpost2">
                  ติดต่อเพจน้องพะโล้ <br />
                  เพื่ออัพเดทข่าวสารและพูดคุยกันได้ที่นี่
                </div>
                <div className="post-img1">
                  <img className="facebook" src="/img/facebooklogo.png" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Findthief;
