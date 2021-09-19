import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './pages/Auth';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {setRoom, setUser} from "./redux/actions/_appAction"
import Home from './pages/Home';
import Detail from './pages/Detail';

function App(props) {
  console.log(props)
  React.useEffect(()=>{
    Cookies.get("AUTH_TOKEN") && axios.get(`https://intenshipserver.herokuapp.com/auth/user`,{
      headers:{
        "Authorization":Cookies.get('AUTH_TOKEN')
      }
    }).then((response)=>{
      console.log(response);
      props.setUser(response.data)
      return {uid:response.data.id,name:response.data.name,account_type:response.data.account_type}


      
    }).then((user)=>{
      const base_url = user.account_type==="teacher"? `https://intenshipserver.herokuapp.com/room/all/${user.uid}`:`https://intenshipserver.herokuapp.com/room/all/student/${user.uid}`
      axios.get(base_url).then((response)=>{
        console.log("Classes response are",response);

        props.setRoom(response.data);


      }).catch((e)=>{
        console.log("Error in getting all classes");
      })
    }).catch((e)=>{
      console.log(e);
    })
  },
  // eslint-disable-next-line
  []);

  return (
    <Router>
  <div>
  
  
  <Switch>
  <Route exact path="/">
   <Home/>
    </Route>
    
    <Route
          exact
            path="/auth/:account_type/:type"
            render={(props) => {
              const type = props.match.params.type;
              const account_type = props.match.params.account_type
              return <Auth type={type && type} account_type ={account_type  && account_type}/>;
            }}
           
          />


<Route
          exact
            path="/c/detail/:class_id"
            render={(props) => {
              const class_id = props.match.params.class_id;
              return <Detail class_id ={class_id  && class_id}/>;
            }}
           
          />
   
   
  </Switch>
</div>
</Router>
  );
}


const mapDispatchToProps = (dispatch)=>({
  setUser:(user)=>dispatch(setUser(user)),
  setRoom:(rooms)=>dispatch(setRoom(rooms))
})

export default connect(null,mapDispatchToProps)(App);