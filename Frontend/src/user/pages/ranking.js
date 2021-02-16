import React, { useEffect, useState, useMemo } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import { MDBContainer, MDBRow, MDBCol, MDBBox } from "mdbreact";
import { MDBDataTable } from "mdbreact";
import { useAccordionToggle } from "react-bootstrap";
import Axios from "axios";
import * as moment from "moment";
import "moment/locale/th";
const Rank = () => {
  var thiefData = [];
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
  const setRow = async () => {
    setDataRow(ThiefLoading());
  };
  useMemo(async () => {
    await getAPI();
    setRow();
    setLoading(false);
  }, []);
  const SelectClick = async (e) => {
    if (e.target.value === "ยอดโกงสูงสุด") {
      const getThief = await Axios.get(
        `http://localhost:7000/thief/ranksummoney`
      );
      thiefData = getThief.data;
      setRow();
    } else if (e.target.value === "วันที่โกงล่าสุด") {
      const getThief = await Axios.get(
        `http://localhost:7000/thief/rankdatetime`
      );
      thiefData = getThief.data;
      setRow();
    } else if (e.target.value === "จำนวนครั้งที่โกงมากที่สุด") {
      const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
      thiefData = getThief.data;
      setRow();
    }
  };
  const ThiefLoading = () => {
    var ThiefData = [];
    for (var i = 0; i < thiefData.data.length; i++) {
      ThiefData.push({
        rank: i + 1,
        name: thiefData.data[i].name,
        lastname: thiefData.data[i].surname,
        account: thiefData.data[i].accountnumber,
        amount: thiefData.data[i].summoney,
        time: thiefData.data[i].count,
        date: moment(
          new Date(thiefData.data[i].wanteedon.seconds * 1000)
        ).format("lll"),
      });
    }
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

  return loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <MDBContainer className="container-ranking">
        <div className="rank-sorting">
          <select
            as="select"
            name="rank-sort"
            className="rank-sort-select"
            onChange={(e) => {
              SelectClick(e);
            }}
          >
            <option selected value="จำนวนครั้งที่โกงมากที่สุด">
              จำนวนครั้งที่โกงมากที่สุด
            </option>
            <option value="ยอดโกงสูงสุด">ยอดเงินที่โกงสูงสุด</option>
            <option value="วันที่โกงล่าสุด">วันที่โกงล่าสุด</option>
          </select>
        </div>
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
      {/* <React.Fragment>
        <MDBBox display="flex" justifyContent="center" >
          d-flex justify-content-center
        </MDBBox>
        <MDBBox display="flex" justifyContent="end">
          d-flex justify-content-end
        </MDBBox>
        <MDBBox display="flex" justifyContent="start">
          d-flex justify-content-start
        </MDBBox>
      </React.Fragment> */}
      <MDBContainer size="sm">
         <div style={{backgroundColor: 'blue', color: 'white'}}>Content small</div>
      </MDBContainer>

      <MDBContainer size="md">
       <div style={{backgroundColor: 'red', color: 'white'}}>Content medium</div>
      </MDBContainer>

      <MDBContainer size="lg">
        <div style={{backgroundColor: 'orange', color: 'white'}}>Content large</div>
      </MDBContainer>

      <MDBContainer size="xl">
        <div style={{backgroundColor: 'green', color: 'white'}}>Content extra large</div>
      </MDBContainer>

      
      <Chatbot />
    </div>
  );
};
export default Rank;
