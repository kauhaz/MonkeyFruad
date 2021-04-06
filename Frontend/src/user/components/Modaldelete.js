import React, { useState, useMemo } from "react";
import { Form, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Modalimage.css";
import Axios from "axios";
import _ from "lodash";
import { auth } from "../Frontfirebase";
import Chatbot from "./chatbot";
import Loading from "./pacmanloading";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";

const Modaldelete = ({
  text,
  openmodal,
  handlemodalclose,
  modalcommentid,
  modalcommentmore,
  setIsActive,
  Setfuck,
  setImagesFile,
  Setfiles,
  handledeletetorerender,
}) => {
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let history = useHistory()

  const deletedpost = async (commentid, commentmore) => {
    console.log(commentmore);
    const postdelete = await Axios.post(
      `https://monkeyfruad01.herokuapp.com/post/delete/${commentid}`,
      commentmore
    );
    setIsActive(false);
    handlemodalclose();
    handledeletetorerender();
  };

  const deletedcomment = async (commentid, commentmore) => {
    const postdelete = await Axios.post(
      `https://monkeyfruad01.herokuapp.com/post/delete/comment/${commentid}`,
      commentmore
    );
    setIsActive(false);
    Setfuck([]);
    setImagesFile();
    Setfiles();
    handlemodalclose();
    handledeletetorerender();
  };

  const deletedmypost = async (commentid, commentmore) => {
    const postdelete = await Axios.post(
      `https://monkeyfruad01.herokuapp.com/post/delete/${commentid}`,
      commentmore
    );
    setIsActive(false);
    handlemodalclose();
    handledeletetorerender();
    history.push("/post/history")
  };

  return (
    <div>
      {text && text === "deletepost" ? (
        <div>
          <Modal
            isOpen={openmodal}
            onRequestClose={handlemodalclose}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="box-modal">
              <button
                onClick={() => deletedpost(modalcommentid, modalcommentmore)}
              >
                Delete ?{" "}
              </button>
              <button onClick={() => handlemodalclose()}>Cancel ? </button>
            </div>
          </Modal>
        </div>
      ) : text && text === "deletecomment" ? (
        <div>
          <Modal
            isOpen={openmodal}
            onRequestClose={handlemodalclose}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="box-modal">
              <button
                onClick={() => deletedcomment(modalcommentid, modalcommentmore)}
              >
                Delete ?{" "}
              </button>
              <button onClick={() => handlemodalclose()}>Cancel ? </button>
            </div>
          </Modal>
        </div>
      ) : text && text === "deletemypost" ? 
      <div> 
      <Modal
      isOpen={openmodal}
      onRequestClose={handlemodalclose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="box-modal">
        <button
          onClick={() => deletedmypost(modalcommentid, modalcommentmore)}
        >
          Delete ?{" "}
        </button>
        <button onClick={() => handlemodalclose()}>Cancel ? </button>
      </div>
    </Modal>
    </div> : null}
    </div>
  );
};
export default Modaldelete;
