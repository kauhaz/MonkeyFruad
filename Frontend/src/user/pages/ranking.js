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
    const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
    setThiefRank(getThief.data.data);
  };
  const GetInitThiefThreeRank = async () => {
    const thiefcount = await Axios.get(
      "http://localhost:7000/thief/orderbycount"
    );
    setTThiefThreeRank(thiefcount.data.data);
    setTitleSort("จำนวนครั้งที่โกงมากที่สุด");
  };
  const GetPost = async () => {
    const getallpost = await Axios.get("http://localhost:7000/post/post");
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
        `http://localhost:7000/thief/ranksummoney`
      );
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `http://localhost:7000/thief/orderbysummoney`
      );
      setTThiefThreeRank(getThreeThief.data.data);
    } else if (e.target.value === "วันที่โกงล่าสุด") {
      setTitleSort(e.target.value);
      const getThief = await Axios.get(
        `http://localhost:7000/thief/rankdatetime`
      );
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `http://localhost:7000/thief/orderbydatetimes`
      );
      setTThiefThreeRank(getThreeThief.data.data);
    } else if (e.target.value === "จำนวนครั้งที่โกงมากที่สุด") {
      setTitleSort(e.target.value);
      const getThief = await Axios.get(`http://localhost:7000/thief/rankcount`);
      setThiefRank(getThief.data.data);
      const getThreeThief = await Axios.get(
        `http://localhost:7000/thief/orderbycount`
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
                    <div className={`coin${index + 1} rank-rank1`}>
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
                          ยอดทั้งหมด : {element.summoney} บาท
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

        <div className="rank-column-row">
          <div className="rank-column col">อันดับ</div>
          <div className="rank-column col">ชื่อ</div>
          <div className="rank-column col">นามสกุล</div>
          <div className="rank-column col">เลขที่บัญชี</div>
          <div className="rank-column col">ยอดเงินทั้งหมด</div>
          <div className="rank-column col">จำนวนครั้งที่โกง</div>
          <div className="rank-column col">วันที่โกง</div>
        </div>
        {ThiefRank
          ? ThiefRank.map((element, index) => {
              return (
                <div className="rank-data-row">
                  <div className="rank-column col">{index + 1}</div>
                  <div className="rank-column col">
                    <span>{element.name}</span>
                  </div>
                  <div className="rank-column col">{element.surname}</div>
                  <div className="rank-column col">{element.accountnumber}</div>
                  <div className="rank-column col">{element.summoney}</div>
                  <div className="rank-column col">{element.count}</div>
                  <div className="rank-column col">
                    {moment(new Date(element.wanteedon.seconds * 1000)).format(
                      'MM/DD/YYYY HH:mm'
                    )}
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <Chatbot />
    </div>
  );
};
export default Rank;
