import React from 'react'
import { connect } from 'react-redux'
import add from "../assets/add.png"
import { setModal } from '../redux/actions/_appAction'
import "./Navbar.css"
function Navbar(props) {
    return (
        <div className="header">
            <div className="header__wrapper">
                <div className="header__left">
                     <a href="#home">{props.brand}</a>
                </div>
                <div className="header__right">
                    {props.isAddButton && <button onClick={()=>props.setModal(true)}>
                        <img src={add} alt="add-icon" />
                        
                    </button>}
                  
                    <div className="user__avatar__header">
                        <span>{props.user && props.user.name.charAt(0).toUpperCase()}</span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}




const mapStateToprops = (state)=>({
    user:state.appReducer.user,

})

const mapDispatchTopProps = (dispatch)=>({
    setModal:(isModal)=>dispatch(setModal(isModal))
})

export default connect(mapStateToprops,mapDispatchTopProps)(Navbar)
