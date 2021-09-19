import axios from 'axios'
import React from 'react'
import BlankStudentCard from '../components/BlankStudentCard'
import Navbar from '../components/Navbar'
import StduentCard from '../components/StduentCard'
import "./Detail.css"
import back from "../assets/arrow_back.png"
import SnackBar from '../components/SnackBar'
import { useHistory } from 'react-router'

function Detail(props) {

    const [room,setRoom] = React.useState(null);
    const [error,setError]  = React.useState(false);
    const history = useHistory();

    React.useEffect(()=>{

        axios.get(`https://intenshipserver.herokuapp.com/room/${props.class_id}`).then((response)=>{
            console.log('Incoming class = >',response);
            setRoom(response.data);
        }).catch((e)=>{
            console.log(e);
        })
    },[props.class_id])


    const handleMoveHome = ()=>{
        history.push('/');
    }

   
    return (
        <div className="detailed">
            <SnackBar error={error}/>
            <Navbar isAddButton={false} brand={room && room.subject}/>
            <div className="container">
                {/* {!room && <div className="blank__heading"></div>} */}
                {room && room.joined_by.length>0 && <h1>Student List</h1>}
                <div className="class_students">
                    {
                        room ? room.joined_by.map((student)=>{
                            return <StduentCard sid={student} class_id={room._id} setError={setError}/>
                        })
                    

                    :<><BlankStudentCard/>
                    <BlankStudentCard/>
                    <BlankStudentCard/>
                    <BlankStudentCard/>
                    
                   
                    </>
                    }
                </div>


  
        </div>

        <button className="home_back_btn" onClick={handleMoveHome}>
            <img src={back} alt="back-icon" />
        </button>
        </div>
    )
}

export default Detail
