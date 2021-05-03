import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navbarAdmin";
import Listhidereport from "../components/listhidereport";
import "./hidereport.css";
import Axios from "axios";
import ScrollToTop from "../../user/components/ScrollToTop";
const Hidereport = () => {
  const [report, setReport] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const initReport = async () => {
    try {
      const Allreport = await Axios.get(
        "https://monkeyfruad01.herokuapp.com/post/report/hide"
      );
      setReport(Allreport.data.report);
      console.log(Allreport.data.report);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    initReport();
  }, []);

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-report">การรายงานโพสต์ของผู้ใช้งาน</h1>
      <div className="container-report5">
        {report ? (
          <h2 className="h2-report">ทั้งหมด {report.length} รายงาน</h2>
        ) : null}
      </div>
      {report
        ? report.map((reportelement, index) => {
            return (
              <Listhidereport reportelement={reportelement} key={index} />
            );
          })
        : null}
        <ScrollToTop/>
    </div>
  );
};

export default Hidereport;
