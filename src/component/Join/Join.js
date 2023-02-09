import React, { useState } from 'react'
import "./Join.css";
import logo from "../../image/img.jpg"
import {Link} from "react-router-dom"

let user;

 const sendUser=()=>{
  user=document.getElementById("joinInput").value;
  document.getElementById("joinInput").value="";
 }


const Join = () => {

    const [name, setname] = useState("")
    console.log(name);

  return (
    <div className='joinPage'>
    <div  className='JoinContainer'>
    <img src ={logo} alt='logo'/>
    <h1>Quick Talk...</h1>
    <input onChange={(e)=>setname(e.target.value) } placeholder='Enter Your Name' type="text"  id="joinInput" />
   <Link onClick={(e)=> !name ?e.preventDefault():null}  to="/chat"><button onClick={sendUser} className='joinBtn'>Login</button> </Link> 
    </div>
    </div>
  )
}

export default Join
export {user}