import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import * as moment from "moment";
import "moment/locale/th";
import Axios from "axios";
import NavbarPage from "../components/navbarAdmin";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine } from "@coreui/react-chartjs";

import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import "./dashboard.css";

const Dashboard = () => {
  const [show, Setshow] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [typeChart, settypeChart] = useState("Day");
  const [CategoryChart, setCategoryChart] = useState("จำนวนโพสต์");
  const [dataChart, setdataChart] = useState([]);
  const CategoriesChart = ["จำนวนโพสต์", "จำนวนผู้ใช้งานใหม่", "จำนวนค้นหา"];
  var dayOfWeek = [
    moment().subtract(6, "d").format("MMM DD"),
    moment().subtract(5, "d").format("MMM DD"),
    moment().subtract(4, "d").format("MMM DD"),
    moment().subtract(3, "d").format("MMM DD"),
    moment().subtract(2, "d").format("MMM DD"),
    moment().subtract(1, "d").format("MMM DD"),
    moment().format("MMM DD"),
  ];
  var dayOfMonth = [
    moment().subtract(29, "d").format("MMM DD"),
    moment().subtract(28, "d").format("MMM DD"),
    moment().subtract(27, "d").format("MMM DD"),
    moment().subtract(26, "d").format("MMM DD"),
    moment().subtract(25, "d").format("MMM DD"),
    moment().subtract(24, "d").format("MMM DD"),
    moment().subtract(23, "d").format("MMM DD"),
    moment().subtract(22, "d").format("MMM DD"),
    moment().subtract(21, "d").format("MMM DD"),
    moment().subtract(20, "d").format("MMM DD"),
    moment().subtract(19, "d").format("MMM DD"),
    moment().subtract(18, "d").format("MMM DD"),
    moment().subtract(17, "d").format("MMM DD"),
    moment().subtract(16, "d").format("MMM DD"),
    moment().subtract(15, "d").format("MMM DD"),
    moment().subtract(14, "d").format("MMM DD"),
    moment().subtract(13, "d").format("MMM DD"),
    moment().subtract(12, "d").format("MMM DD"),
    moment().subtract(11, "d").format("MMM DD"),
    moment().subtract(10, "d").format("MMM DD"),
    moment().subtract(9, "d").format("MMM DD"),
    moment().subtract(8, "d").format("MMM DD"),
    moment().subtract(7, "d").format("MMM DD"),
    moment().subtract(6, "d").format("MMM DD"),
    moment().subtract(5, "d").format("MMM DD"),
    moment().subtract(4, "d").format("MMM DD"),
    moment().subtract(3, "d").format("MMM DD"),
    moment().subtract(2, "d").format("MMM DD"),
    moment().subtract(1, "d").format("MMM DD"),
    moment().format("MMM DD"),
  ];
  const ChangeCalender = async (type) => {
    console.log(type);
    if (type === "Day") {
      countUserDayOfWeek();
      settypeChart(type);
    } else if (type === "Month") {
      countUserDayOfMonth();
      settypeChart(type);
    } else if (type === "Year") {
      countUserDayOfMonth();
      settypeChart(type);
    }
  };

  const onChangeTypeChart = (type) => {
    settypeChart(type);
  };
  const countPost = () => {
    Axios.get("http://api").then((res) => {
      setdataChart(res.data);
    });
  };
  const countSearch = () => {};
  const countUserDayOfWeek = async (type, Calender) => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/user/listuserofday"
    ).then((res) => {
      countUserApi.push(res.data.data);
      dayOfWeek.forEach((dayofweek) => {
        countUserApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofweek
          ) {
            console.log(count);
            count++;
          }
        });
        countUser.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนผู้ใช้งานในระบบ",
        backgroundColor: "#33b5e5",
        data: countUser,
      },
    ]);
  };
  const countUserDayOfMonth = async (type, Calender) => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/user/listuserofmonth"
    ).then((res) => {
      countUserApi.push(res.data.data);
      dayOfMonth.forEach((dayofweek) => {
        countUserApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofweek
          ) {
            console.log(count);
            count++;
          }
        });
        countUser.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนผู้ใช้งานในระบบ",
        backgroundColor: "#33b5e5",
        data: countUser,
      },
    ]);
  };
  useEffect(() => {
    //default get day
    countUserDayOfWeek();
  }, []);

  return (
    <div>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <CCard>
        <CCardBody className="admin-cardbody">
          <CRow>
            <CCol sm="5">
              {/* <h4 id="traffic" className="card-title mb-0">
                จำนวน
              </h4>
              <div className="small text-muted">November 2017</div> */}
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {/* 3 ปุ่ม */}
                {CategoriesChart.map((value) => (
                  <CButton
                    color="secondary"
                    className="admin-CategoriesChart"
                    onClick={() => onChangeTypeChart(value)}
                  >
                    {value}
                  </CButton>
                ))}
                {/* เลือก วันเดือนปี */}
                <CSelect
                  className="admin-select-chart"
                  onChange={(e) => ChangeCalender(e.target.value)}
                >
                  <option selected value="Day">
                    7 วันที่แล้ว
                  </option>
                  <option value="Month">30 วันที่แล้ว</option>
                  <option value="Year">ปีปัจจุบัน</option>
                </CSelect>
              </CButtonGroup>
            </CCol>
          </CRow>
          {typeChart === "Day" ? (
            <CChartLine
              datasets={dataChart}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
              labels={dayOfWeek}
            />
          ) : null}
          {typeChart === "Month" ? (
            <CChartLine
              datasets={dataChart}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
              labels={dayOfMonth}
            />
          ) : null}
          {typeChart === "Year" ? (
            <CChartLine
              datasets={dataChart}
              options={{
                tooltips: {
                  enabled: true,
                },
              }}
              labels="months"
            />
          ) : null}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Dashboard;
