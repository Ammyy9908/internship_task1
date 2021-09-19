import React from 'react'
import "./SnackBar.css"
function SnackBar({error}) {
    return (
        <div className={`snackbar ${error && "snackbar__enable"}`}>
           
            <div className="snackbar__container">
                <span>{error}</span>
            </div>
        </div>
    )
}

export default SnackBar
