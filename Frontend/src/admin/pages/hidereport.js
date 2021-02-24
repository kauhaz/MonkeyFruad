import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../../user/components/navnew";
import Listhidereport from "../components/listhidereport";
import "../../user/pages/history.css";
import Axios from "axios";
const Hidereport = () => {
  const [report, setReport] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const initReport = async () => {
    try {
      const Allreport = await Axios.get(
        "http://localhost:7000/post/report/hide"
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
      <h1 className="h1-history">การรายงานโพสต์ของผู้ใช้งาน</h1>
      <div className="container-history5">
        {report ? (
          <h2 className="h2-history">ทั้งหมด {report.length} รายงาน</h2>
        ) : null}
      </div>
      {report
        ? report.map((reportelement, index) => {
            return (
              <Listhidereport reportelement={reportelement} key={index} />
            );
          })
        : null}
    </div>
  );
};

export default Hidereport;
