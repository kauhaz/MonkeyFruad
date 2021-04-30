import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoaderadmin.css";

const clipLoaderadmin = ({ loading }) => {
  return (
    <div>
      <div className="box-load-admin">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderadmin;
