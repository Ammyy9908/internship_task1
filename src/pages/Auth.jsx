import axios from 'axios';
import React from 'react'
import { Link ,useHistory} from 'react-router-dom';
import {FiEye,FiEyeOff} from "react-icons/fi"
import Cookies from 'js-cookie';
import "./Auth.css"

function Field(props){

  

    const [isPassword,setPassword] = React.useState(true);


    const handleToggle = (e)=>{
        const input = e.target.parentElement.children[0]
        if(isPassword){
            input.setAttribute('type','text')
            setPassword(false);
        }
        else{
            input.setAttribute('type','password')
        setPassword(true);
        }
    }

    
    return(
        <div className="field">
                         
                        <div className="field__control">
                        <input type={props.type} name="" id={props.id} value={props.value} onChange={(e)=>props.setValue(e.target.value)} autoComplete="off"/>
                        {props.name==="password1" && <button className="password_toggle" onClick={handleToggle}>{isPassword?<FiEyeOff/>:<FiEye/>}</button>}
                        </div>
                        <label htmlFor={props.id} className={props.value.length>0 && "static_label"}>{props.label}</label>
                       
        </div>
    )
}

function Auth(props) {
    
    const [email,setEmail] = React.useState('');
    const [name,setName] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [password2,setPassword2] = React.useState('')
    const [error,setError] = React.useState(false);
    const history = useHistory();


    React.useEffect(()=>{

        if(email || name || password || password2 || error){
            setEmail('')
            setPassword('')
            setPassword2('')
            setName('')
            setError(false)
        }

    },
    // eslint-disable-next-line
    [props.type])





    const handleReg = ()=>{
        if(!name || !email || !password){
            alert('Make sure all fields are present!');
        }
        else if(password !==password2){
            alert('Two Password not matched!');
        }
        else{
            axios.post(`https://intenshipserver.herokuapp.com/auth/register/${props.account_type}`,{
            name,email,password
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
                setName('')
                setEmail('')
                setPassword('')
                setPassword2('')
                history.push(`/auth/${props.account_type}/login`);

            }
        }).catch((e)=>{
            console.error(e)
        })
        }

    }


    const handleLogin = ()=>{
        if(!email || !password){
            alert('Make sure all fields are present!');
        }
        else{
            axios.post(`https://intenshipserver.herokuapp.com/auth/login/${props.account_type}`,{
            name,email,password
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
               
                const {token} = response.data;

                Cookies.set('AUTH_TOKEN',token);
                
                window.location.href='/';

            }
        }).catch((e)=>{
            console.error(e)
        })
        }

    }



    return (
        <div className="auth">
           <div className="auth_screen">
              

               <div className="auth_screen_content">
                   <h1> {props.type==="register"?`${props.account_type.charAt(0).toUpperCase()+props.account_type.slice(1)} Sign Up`:`${props.account_type.charAt(0).toUpperCase()+props.account_type.slice(1)} Login`}</h1>
                   <p>{props.type==="login"?"Don't have an account?":"Already have account?"}<Link to={props.type==="register"?`/auth/${props.account_type}/login`:`/auth/${props.account_type}/register`}> {props.type==="login"?"Register":"Login"}</Link>.</p>
                   <div className="auth_form">
                       <Field name="email" id="email" label="Email" type="email" value={email} setValue={setEmail}/>
                       {props.type==="register" && <Field name="name" id="name" label="Full Name" type="text" value={name} setValue={setName}/>}
                       <Field name="password1" id="password1" label="Password" type="password" value={password} setValue={setPassword}/>
                       {props.type==="register" && <Field name="password2" id="password2" label="Repeat Password" type="password" value={password2} setValue={setPassword2}/>}
                       <input type="button" value={props.type==="register"?"Signup":"Login"} onClick={props.type==="register"?handleReg:handleLogin}/>

                       <span className="auth_switcher">
                           <Link to={`/auth/${props.account_type==="teacher"?"student":"teacher"}/${props.type}`}>{props.type.charAt(0).toUpperCase()+props.type.slice(1)} as  {props.account_type==="teacher"?"Student":"Teacher"}</Link>
                       </span>
                   </div>
               </div>
           </div>
           <div className="auth_screen_right" style={{backgroundImage:`url(https://source.unsplash.com/1600x900/?programming`}}>
               
           </div>
        </div>
    )
}

export default Auth