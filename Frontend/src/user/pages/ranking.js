import React, { useEffect, useState } from "react";
import "./ranking.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBDataTable } from 'mdbreact';

const Rank = () => {

  const data = {
    columns: [
      {
        label: 'อันดับ',
        field: 'rank',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'ชื่อ',
        field: 'name',
        sort: 'asc',
        width: 200
      },
      {
        label: 'นามสกุล',
        field: 'lastname',
        sort: 'asc',
        width: 200
      },
      {
        label: 'เลขบัญชี',
        field: 'account',
        sort: 'asc',
        width: 100
      },
      {
        label: 'ยอดเงินทั้งหมด',
        field: 'amount',
        sort: 'asc',
        width: 150
      },
      {
        label: 'จำนวนครั้งที่โกง',
        field: 'time',
        sort: 'asc',
        width: 150
      },
      {
        label: 'วันที่โกง',
        field: 'date',
        sort: 'asc',
        width: 150
      }
    ],
    rows: [
      {
        rank: '1',
        name: 'System',
        lastname: 'Architect',
        account: '0372701455',
        amount: '80,000',
        time: '80',
        date: '2011/04/25'
      }
      // {
      //   name: 'Garrett Winters',
      //   position: 'Accountant',
      //   office: 'Tokyo',
      //   age: '63',
      //   date: '2011/07/25',
      //   salary: '$170'
      // },
      // {
      //   name: 'Ashton Cox',
      //   position: 'Junior Technical Author',
      //   office: 'San Francisco',
      //   age: '66',
      //   date: '2009/01/12',
      //   salary: '$86'
      // },
      // {
      //   name: 'Cedric Kelly',
      //   position: 'Senior Javascript Developer',
      //   office: 'Edinburgh',
      //   age: '22',
      //   date: '2012/03/29',
      //   salary: '$433'
      // },
      // {
      //   name: 'Airi Satou',
      //   position: 'Accountant',
      //   office: 'Tokyo',
      //   age: '33',
      //   date: '2008/11/28',
      //   salary: '$162'
      // },
      // {
      //   name: 'Brielle Williamson',
      //   position: 'Integration Specialist',
      //   office: 'New York',
      //   age: '61',
      //   date: '2012/12/02',
      //   salary: '$372'
      // },
      // {
      //   name: 'Herrod Chandler',
      //   position: 'Sales Assistant',
      //   office: 'San Francisco',
      //   age: '59',
      //   date: '2012/08/06',
      //   salary: '$137'
      // },
      // {
      //   name: 'Rhona Davidson',
      //   position: 'Integration Specialist',
      //   office: 'Tokyo',
      //   age: '55',
      //   date: '2010/10/14',
      //   salary: '$327'
      // },
      // {
      //   name: 'Colleen Hurst',
      //   position: 'Javascript Developer',
      //   office: 'San Francisco',
      //   age: '39',
      //   date: '2009/09/15',
      //   salary: '$205'
      // },
      // {
      //   name: 'Sonya Frost',
      //   position: 'Software Engineer',
      //   office: 'Edinburgh',
      //   age: '23',
      //   date: '2008/12/13',
      //   salary: '$103'
      // }
    ]
  };

  return (
    <div>
      <NavbarPage />
      <h1 className="h1-ranking">จัดอันดับคนโกง</h1>
      <MDBContainer className="container-ranking">
        <div className="rank-sorting">
            <select
              as="select"
              name="rank-sort"
              className="rank-sort-select"
            >
              <option selected>
                จำนวนครั้งที่โกงมากที่สุด
              </option>
              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
              <option value="กระบี่">กระบี่ </option>
              <option value="กาญจนบุรี">กาญจนบุรี </option>
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
      <Chatbot/>
    </div>
  );
};
export default Rank;
