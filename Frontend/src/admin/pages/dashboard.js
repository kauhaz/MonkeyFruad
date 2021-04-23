import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import * as moment from "moment";
import "moment/locale/th";
import Axios from "axios";
import NavbarPage from "../components/navbarAdmin";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CSelect,
} from "@coreui/react";
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
  var dayOfYear = [
    moment().startOf("year").format("MMM YYYY"),
    moment().startOf("year").add(1, "month").format("MMM YYYY"),
    moment().startOf("year").add(2, "month").format("MMM YYYY"),
    moment().startOf("year").add(3, "month").format("MMM YYYY"),
    moment().startOf("year").add(4, "month").format("MMM YYYY"),
    moment().startOf("year").add(5, "month").format("MMM YYYY"),
    moment().startOf("year").add(6, "month").format("MMM YYYY"),
    moment().startOf("year").add(7, "month").format("MMM YYYY"),
    moment().startOf("year").add(8, "month").format("MMM YYYY"),
    moment().startOf("year").add(9, "month").format("MMM YYYY"),
    moment().startOf("year").add(10, "month").format("MMM YYYY"),
    moment().startOf("year").add(11, "month").format("MMM YYYY"),
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
      countUserDayOfYear();
      settypeChart("userOfYear");
    } else if (type === "Day" && CategoryChart === "จำนวนโพสต์") {
      countPostDayOfWeek();
      settypeChart("postOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนโพสต์") {
      countPostDayOfMonth();
      settypeChart("postOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนโพสต์") {
      countUserDayOfMonth();
      settypeChart("postOfYear");
    } else if (type === "Day" && CategoryChart === "จำนวนค้นหา") {
      countSearchDayOfWeek();
      settypeChart("searchOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนค้นหา") {
      countSearchDayOfMonth();
      settypeChart("searchOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนค้นหา") {
      countSearchDayOfYear();
      settypeChart("searchOfYear");
    } else if (type === "Day" && CategoryChart === "จำนวนการรายงาน") {
      countReportDayOfWeek();
      settypeChart("reportOfDay");
    } else if (type === "Month" && CategoryChart === "จำนวนการรายงาน") {
      countReportDayOfMonth();
      settypeChart("reportOfMonth");
    } else if (type === "Year" && CategoryChart === "จำนวนการรายงาน") {
      countReportDayOfYear();
      settypeChart("reportOfYear");
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
      countUserDayOfYear();
      settypeChart("userOfYear");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Day") {
      countPostDayOfWeek();
      settypeChart("postOfDay");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Month") {
      countPostDayOfMonth();
      settypeChart("postOfMonth");
    } else if (type === "จำนวนโพสต์" && selectDateChart === "Year") {
      countPostDayOfYear();
      settypeChart("postOfYear");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Day") {
      countSearchDayOfWeek();
      settypeChart("searchOfDay");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Month") {
      countSearchDayOfMonth();
      settypeChart("searchOfMonth");
    } else if (type === "จำนวนค้นหา" && selectDateChart === "Year") {
      countSearchDayOfYear();
      settypeChart("searchOfYear");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Day") {
      countReportDayOfWeek();
      settypeChart("reportOfDay");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Month") {
      countReportDayOfMonth();
      settypeChart("reportOfMonth");
    } else if (type === "จำนวนการรายงาน" && selectDateChart === "Year") {
      countReportDayOfYear();
      settypeChart("reportOfYear");
    }
  };
  const countUserDayOfWeek = async () => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
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
            count++;
          }
        });
        countUser.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนผู้ใช้งานในเว็บ (คน)",
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill: false,
        data: countUser,
      },
    ]);
  };
  const countUserDayOfMonth = async () => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
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
        label: "จำนวนผู้ใช้งานในเว็บ (คน)",
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill: false,
        data: countUser,
      },
    ]);
  };
  const countUserDayOfYear = async () => {
    let countUserApi = [];
    let countUser = [];
    let count = 0;
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/user/listuserofyear"
    ).then((res) => {
      countUserApi.push(res.data.data);
      dayOfYear.forEach((dayofYear) => {
        countUserApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM YYYY") ==
            dayofYear
          ) {
            count++;
          }
        });
        countUser.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนผู้ใช้งานในเว็บ (คน)",
        backgroundColor: "#3399ff",
        borderColor: "#33b5e5",
        fill: false,
        data: countUser,
      },
    ]);
  };
  const countPostDayOfWeek = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
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
        label: "จำนวนโพสต์บนเว็บ (โพสต์)",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill: false,
        data: countPost,
      },
    ]);
  };
  const countPostDayOfMonth = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
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
            count++;
          }
        });
        countPost.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนโพสต์บนเว็บ (โพสต์)",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill: false,
        data: countPost,
      },
    ]);
  };
  const countPostDayOfYear = async () => {
    let countPostApi = [];
    let countPost = [];
    let count = 0;
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listpostofyear"
    ).then((res) => {
      countPostApi.push(res.data.data);
      dayOfYear.forEach((dayofYear) => {
        countPostApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM YYYY") ==
            dayofYear
          ) {
            count++;
          }
        });
        countPost.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนโพสต์บนเว็บ (โพสต์)",
        backgroundColor: "#f9b115",
        borderColor: "#f9b115",
        fill: false,
        data: countPost,
      },
    ]);
  };
  const countSearchDayOfWeek = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
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
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการค้นหาบนเว็บ (ครั้ง)",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill: false,
        data: countSearch,
      },
    ]);
  };
  const countSearchDayOfMonth = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
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
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการค้นหาบนเว็บ (ครั้ง)",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill: false,
        data: countSearch,
      },
    ]);
  };
  const countSearchDayOfYear = async () => {
    let countSearchApi = [];
    let countSearch = [];
    let count = 0;
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listsearchofyear"
    ).then((res) => {
      countSearchApi.push(res.data.data);

      dayOfYear.forEach((dayofYear) => {
        countSearchApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM YYYY") ==
            dayofYear
          ) {
            count++;
          }
        });
        countSearch.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการค้นหาบนเว็บ (ครั้ง)",
        backgroundColor: "#e55353",
        borderColor: "#e55353",
        fill: false,
        data: countSearch,
      },
    ]);
  };
  const countReportDayOfWeek = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
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
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน (ครั้ง)",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill: false,
        data: countReport,
      },
    ]);
  };
  const countReportDayOfMonth = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
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
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน (ครั้ง)",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill: false,
        data: countReport,
      },
    ]);
  };
  const countReportDayOfYear = async () => {
    let countReportApi = [];
    let countReport = [];
    let count = 0;
    await Axios.get(
      "https://monkeyfruad01.herokuapp.com/post/listreportofyear"
    ).then((res) => {
      countReportApi.push(res.data.data);

      dayOfYear.forEach((dayofYear) => {
        countReportApi[0].forEach((element) => {
          if (
            moment(new Date(element.date.seconds * 1000)).format("MMM YYYY") ==
            dayofYear
          ) {
            count++;
          }
        });
        countReport.push(count);
        count = 0;
      });
    });
    setdataChart([
      {
        label: "จำนวนการรายงานของผู้ใช้งาน (ครั้ง)",
        backgroundColor: "#2eb85c",
        borderColor: "#2eb85c",
        fill: false,
        data: countReport,
      },
    ]);
  };
  useEffect(() => {
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
            <CCol sm="5"></CCol>
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
