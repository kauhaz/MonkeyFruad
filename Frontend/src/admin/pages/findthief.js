import React, { useEffect, useState } from "react";
import * as moment from "moment";
import "moment/locale/th";
import NavbarPage from "../../user/components/navnew";
import Axios from "axios";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import ClipLoader from "../../user/components/clipLoader";

import "../../user/pages/post.css";

const Findthief = () => {
  const history = useHistory();

  let { uid } = useParams();

  const [show, Setshow] = useState();
  const [loading, Setloading] = useState();
  const [Loading, SetLoading] = useState(true);

  const [showDropdown, SetshowDropdown] = useState(true);

  let location = useLocation();
  const ok = async () => {
    const getpost = await Axios.get(`http://localhost:7000/thief/post/${uid}`);
<<<<<<< HEAD
    Setdoc(location.state.doc);
=======
    SetLoading(false)
>>>>>>> 983933ee09e1f405f7a26631639709d1bd9898d8
    Setshow(getpost.data.item);
  };
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  useEffect(() => {
    ok();
  }, []);
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
            <h1 className="h1-posts">
              {" "}
              ผลการค้นหา * {show && show[0].name} {show && show[0].surname}{" "}
              {show && show[0].accountnumber} * มีทั้งหมด{" "}
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
                            <div className="postothers">
                              <Link
                                className="postothers1"
                                onClick={() => (
                                  history.push(`/post/${res.uid}`),
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

          <div className="column-post-right1"></div>
        </div>
      </div>
    </div>
  );
};

export default Findthief;
