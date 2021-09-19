import React from 'react'
import { connect } from 'react-redux'
import "./BlankStudentCard.css"
function BlankStudentCard({user}) {
    return (
        <div className="blank-student-card">
            <div className="student__card__wrapper">
                <div className="card__top">
                    <div className="student__blank__card__avatar">
                        {/* <img src="" alt="" /> */}
                    </div>
                    {user && user.account_type==="teacher" && <div className="student_controls">
                        <button></button>
                        <button></button>
                    </div>}
                </div>

                <div className="card__content">
                   <div className="blank_student_name"></div>
                    <div className="student_blank_total_class"></div>
                    <div className="student_blank_attendance"></div>

                </div>
            </div>
        </div>
    )
}

const mapStateToprops = (state)=>({
    user:state.appReducer.user,
})

export default connect(mapStateToprops,null)(BlankStudentCard)
