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
  CCol,
  CProgress,
  CRow,
  CCallout,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CChartLine } from "@coreui/react-chartjs";
import "./dashboard.css";

const Dashboard = () => {
  const [show, Setshow] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const [typeChart, settypeChart] = useState("userOfDay");
  const [CategoryChart, setCategoryChart] = useState("จำนวนผู้ใช้งานใหม่");
  const [selectDateChart, setSelectDateChart] = useState("Day");
  const [dataChart, setdataChart] = useState([]);
  const CategoriesChart = [
    "จำนวนโพสต์",
    "จำนวนผู้ใช้งานใหม่",
    "จำนวนค้นหา",
    "จำนวนการรายงาน",
  ];
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
    setSelectDateChart(type);
    if (type === "Day" && CategoryChart === "จำนวนผู้ใช้งานใหม่") {
      countUserDayOfWeek();
      settypeChart("userOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนผู้ใช้งานใหม่") {
      countUserDayOfMonth();
      settypeChart("userOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนผู้ใช้งานใหม่") {
      countUserDayOfMonth();
      settypeChart("userOfYear");
    } else if (type === "Day" && CategoryChart === "จำนวนโพสต์") {
      countPostDayOfWeek();
      settypeChart("postOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนโพสต์") {
      countPostDayOfMonth();
      settypeChart("postOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนโพสต์") {
      // countUserDayOfMonth();
      // settypeChart("userOfYear");
    } else if (type === "Day" && CategoryChart === "จำนวนค้นหา") {
      countSearchDayOfWeek();
      settypeChart("searchOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนค้นหา") {
      countSearchDayOfMonth();
      settypeChart("searchOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนค้นหา") {
      // countPostDayOfWeek();
      // settypeChart("searchOfDay");
    } else if (type === "Day" && CategoryChart === "จำนวนการรายงาน") {
      countReportDayOfWeek();
      settypeChart("reportOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนการรายงาน") {
      countReportDayOfMonth();
      settypeChart("reportOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนการรายงาน") {
      // countPostDayOfWeek();
      // settypeChart("searchOfDay");
    }
  };

  const onChangeCategoryChart = (type) => {
    setCategoryChart(type);
    if (type === "จำนวนผู้ใช้งานใหม่" && selectDateChart === "Day") {
      countUserDayOfWeek();
      settypeChart("userOfDay");
    } else if (type === "จำนวนผู้ใช้งานใหม่" && selectDateChart === "Month") {
      countUserDayOfMonth();
      settypeChart("userOfMonth");
    } else if (type === "จำนวนผู้ใช้งานใหม่" && selectDateChart === "Year") {
      countUserDayOfMonth();
      settypeChart("userOfYear");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Day") {
      countPostDayOfWeek();
      settypeChart("postOfDay");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Month") {
      countPostDayOfMonth();
      settypeChart("postOfMonth");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Year") {
      // countUserDayOfMonth();
      // settypeChart("userOfYear");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Day") {
      countSearchDayOfWeek();
      settypeChart("searchOfDay");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Month") {
      countSearchDayOfMonth();
      settypeChart("searchOfMonth");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Year") {
      // countPostDayOfWeek();
      // settypeChart("searchOfDay");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Day") {
      countReportDayOfWeek();
      settypeChart("reportOfDay");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Month") {
      countReportDayOfMonth();
      settypeChart("reportOfMonth");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Year") {
      // countPostDayOfWeek();
      // settypeChart("searchOfDay");
    }
  };
  const countUserDayOfWeek = async () => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/user/listuserofday"
    ).then((res) => {
      countUserApi.push(res.data.data);
      dayOfWeek.forEach((dayofWeek) => {
        countUserApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofWeek
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
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill : false,
        data: countUser
      },
    ]);
  };
  const countUserDayOfMonth = async () => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/user/listuserofmonth"
    ).then((res) => {
      countUserApi.push(res.data.data);
      dayOfMonth.forEach((dayofMonth) => {
        countUserApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
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
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill : false,
        data: countUser
      },
    ]);
  };
  const countUserDayOfYear = async () => {
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
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill : false,
        data: countUser
      },
    ]);
  };
  const countPostDayOfWeek = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listpostofday"
    ).then((res) => {
      countPostApi.push(res.data.data);
      dayOfWeek.forEach((dayofWeek) => {
        countPostApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofWeek
          ) {
            console.log(count);
            count++;
          }
        });
        countPost.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนโพสต์ในระบบ",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill : false,
        data: countPost
      },
    ]);
  };
  const countPostDayOfMonth = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listpostofmonth"
    ).then((res) => {
      countPostApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countPostApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countPost.push(count);
        count = 0;
      });
      console.log(countPost);
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนโพสต์ในระบบ",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill : false,
        data: countPost
      },
    ]);
  };
  const countPostDayOfYear = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listpostofmonth"
    ).then((res) => {
      countPostApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countPostApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countPost.push(count);
        count = 0;
      });
      console.log(countPost);
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนโพสต์ในระบบ",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill : false,
        data: countPost
      },
    ]);
  };
  const countSearchDayOfWeek = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listsearchofday"
    ).then((res) => {
      countSearchApi.push(res.data.data);

      dayOfWeek.forEach((dayofWeek) => {
        countSearchApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofWeek
          ) {
            console.log(count);
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการค้นหาในระบบ",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill : false,
        data: countSearch
      },
    ]);
  };
  const countSearchDayOfMonth = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listsearchofmonth"
    ).then((res) => {
      countSearchApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countSearchApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการค้นหาในระบบ",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill : false,
        data: countSearch
      },
    ]);
  };
  const countSearchDayOfYear = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listsearchofmonth"
    ).then((res) => {
      countSearchApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countSearchApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการค้นหาในระบบ",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill : false,
        data: countSearch
      },
    ]);
  };
  const countReportDayOfWeek = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listreportofday"
    ).then((res) => {
      countReportApi.push(res.data.data);

      dayOfWeek.forEach((dayofWeek) => {
        countReportApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofWeek
          ) {
            console.log(count);
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill : false,
        data: countReport,
      },
    ]);
  };
  const countReportDayOfMonth = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listreportofmonth"
    ).then((res) => {
      countReportApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countReportApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill : false,
        data: countReport,
      },
    ]);
  };
  const countReportDayOfYear = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
    //sent type get data from api
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listsearchofyear"
    ).then((res) => {
      countReportApi.push(res.data.data);

      dayOfMonth.forEach((dayofMonth) => {
        countReportApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM DD") ==
            dayofMonth
          ) {
            console.log(count);
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    // console.log(countUser);
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill : false,
        data: countReport,
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
            <CCol sm="7" className="d-md-block">
              <CButtonGroup className="admin-CategoriesChart">
                {/* 3 ปุ่ม */}
                {CategoriesChart.map((value) => (
                  <CButton
                    color="secondary"
                    className="admin-CategoriesChart-button"
                    onClick={() => onChangeCategoryChart(value)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
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
            </CCol>
          </CRow>
          {typeChart === "userOfDay" ? (
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
          {typeChart === "userOfMonth" ? (
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
          {typeChart === "userOfYear" ? (
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
          {typeChart === "postOfDay" ? (
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
          {typeChart === "postOfMonth" ? (
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
          {typeChart === "postOfYear" ? (
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
          {typeChart === "searchOfDay" ? (
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
          {typeChart === "searchOfMonth" ? (
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
          {typeChart === "searchOfYear" ? (
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
          {typeChart === "reportOfDay" ? (
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
          {typeChart === "reportOfMonth" ? (
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
          {typeChart === "reportOfYear" ? (
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
      <div className="container-postbottoms"></div>
    </div>
  );
};

export default Dashboard;
