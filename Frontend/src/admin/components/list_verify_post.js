import React, { useEffect, useState, useContext } from "react";
import { Form, Col, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
const Listverifypost = ({ reportelement, key,hideClick }) => {
  const [UsernamePost, SetUsernamePost] = useState("");
  const [UsernameReport, SetUsernameReport] = useState("");
  const InitReport = async () => {
    try {
      const usernamepost = await Axios.get(
        `http://localhost:7000/post/mypost/${reportelement.postid}`
      );
      SetUsernamePost(usernamepost.data.item);
      console.log(usernamepost.data.item);
      const usernamereport = await Axios.get(
        `http://localhost:7000/user/session/${reportelement.userreport}`
      );
      SetUsernameReport(usernamereport.data.item);
      console.log(usernamereport.data.item);
    } catch (err) {
      console.log(err);
    }
  };
  const ChangeRead = async (e) => {
    e.preventDefault()
    await Axios.post(
      `http://localhost:7000/post/report/changereadhide/${reportelement.uid}`
    );
    hideClick()
  };
  useEffect(() => {
    InitReport();
  }, []);
  return (
    <div>
      <div className="container-history1">
        <div className="container-history2">
          <button onClick={(e)=>ChangeRead(e)}>ซ่อน</button>
          <Form className="formsize-history">
            <Form.Row>
              <Form.Group
                as={Col}
                className="้history-left col-lg-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  ผุ้แจ้งการรายงาน :{" "}
                  {UsernameReport && UsernameReport[0].username}{" "}
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="ข้อมูลไม่เหมาะสม" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้history-left col-lg-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  วันเวลาที่แจ้ง :{" "}
                  {moment(new Date(reportelement.date.seconds * 1000)).format(
                    "MM/DD/YYYY HH:mm"
                  )}{" "}
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="ข้อมูลไม่ถูกต้อง" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้history-left col-lg-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>
                  เจ้าของโพสต์ : {UsernamePost && UsernamePost[0].username}{" "}
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="อื่นๆ" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                className="้history-left col-lg-6 col-12"
                controlId="formGridName"
              >
                <Form.Label>เอกสารที่แนบมา : </Form.Label>
                <Form.Label>
                  จำนวนครั้งที่มีการรายงานโพสต์นี้ {reportelement.count} ครั้ง
                </Form.Label>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <Form.Control as="textarea" rows={4} readOnly={true} />
              </Form.Group>
            </Form.Row>
          </Form>
          <div className="historyother">
            <Link
              className="historyother1"
              to={`/post/${reportelement.postid}`}
            >
              ตรวจสอบโพสต์
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listverifypost;
