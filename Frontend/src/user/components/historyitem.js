import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
import Modaldelete from "./Modaldelete";

const Historyitem = ({ ok, user, handledeletetorerender }) => {
  const [isActive, setIsActive] = useState(false);
  const [openmodal, Setopenmodal] = useState(false);
  const [modalcommentid, Setmodalcommentid] = useState();
  const [modalcommentmore, Setmodalcommentmore] = useState();
  const [fuck, Setfuck] = useState([]);
  const [imagesFile, setImagesFile] = useState();
  const [files, Setfiles] = useState();

  const newdate = new Date(ok.date.seconds * 1000);
  let date = moment(newdate).format("lll");

  const handlemodalopen = async () => {
    Setopenmodal(true);
  };
  const handlemodalclose = async () => {
    Setopenmodal(false);
  };
  return (
    <div
      onClick={() => {
        if (isActive == true) {
          setIsActive(false);
        }
      }}
    >
      <div className="container-history1">
        <div className="container-history2">
          <div className="container-historysetiing">
            <div className="menu-containerhistorysetting">
              <div
                onClick={() => {
                  setIsActive(!isActive);
                }}
                className="historybuttonsetting"
              >
                <img
                  className="historyimg-setting"
                  src="/img/setting.png"
                  alt="avatar"
                ></img>
              </div>
              <div
                className={`historymenusetting ${
                  isActive ? "active" : "inactive"
                }`}
              >
                <ul className="ul-historymenusetting">
                  <li className="li-historymenusetting">
                    <a className="a-historymenusetting">
                      <Link
                        className="a-historymenusetting1"
                        to={`/post/edit/${ok.uid}`}
                      >
                        แก้ไขโพสต์
                      </Link>
                    </a>
                  </li>
                  <li className="li-historymenusetting">
                    <a
                      className="a-historymenusetting"
                      onClick={() => (
                        Setmodalcommentid(ok.uid),
                        Setmodalcommentmore(ok),
                        setIsActive(false),
                        handlemodalopen()
                      )}
                    >
                      {" "}
                      ลบโพสต์{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <Modaldelete
              text={"deletepost"}
              openmodal={openmodal}
              handlemodalclose={handlemodalclose}
              modalcommentid={modalcommentid}
              modalcommentmore={modalcommentmore}
              setIsActive={setIsActive}
              Setfuck={Setfuck}
              setImagesFile={setImagesFile}
              Setfiles={Setfiles}
              handledeletetorerender={handledeletetorerender}
            />
          </div>
          <div className="container-history">
            <Form className="formsize-history">
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="้history-left col-lg-6 col-md-6 col-5"
                  controlId="formGridName"
                >
                  <Form.Label className="left-history">
                    ชื่อ - นามสกุลผู้โกง
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">
                    {ok.name} {ok.surname}
                  </span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-md-6 col-5"
                  controlId="formGridId"
                >
                  <Form.Label className="left-history">
                    เลขที่บัญชี (ผู้โกง)
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.accountnumber}</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-md-6 col-5"
                  controlId="formGridNameproduct"
                >
                  <Form.Label className="left-history">ชื่อสินค้า</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.nameproduct} </span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-md-6 col-5"
                  controlId="formGridPrice"
                >
                  <Form.Label className="left-history">จำนวนเงิน</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">
                    {ok.money.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    บาท
                  </span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-md-6 col-5"
                  controlId="formGridDate"
                >
                  <Form.Label className="left-history">วันที่โพสต์</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{date} </span>
                </Form.Group>
              </Form.Row>
            </Form>
            <div className="historyother">
              <Link className="historyother1" to={`/mypost/${ok.uid}`}>
                ดูเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Historyitem;
