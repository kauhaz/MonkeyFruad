import React, { useEffect, useState } from "react";
import * as moment from "moment";
import "moment/locale/th";
import NavbarPage from "../components/navbarAdmin";
import Axios from "axios";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import ClipLoader from "../../user/components/clipLoader";
import ScrollToTop from "../../user/components/ScrollToTop";

import "../../user/pages/post.css";

const Findthief = () => {
  const history = useHistory();

  let { uid } = useParams();

  const [show, Setshow] = useState();
  const [loading, Setloading] = useState();
  const [Loading, SetLoading] = useState(true);

  const [showDropdown, SetshowDropdown] = useState(true);
  const [numberAccount, setNumberAccount] = useState(false);
  const [nameSurname, setNameSurname] = useState(true);

  let location = useLocation();
  const ok = async () => {
    const getpost = await Axios.get(
      `https://monkeyfruad01.herokuapp.com/thief/post/${uid}`
    );
    SetLoading(false);
    Setshow(getpost.data.item);
    if (uid.match(/[0-9]/g)) {
      setNumberAccount(true);
      setNameSurname(false);
    }
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
        <div className="postbigrows">
          <div className="post-left1">
            <h1 className="h1-posts">
              {" "}
              ผลการค้นหา{" "}
              <span className="spansearch">
              "{show && show.length > 0 && nameSurname && show[0].name}
                {nameSurname ? " " : null}
                {show && show.length > 0 && nameSurname && show[0].surname}
                {show &&
                  show.length > 0 &&
                  numberAccount &&
                  show[0].accountnumber}
                "
              </span>{" "}
              <div className="none-search"></div>
              มีทั้งหมด {show ? show.length : null} โพสต์
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
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridName"
                                >
                                  <Form.Label>ชื่อ - นามสกุลผู้โกง</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
                                  <span className="spanpost">
                                    {res.name}{" "}
                                    <div className="none-lastname"></div>{" "}
                                    {res.surname}
                                  </span>
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridId"
                                >
                                  <Form.Label>เลขที่บัญชี (ผู้โกง)</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
                                  <span className="spanpost">
                                    {res.accountnumber}
                                  </span>
                                </Form.Group>
                              </Form.Row>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridNameproduct"
                                >
                                  <Form.Label>ชื่อสินค้า</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
                                  <span className="spanpost">
                                    {res.nameproduct}{" "}
                                  </span>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridPrice"
                                >
                                  <Form.Label>จำนวนเงิน</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
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
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridDate"
                                >
                                  <Form.Label>วันที่โดนโกง</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
                                  <span className="spanpost">
                                    {moment(
                                      new Date(res.datetimes.seconds * 1000)
                                    ).format("DD/MM/YYYY HH:mm")}{" "}
                                  </span>
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  className="้post-left col-lg-6 col-6"
                                  controlId="formGridDate"
                                >
                                  <Form.Label>ช่องทางการโดนโกง</Form.Label>
                                </Form.Group>

                                <Form.Group className="post-right col-lg-6 col-6">
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
            <div className="container-postbottoms"></div>
          </div>
        </div>
      </div>
      <ScrollToTop/>
    </div>
  );
};

export default Findthief;
