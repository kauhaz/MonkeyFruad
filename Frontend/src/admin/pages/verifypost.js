import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../../user/components/navnew";
import Listverifypost from "../components/list_verify_post";
import Axios from "axios";
const Verifypost = () => {
  const [report, setReport] = useState();
  const [hideReport, sethideReport] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const initReport = async () => {
    try {
      const Allreport = await Axios.get("http://localhost:7000/post/report/verify");
      setReport(Allreport.data.report);
    } catch (err) {
      console.log("error");
    }
  };
const hideClick = () =>{
  sethideReport(true)
}
  useEffect(() => {
    initReport();
  }, [hideReport]);

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
            return <Listverifypost reportelement={reportelement} key={index} hideClick={hideClick} />;
          })
        : null}
    </div>
  );
};

export default Verifypost;
