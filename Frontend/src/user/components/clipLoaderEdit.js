import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoaderEdit.css";

const clipLoaderEdit = ({ loading }) => {
  return (
    <div>
      <div className="box-load-edit">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderEdit;
