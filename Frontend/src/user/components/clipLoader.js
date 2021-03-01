import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoader.css";

const clipLoader = ({ loading }) => {
  return (
    <div>
      <div className="box-load">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoader;
