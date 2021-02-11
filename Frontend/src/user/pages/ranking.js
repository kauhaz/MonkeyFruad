import React, { useEffect, useState } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBDataTable } from "mdbreact";
import { useAccordionToggle } from "react-bootstrap";
import Axios from "axios";
const Rank = () => {
  var [thiefData, setThiefData] = useState([]);
  const [dataRow, setDataRow] = useState();
  const getAPI = async () => {
    const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
    setThiefData(getThief.data);
  };
  const setRow = () => {
    setDataRow(ThiefLoading());
  };
  useEffect( async() => {
   await getAPI();
   await setRow();
  }, []);
  const ThiefLoading = () => {
    var ThiefData = []
    for (var i = 0; i < thiefData.data.length; i++) {
      ThiefData.push({
        rank: i,
        name: thiefData.data[i].name,
        lastname: thiefData.data[i].surname,
        account: thiefData.data[i].accountnumber,
        amount: thiefData.data[i].summoney,
        time: thiefData.data[i].count,
        date: thiefData.data[i].wanteedon,
      })
    }
    console.log(thiefData.data.length)
    return ThiefData;
  };
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

  return (
    <div>
      <NavbarPage />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <MDBContainer className="container-ranking">
        <MDBDataTable
          responsive
          striped
          bordered
          paging={false}
          searching={false}
          data={data}
          className="rank-data"
        />
      </MDBContainer>
      <Chatbot />
    </div>
  );
};
export default Rank;
