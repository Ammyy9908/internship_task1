import React from 'react';
import "./StudentCard.css";
import done from "../assets/done.png";
import delete_icon from "../assets/delete.png"
import axios from 'axios';
import { connect } from 'react-redux';


function StduentCard({sid,user,class_id,setError,class_attendance}) {

    const [student,setStudent] = React.useState(null);
    const [isDoneAttendance,setAttendanceDone] = React.useState(false);





    const isAttendanceDone = ()=>{
        const index = class_attendance.findIndex((attendance)=>{
            return attendance.student_id===sid;
        })

        console.log("Yes Present at ",index);
        return index;
    }

    


    React.useEffect(()=>{
        axios.get(`https://intenshipserver.herokuapp.com/auth/student/${sid}`).then((response)=>{
            console.log('Incoming student = >',response);
            setStudent(response.data);
        }).catch((e)=>{
            console.log(e)
        })

       
    },
    // eslint-disable-next-line
    [])


    const handleAttend = ()=>{
        axios.post(`http://localhost:5000/attendance/create/${class_id}/${sid}`,{
            date:`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
        }).then((response)=>{
            console.log(response);
            const {is_attend} = response.data;

            setAttendanceDone(is_attend);
            setError(`Attendance to ${student.name} is Assigned!`);

            setTimeout(()=>{
                setError(false);
            },5000)
        }).catch((e)=>{
            console.log(e);
        })
    }


    const handleRemove  = (e)=>{
        axios.put(`https://intenshipserver.herokuapp.com/room/remove/${sid}/${class_id}`).then((response)=>{
            console.log('working')
            const {message} = response.data;
            setError(message)

            setTimeout(()=>{
                setError(false);
            },5000);
        }).catch((e)=>{
            console.log(e);
        })

        const parent = e.target.parentElement.parentElement.parentElement.parentElement;
        parent.remove()
    }

    return (
        <div className="student_card">
            <div className="student__card__wrapper">
                <div className="card__top">
                    <div className="student__card__avatar">
                        <span>{student && student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    {user && user.account_type==="teacher" && <div className="student_controls">
                        {isAttendanceDone()<0 && !isDoneAttendance && <button onClick={handleAttend}><img src={done} alt="done__icon" /></button>}
                        <button onClick={handleRemove}><img src={delete_icon} alt="delete_icon" /></button>
                    </div>}
                </div>

                <div className="card__content">
                    <h3>{student && student.name===user.name ?"You":student && student.name}</h3>
                    <p>{student && student.email}</p>

                </div>
            </div>
        </div>
    )
}

const mapStateToprops = (state)=>({
    user:state.appReducer.user,
})

export default connect(mapStateToprops,null)(StduentCard)
