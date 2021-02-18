import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";
import "./pacmanloading.css";

const Loading = ({loading}) => {
    return (
        <div>
            <div className="box-load">
                <PacmanLoader color="#FFCD28" loading={loading}  size={99} css/>
            </div>
        </div>
    )
}

export default Loading