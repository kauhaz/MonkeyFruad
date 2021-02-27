import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";

const clipLoaderReport = ({ loading }) => {
  return (
    <div>
      <div className="box-load">
        <Default color="#FFCD28" loading={loading} size={10} />
      </div>
    </div>
  );
};

export default  clipLoaderReport;
