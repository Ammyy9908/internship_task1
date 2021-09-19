import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import CardClass from '../components/CardClass'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import SnackBar from '../components/SnackBar'
import "./Home.css"
function Home(props) {
    
    const history = useHistory();

    const [error,setError] = React.useState(false);


    React.useEffect(()=>{

        if(!Cookies.get("AUTH_TOKEN")){
            history.push(`/auth/teacher/login`)
        
        }

    },
    // eslint-disable-next-line
    [])



    const handleLogout = ()=>{
        Cookies.remove('AUHT_TOKEN');
        history.push('/auth/teacher/login');
    }
    return (
        <div className="home">
            <SnackBar error={error}/>
            <Modal setError={setError}/>
            <Navbar isAddButton={true} brand="ATMS"/>
            <div className="container">
            <div className="classes">
                {
                    props.rooms? props.rooms.map((room,i)=>{
                        return <CardClass name={room.name} key={room._id} subject={room.subject} teacher={room.create_by} code={room.code} id={room._id}/>
                    })
                :
                    <><div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/>
                    <div className="blank_card"/><div className="blank_card"/></>
                        
                    
                    
                    }
            </div>
            </div>

                <button className="logout_btn" onClick={handleLogout}>
                    Logout
                </button>
        </div>
    )
}


const mapStateToprops = (state)=>({
    user:state.appReducer.user,
    rooms:state.appReducer.rooms
})

export default connect(mapStateToprops,null)(Home)
