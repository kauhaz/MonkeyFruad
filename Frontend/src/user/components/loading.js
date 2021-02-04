import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";


const Loading = ({loading}) => {
    
    return (
        <div>
            <SyncLoader color="#1674E0" loading={loading}  size={130}  />
        </div>
    )
}

export default Loading