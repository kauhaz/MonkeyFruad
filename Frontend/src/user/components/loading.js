import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";


const Loading = ({loading}) => {
    
    return (
        <div>
            <PacmanLoader color="#1674E0" loading={loading}  size={99} css />
            <span color="#1674E0" > กำลังโหลด </span>
        </div>
    )
}

export default Loading