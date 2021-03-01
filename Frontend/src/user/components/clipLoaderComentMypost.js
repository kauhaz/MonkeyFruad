import React from "react";
import Default from "@bit/joshk.react-spinners-css.ouroboro";
import "./clipLoaderComentMypost.css";

const clipLoaderComentMypost = ({ loading }) => {
  return (
    <div>
      <div className="box-load-comment-mypost">
        <Default color="#FFCD28" loading={loading} size={60} css />
      </div>
    </div>
  );
};

export default clipLoaderComentMypost;
