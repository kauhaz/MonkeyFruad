import React, { useEffect, useState, useMemo } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import { MDBContainer, MDBRow, MDBBox, MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import { MDBDataTable } from "mdbreact";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBView,
  MDBIcon,
} from "mdbreact";
import { useAccordionToggle } from "react-bootstrap";
import Axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
const Rank = () => {
  var thiefData = [];
  const [ThiefCount, setThiefCount] = useState();
  const [dataRow, setDataRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectOption, setSelectOption] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const getAPI = async () => {
    const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
    thiefData = getThief.data;
  };
  // const setRow = async () => {
  //   setDataRow(ThiefLoading());
  // };
  const GetThiefThreeRank = async () => {
    const thiefcount = await Axios.get(
      "http://localhost:7000/thief/orderbycount"
    );
    setThiefCount(thiefcount.data.data);
  }
  useMemo(async () => {
    await getAPI();
    GetThiefThreeRank()
    // setRow();
    setLoading(false);
  }, []);
  // const SelectClick = async (e) => {
  //   if (e.target.value === "ยอดโกงสูงสุด") {
  //     const getThief = await Axios.get(
  //       `http://localhost:7000/thief/ranksummoney`
  //     );
  //     thiefData = getThief.data;
  //     setRow();
  //   } else if (e.target.value === "วันที่โกงล่าสุด") {
  //     const getThief = await Axios.get(
  //       `http://localhost:7000/thief/rankdatetime`
  //     );
  //     thiefData = getThief.data;
  //     setRow();
  //   } else if (e.target.value === "จำนวนครั้งที่โกงมากที่สุด") {
  //     const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
  //     thiefData = getThief.data;
  //     setRow();
  //   }
  // };

  // const ThiefLoading = () => {
  //   var ThiefData = [];
  //   for (var i = 0; i < thiefData.data.length; i++) {
  //     ThiefData.push({
  //       rank: i + 1,
  //       name: thiefData.data[i].name,
  //       lastname: thiefData.data[i].surname,
  //       account: thiefData.data[i].accountnumber,
  //       amount: thiefData.data[i].summoney,
  //       time: thiefData.data[i].count,
  //       date: moment(
  //         new Date(thiefData.data[i].wanteedon.seconds * 1000)
  //       ).format("lll"),
  //     });
  //   }
  //   return ThiefData;
  // };

  // data of table
  const data = {
    columns: [
      {
        label: "อันดับ",
        field: "rank",
        sort: "asc",
        width: 100,
      },
      {
        label: "ชื่อ",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "นามสกุล",
        field: "lastname",
        sort: "asc",
        width: 200,
      },
      {
        label: "เลขบัญชี",
        field: "account",
        sort: "asc",
        width: 100,
      },
      {
        label: "ยอดเงินทั้งหมด",
        field: "amount",
        sort: "asc",
        width: 150,
      },
      {
        label: "จำนวนครั้งที่โกง",
        field: "time",
        sort: "asc",
        width: 150,
      },
      {
        label: "วันที่โกง",
        field: "date",
        sort: "asc",
        width: 150,
      },
    ],
    rows: dataRow,
  };

  return loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-ranking">จัดอันดับคนโกง 
        <span className="rank-sort-head">เรียงตาม: <span>จำนวนครั้งที่โกงมากที่สุด</span></span>
      </h1>
      <div className="container2-index">
        <div className="row">
          {ThiefCount
            ? ThiefCount.map((element, index) => {
                return (
                  <div className="column3-index" key={index}>
                    <div className={`coin${index + 1} rank-index1`}>
                      {index + 1}
                    </div>
                    <MDBCard>
                      <div className="emty-index"></div>
                      <MDBCardBody cascade className="text-center">
                        <p className="text3-index">
                          เลขที่บัญชี : {element.accountnumber} <br />
                          ธนาคาร : {element.bank}
                        </p>
                        <p className="text4-index">
                          จำนวนครั้งที่ถูกแจ้ง : {element.count} ครั้ง <br />
                          ยอดทั้งหมด : {element.summoney} บาท
                          <br />
                          ล่าสุด :{" "}
                          {moment(
                            new Date(element.wanteedon.seconds * 1000)
                          ).format("lll")}
                        </p>
                        <a
                          href="!#"
                          className="orange-text mt-1 d-flex justify-content-end align-items-center"
                        >
                          <div className="readmore">
                            ดูโพสต์ที่เกี่ยวข้องทั้งหมด{" "}
                            <MDBIcon
                              icon="chevron-right"
                              className="ml-2"
                              size="sm"
                            ></MDBIcon>
                          </div>
                        </a>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="container-ranking">
        <div className="rank-sorting">
          <select
            as="select"
            name="rank-sort"
            className="rank-sort-select"
            onChange={(e) => {
              // SelectClick(e);
            }}
          >
            <option selected value="จำนวนครั้งที่โกงมากที่สุด" className="rank-option">
              จำนวนครั้งที่โกงมากที่สุด
            </option>
            <option value="ยอดโกงสูงสุด" className="rank-option">ยอดเงินที่โกงสูงสุด</option>
            <option value="วันที่โกงล่าสุด" className="rank-option">วันที่โกงล่าสุด</option>
          </select>
        </div>

        <div className="rank-column-row">
          <div className="rank-column col">อันดับ</div>
          <div className="rank-column col">ชื่อ</div>
          <div className="rank-column col">นามสกุล</div>
          <div className="rank-column col">เลขที่บัญชี</div>
          <div className="rank-column col">ยอดเงินทั้งหมด</div>
          <div className="rank-column col">จำนวนครั้งที่โกง</div>
          <div className="rank-column col">วันที่โกง</div>
        </div>

        <div className="rank-data-row">
          <div className="rank-column col">
            <span className="rank-order">1</span>
          </div>
          <div className="rank-column col">
            <div className="rank-data-img">
              <img src="/img/nui.jpg"></img>
            </div>
            <span>บวรศักดิ์</span>
          </div>
          <div className="rank-column col">เหลือจันทร์</div>
          <div className="rank-column col">0372701455</div>
          <div className="rank-column col">10000</div>
          <div className="rank-column col">10</div>
          <div className="rank-column col">15/02/63</div>
        </div>
        
      </div>  
      <Chatbot />
    </div>
  );
};
export default Rank;
