import React, { useEffect, useState } from "react";
import NavbarPage from "../components/navbarAdmin";
import "./report.css";
import ListNonverifypost from "../components/list_non_verifypost";
import Listverifypost from "../components/list_verify_post";
import Listhidereport from "../components/listhidereport";
import ScrollToTop from "../../user/components/ScrollToTop";
import Axios from "axios";
const Report = () => {
  const [verifypost, setverifypost] = useState();
  const [nonverifypost, setNonverifypost] = useState();
  const [hidereport, setHidereport] = useState();
  const [hide, setHide] = useState(false);
  const [cancleHide, setCancleHide] = useState(false);
  const [deleteReport, setDeleteReport] = useState(false);
  const [showDropdown, SetshowDropdown] = useState(true);
  const [clicknavverify, setClicknavverify] = useState(false);
  const [clicknavhide, setClicknavhide] = useState(false);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };

  const initReport = async () => {
    try {
      const Allreport = await Axios.get(
        "https://monkeyfruad01.herokuapp.com/post/report/non_verify"
      );
      setNonverifypost(Allreport.data.report);
    } catch (err) {
      console.log("error");
    }
  };
  const NavVerify = async () => {
    try {
      const Allreport = await Axios.get(
        "https://monkeyfruad01.herokuapp.com/post/report/verify"
      );
      setverifypost(Allreport.data.report);
      setNonverifypost();
      setHidereport();
      setCancleHide(false);
      setDeleteReport(false);
      setClicknavverify(true);
    } catch (err) {
      console.log(err);
    }
  };
  const NavNonVerify = async () => {
    try {
      const Allreport = await Axios.get(
        "https://monkeyfruad01.herokuapp.com/post/report/non_verify"
      );
      setNonverifypost(Allreport.data.report);
      setverifypost();
      setHidereport();
      setHide(false);
    } catch (err) {
      console.log("error");
    }
  };
  const Navhide = async () => {
    console.log("OK");
    try {
      const Allreport = await Axios.get(
        "https://monkeyfruad01.herokuapp.com/post/report/hide"
      );
      setHidereport(Allreport.data.report);
      setverifypost();
      setNonverifypost();
      setHide(false);
      setClicknavhide(true);
    } catch (err) {
      console.log("error");
    }
  };
  const hideClick = () => {
    setHide(true);
  };
  const CancleClick = () => {
    setCancleHide(true);
  };
  const DeleteClick = () => {
    setDeleteReport(true);
  };
  useEffect(() => {
    if (hide == true) {
      NavVerify();
      setHide(false);
    } else if (cancleHide == true || deleteReport == true) {
      Navhide();
      if (cancleHide == true) {
        setCancleHide(false);
      } else if (deleteReport == true) {
        setDeleteReport(false);
      }
    } else {
      if (clicknavhide == false && clicknavverify == false) {
        initReport();
      }
    }
  }, [hide, cancleHide, deleteReport]);
  // console.log("hide", hide);
  // console.log("canclehide", cancleHide);
  // console.log("deleteReport", deleteReport);
  // console.log("clicknavverify", clicknavverify);
  // console.log("clicknavhide", clicknavhide);
  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-report">รายงานโพสต์</h1>
      <div className="container-report5">
        <div
          className="status-report verify-report"
          onClick={(e) => NavVerify(e)}
        >
          <span>ตรวจสอบโพสต์แล้ว</span>
          <i class="far fa-check-circle"></i>
        </div>
        <div
          className="status-report nonverify-report"
          onClick={(e) => NavNonVerify(e)}
        >
          <span>ยังไม่ตรวจสอบโพสต์</span>
          <i class="far fa-times-circle"></i>
        </div>
        <div
          className="status-report hidden-report"
          onClick={(e) => Navhide(e)}
        >
          <span>ซ่อน</span>
          <i class="far fa-eye-slash"></i>
        </div>
      </div>

      <div className="container-report0">
        {nonverifypost ? (
          <h2 className="h2-report">ทั้งหมด {nonverifypost.length} รายงาน</h2>
        ) : (
          ""
        )}
        {nonverifypost
          ? nonverifypost.map((reportelement) => {
              return <ListNonverifypost reportelement={reportelement} />;
            })
          : null}
        {verifypost ? (
          <h2 className="h2-report">ทั้งหมด {verifypost.length} รายงาน</h2>
        ) : (
          ""
        )}
        {verifypost
          ? verifypost.map((reportelement) => {
              return (
                <Listverifypost
                  reportelement={reportelement}
                  hideClick={hideClick}
                />
              );
            })
          : null}
        {hidereport ? (
          <h2 className="h2-report">ทั้งหมด {hidereport.length} รายงาน</h2>
        ) : (
          ""
        )}
        {hidereport
          ? hidereport.map((reportelement) => {
              return (
                <Listhidereport
                  reportelement={reportelement}
                  CancleClick={CancleClick}
                  DeleteClick={DeleteClick}
                />
              );
            })
          : null}
      </div>
      <div className="container-reportbottom"></div>
      <ScrollToTop />
    </div>
  );
};

export default Report;
