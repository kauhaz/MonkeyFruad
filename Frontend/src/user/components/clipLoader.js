import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const clipLoader = ({ loading }) => {
  return (
    <div>
      <div className="box-load">
        <ClipLoader color="#FFCD28" loading={loading} size={99} css />
      </div>
    </div>
  );
};

export default clipLoader;
