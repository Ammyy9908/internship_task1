import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';
import "./CardClass.css"
function CardClass({name,teacher,subject,id}) {
const [teacherName,setTeacherName] = React.useState(null);

    axios.get(`https://intenshipserver.herokuapp.com/auth/teacher/${teacher}`).then((response)=>{
        console.log(response);
        const {name} = response.data;
        setTeacherName(name);
    }).catch((e)=>{
        console.log(`Error in getting teacher `,e);
    })

  
    return (
        <div className="card-class">
            <div className="class__teacher__avatar"><span>{teacherName && teacherName.charAt(0).toUpperCase()}</span></div>
            <div className="card__wrapper">
                <h3>{name}</h3>
                <span><strong>{subject}</strong></span>
                <span className="class_teacher_name">{teacherName && teacherName}</span>
                <Link to={`/c/detail/${id}`} className="class_view_btn">View</Link>
            </div>
        </div>
    )
}

export default CardClass
