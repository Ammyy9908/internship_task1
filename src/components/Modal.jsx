import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import arrow from "../assets/arrow_right_alt.png"
import { addRoom, setModal } from '../redux/actions/_appAction'
import "./Modal.css"

function Field({type,label,name,id,value,setValue}){
    console.log(label)
        return <div className="custom-field">
            <input type={type} id={id} name={name} value={value} onChange={(e)=>setValue(e.target.value)}/>
            <label htmlFor={id} className={`${value && "fixed_label"}`}>{label}</label>
        </div>
}
function Modal(props) {
    const [classname,setClassName] = React.useState('')
    const [subject,setSubject] = React.useState('')
    const [code,setCode] = React.useState('');



    const handleClassSave = ()=>{


        axios.post('https://intenshipserver.herokuapp.com/room/create',{
            name:classname,
            subject
        },{
            headers:{
                'teacher_id':props.user.id
            }
        }).then((response)=>{
            console.log(response);
            const {room} = response.data;
            props.addRoom(room);
            setClassName('')
            setSubject('');
            props.setModal(false);

        }).catch((e)=>{
            console.log(e);
        })
    }



    const handleClose = (e)=>{
        if(e.target.classList.contains("modal")){
            props.setModal(false)
        }
    }


    const handleJoin = ()=>{
        axios.put(`https://intenshipserver.herokuapp.com/room/join`,{
            code
        },{
            headers:{
                'student_id':props.user && props.user.id
            }
        }).then((response)=>{
            const {error,message,room} = response.data;
            if(error){
                    props.setError(error);
                    
                  props.setModal(false)
                  setTimeout(()=>{
                    props.setError(false);
                  },5000)
            }

            else{
                props.addRoom(room)
                props.setModal(false)
                props.setError(message);
    
                setTimeout(()=>{
                    props.setError(false);
                },5000)
            }

            

        })
    }

    
    return (
        <div className={`modal ${props.isModal && "modal_enable"}`} onClick={handleClose}>
            <div className="modal__main">
                
                <div className="modal__Wrapper">
                <h1>{props.user && props.user.account_type==="teacher"?"Create Class":"Join Class"}</h1>
                    {props.user && props.user.account_type==="teacher" && <><Field type="text" id="class_name" name="class_name" label='Class Name' value={classname} setValue={setClassName}/>
                    <Field type="text" id="subject_name" name="subject_name" label='Subject Name' value={subject} setValue={setSubject}/></>}
                    {props.user && props.user.account_type==="student" && <Field type="text" id="code" name="code" label='Subject Code' value={code} setValue={setCode}/>}
                </div>

                {props.user && props.user.account_type==="teacher" ?<button className={`new_class_save_btn ${classname && subject && "new_class_save_btn__enable"}`} onClick={classname && subject ? handleClassSave:null}><img src={arrow} alt="arrow-icon" /></button>:<button className={`new_class_save_btn ${code && "new_class_save_btn__enable"}`} onClick={code ? handleJoin:null}><img src={arrow} alt="arrow-icon" /></button>}
            </div>

        </div>
    )
}


const mapStateToprops = (state)=>({
    isModal:state.appReducer.isModal,
    user:state.appReducer.user
})


const mapDispatchTopProps = (dispatch)=>({
    setModal:(isModal)=>dispatch(setModal(isModal)),
    addRoom:(room)=>dispatch(addRoom(room))
})


export default connect(mapStateToprops,mapDispatchTopProps)(Modal)
