import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoaderMycoment.css";

const clipLoaderMycoment = ({ loading }) => {
  return (
    <div>
      <div className="box-load-mycoment">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderMycoment;
