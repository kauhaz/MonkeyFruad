import React, { useState, useMemo } from "react";
import { Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./formpost.css";
import Axios from "axios";
import _ from "lodash";
import { auth } from "../Frontfirebase";
import Chatbot from "./chatbot";
import Loading from "./pacmanloading";
import { v4 as uuidv4 } from "uuid";
import Modal from 'react-modal'

const Modalimage = ({isopen,handleopenmodal,handleclosemodal , imagemodal}) =>{
  Modal.setAppElement('#root')
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    //   console.log(isopen)
    return (
        <div >
             <Modal
          isOpen={isopen}
          onRequestClose={handleclosemodal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <img
                            
                            alt="previewImg"
                            src={imagemodal}
                            style={{ overflow: "hidden" }}
                           
                          />
           </Modal>
        </div>
    )
}

export default Modalimage