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

  const ChangeCalender = (type) => {
    setCategoryChart(type);
    getData(type);
  };

  const onChangeTypeChart = (type) => {
    settypeChart(type);
    getData(type);
  };

  const getData = (type, Calender) => {
    //sent type get data from api
    Axios.get("http://api").then((res) => {
      setdataChart(res.data);
    });

    setdataChart([
      {
        label: "Data One",
        backgroundColor: "#33b5e5",
        data: [30, 39, 10, 50, 30, 70, 35],
      },
    ]);
  };

  useEffect(() => {
    //default get day
    getData(typeChart, CategoryChart);
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
                {CategoriesChart.map((value) => (
                  <CButton 
                    color="secondary"
                    key={value}
                    className="admin-CategoriesChart"
                    active={value === "Month"}
                    onClick={(e) => onChangeTypeChart(value)}
                  >
                    {value}
                  </CButton>
                ))}
                <CSelect
                  className="admin-select-chart"
                  onchange={(event) => ChangeCalender(event.target.value)}
                >
                  <option selected value="Day">
                    วัน
                  </option>
                  <option value="Month">เดือน</option>
                  <option value="Year">ปี</option>
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
              labels="months"
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
              labels="months"
            />
          ) : null}
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">จำนวนโพสต์</div>
              <strong>24.093 โพสต์ (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">จำนวนผู้ใช้งานใหม่</div>
              <strong>78.706 คน (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">จำนวนค้นหา</div>
              <strong>22.123 ครั้ง (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default Dashboard
