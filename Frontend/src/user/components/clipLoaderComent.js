import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoaderComent.css";

const clipLoaderComent = ({ loading }) => {
  return (
    <div>
      <div className="box-load-comment">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderComent;
