import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";


const Historyitem = ({ ok, user }) => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [mypost, Setmypost] = useState();
  const [error, Seterror] = useState();


  //   let user = auth.currentUser;

  const deleted = async (uid) => {
    try {
      if (user) {
        const postdelete = await Axios.post(
          `http://localhost:7000/post/delete/${uid}`
        );
        console.log(postdelete.data);

        const ok = await Axios.post("http://localhost:7000/post/postapi", {
          result: user,
        });
        console.log(ok.data.item);
        Setmypost(ok.data.item);
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className="container-history1">
        <div className="container-history2">
          <div className="container-historysetiing">
            <div className="menu-containerhistorysetting">
              <div onClick={onClick} className="historybuttonsetting">
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
                      onClick={() => deleted(ok.uid)}
                    >
                      {" "}
                      ลบโพสต์{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-history">
            <Form className="formsize-history">
              <Form.Row>
                <Form.Group
                  as={Col}
                  className="้history-left col-lg-6 col-12"
                  controlId="formGridName"
                >
                  <Form.Label>ชื่อ - นามสกุลผู้โกง</Form.Label>
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
                  className="history-left col-lg-6 col-12"
                  controlId="formGridId"
                >
                  <Form.Label>เลขที่บัญชี (ผู้โกง)</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.accountnumber}</span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-12"
                  controlId="formGridNameproduct"
                >
                  <Form.Label>ชื่อสินค้า</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.nameproduct} </span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-12"
                  controlId="formGridPrice"
                >
                  <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.money} </span>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  className="history-left col-lg-6 col-12"
                  controlId="formGridDate"
                >
                  <Form.Label>วันที่โพสต์</Form.Label>
                </Form.Group>

                <Form.Group>
                  <span className="spanhistory">{ok.date} </span>
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
