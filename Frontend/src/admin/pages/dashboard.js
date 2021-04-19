import React, { useEffect, useState, useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import * as moment from "moment";
import "moment/locale/th";
import NavbarPage from "../components/navbarAdmin";

import { Link, useHistory, useLocation } from "react-router-dom";

import { Form, Col } from "react-bootstrap";
import "./dashboard.css";

const Dashboard = () => {
  const [show, Setshow] = useState();
  const [showDropdown, SetshowDropdown] = useState(true);
  return (
    <div>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
    </div>
  );
};

export default Dashboard;
