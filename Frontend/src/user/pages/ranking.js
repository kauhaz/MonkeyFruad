import React, {  useState, useMemo } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import "moment/locale/th";
const Rank = () => {
  const [ThiefRank, setThiefRank] = useState([]);
  const [ThiefThreeRank, setTThiefThreeRank] = useState();
  const [TitleSort, setTitleSort] = useState();
  const [loading, setLoading] = useState(true);

  const [showDropdown, SetshowDropdown] = useState(true);
  const [allpost, Setallpost] = useState();
  let history = useHistory();
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const getInitCount = async () => {
    const getThief = await Axios.get(`https://monkeyfruad01.herokuapp.com/thief/rankcount`);
    setThiefRank(getThief.data.data);
  };
  const GetInitThiefThreeRank = async () => {
    const thiefcount = await Axios.get(
      "https://monkeyfruad01.herokuapp.com/thief/orderbycount"
    );
    setTThiefThreeRank(thiefcount.data.data);
    setTitleSort("จำนวนครั้งที่โกงมากที่สุด");
  };
  const GetPost = async () => {
    const getallpost = await Axios.get("https://monkeyfruad01.herokuapp.com/post/post");
    Setallpost(getallpost.data.item);
  };
  const RankSeePost = (accountnumber) => {
    let search = accountnumber;
    const getdata = allpost.filter((doc) => {
      return doc.accountnumber.includes(search);
    });
    if (getdata) {
      history.push({
        pathname: "/entersearch",
        search: "are you ok",
        state: {
          getdata,
          search,
        },
      });
    }
  };

  const SelectClick = async (e) => {
    if (e.target.value === "ยอดเงินที่โกงสูงสุด") {
      setTitleSort(e.target.value);
      const getThief = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/ranksummoney`
      );
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/orderbysummoney`
      );
      setTThiefThreeRank(getThreeThief.data.data);
    } else if (e.target.value === "วันที่โกงล่าสุด") {
      setTitleSort(e.target.value);
      const getThief = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/rankdatetime`
      );
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/orderbydatetimes`
      );
      setTThiefThreeRank(getThreeThief.data.data);
    } else if (e.target.value === "จำนวนครั้งที่โกงมากที่สุด") {
      setTitleSort(e.target.value);
      const getThief = await Axios.get(`https://monkeyfruad01.herokuapp.com/thief/rankcount`);
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `https://monkeyfruad01.herokuapp.com/thief/orderbycount`
      );
      setTThiefThreeRank(getThreeThief.data.data);
    }
  };
  useMemo(async () => {
    await getInitCount();
    await GetInitThiefThreeRank();
    await GetPost();
    setLoading(false);
  }, []);
  return loading ? (
    ""
  ) : (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <h1 className="h1-ranking">
        จัดอันดับคนโกง
        <span className="rank-sort-head">
          เรียงตาม: <span>{TitleSort}</span>
        </span>
      </h1>
      <div className="container2-rank">
        <div className="row">
          {ThiefThreeRank
            ? ThiefThreeRank.map((element, index) => {
                return (
                  <div className="column3-rank" key={index}>
                    <div className={`coin${index + 1}-rank rank-rank1`}>
                      {index + 1}
                    </div>
                    <MDBCard>
                      <div className="emty-rank"></div>
                      <MDBCardBody cascade className="text-center">
                        <p className="text3-rank">
                          เลขที่บัญชี : {element.accountnumber} <br />
                          ธนาคาร : {element.bank}
                        </p>
                        <p className="text4-rank">
                          จำนวนครั้งที่ถูกแจ้ง : {element.count} ครั้ง <br />
                          ยอดทั้งหมด : {element.summoney.toLocaleString(undefined, {maximumFractionDigits:2})} บาท
                          <br />
                          ล่าสุด :{" "}
                          {moment(
                            new Date(element.wanteedon.seconds * 1000)
                          ).format('MM/DD/YYYY HH:mm')}
                        </p>
                        <a
                          onClick={() => RankSeePost(element.accountnumber)}
                          className="orange-text mt-1 d-flex justify-content-end align-items-center"
                        >
                          <div className="readmore-rank">
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
              SelectClick(e);
            }}
          >
            <option
              selected
              value="จำนวนครั้งที่โกงมากที่สุด"
              className="rank-option"
            >
              จำนวนครั้งที่โกงมากที่สุด
            </option>
            <option value="ยอดเงินที่โกงสูงสุด" className="rank-option">
              ยอดเงินที่โกงสูงสุด
            </option>
            <option value="วันที่โกงล่าสุด" className="rank-option">
              วันที่โกงล่าสุด
            </option>
          </select>
        </div>

        {/* <table className="rank-table d-none d-sm-none d-md-inline">
          <tr className="rank-column-row">
            <th className="rank-column cell col-1 ">อันดับ</th>
            <th className="rank-column cell col ">ชื่อ</th>
            <th className="rank-column cell col ">นามสกุล</th>
            <th className="rank-column cell col ">เลขที่บัญชี</th>
            <th className="rank-column cell col ">ยอดเงินทั้งหมด</th>
            <th className="rank-column cell col ">จำนวนครั้งที่โกง</th>
            <th className="rank-column cell col ">วันที่โกง</th>
          </tr>
        </table> */}

        <table className="rank-table-count d-sm-none">
          <tr className="rank-column-row">
            <th className="rank-column cell col-1">อันดับ</th>
            <th className="rank-column cell col">ชื่อ</th>
            <th className="rank-column cell col">นามสกุล</th>
            <th className="rank-column cell col">เลขที่บัญชี</th>
            <th className="rank-column cell col">จำนวนครั้งที่โกง</th>
          </tr>
        </table>

        {/* <table className="rank-table-balance d-none d-sm-inline d-md-none">
          <tr className="rank-column-row">
            <th className="rank-column cell col-1">อันดับ</th>
            <th className="rank-column cell col">ชื่อ</th>
            <th className="rank-column cell col">นามสกุล</th>
            <th className="rank-column cell col">เลขที่บัญชี</th>
            <th className="rank-column cell col">ยอดเงินทั้งหมด</th>
          </tr>
        </table>

        <table className="rank-table-date d-none d-sm-inline d-md-none">
          <tr className="rank-column-row">
            <th className="rank-column cell col-1">อันดับ</th>
            <th className="rank-column cell col">ชื่อ</th>
            <th className="rank-column cell col">นามสกุล</th>
            <th className="rank-column cell col">เลขที่บัญชี</th>
            <th className="rank-column cell col">วันที่โกง</th>
          </tr>
        </table> */}



        {ThiefRank
          ? ThiefRank.map((element, index) => {
              return (
                <table className="rank-table d-sm-none ">
                  <tr className="rank-data-row">
                    <th className="rank-column cell col-1">{index + 1}</th>
                    <th className="rank-column cell col">{element.name}</th>
                    <th className="rank-column cell col Fall-crisp">{element.surname}</th>
                    <th className="rank-column cell col">{element.accountnumber}</th>
                    {/* <th className="rank-column cell col">{element.summoney.toLocaleString(undefined, {maximumFractionDigits:2})}<span>&nbsp;บาท</span></th> */}
                    <th className="rank-column cell col">{element.count}</th>
                    {/* <th className="rank-column cell col">
                      {moment(new Date(element.wanteedon.seconds * 1000)).format(
                        'MM/DD/YYYY HH:mm'
                      )}
                    </th> */}
                  </tr>
                </table>

              );
            })
          : null}
      </div>
      <Chatbot />
    </div>
  );
};
export default Rank;
