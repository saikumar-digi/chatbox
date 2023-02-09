import React, { useEffect, useState } from 'react'
import socketIo from "socket.io-client"
import "./Chat.css";
import{user} from "../Join/Join";
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../image/closeIcon.png"

const ENDPOINT = "https://wakytaly.onrender.com/"; 

let socket

const Chat = () => {

    const [id, setid] = useState("")

    const [messages, setMessages] = useState([])

const send =()=>{
   const message= document.getElementById("chatInput").value;
    socket.emit('message',{message,id});
    document.getElementById("chatInput").value="";
}

   
    useEffect(()=>{
         socket =socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
            alert("connected");
            setid(socket.id)
        })

        socket.emit('joined',{user})
        socket.on('welcome',(data)=>{
            setMessages([...messages, data])
            // console.log(user,message);
        })

        socket.on('userJoined',(data)=>{
            setMessages([...messages, data])
            // console.log(user,message);
        })

        socket.on('leave',(data)=>{
            setMessages([...messages, data]) 
            // console.log(user,message);
        })

        return()=>{
           socket.emit('disconnect')
           socket.off();
        }
    } ,[])

    useEffect(() => {
        socket.on('sendMessage',(data)=>{
            setMessages([...messages, data]) 
            console.log(data.user,data.messages,data.id);
        })
    
      return () => { 
        socket.off(); 
      }
    }, [ messages])
    
   
     
  return (

    <div className='chatPage'>
    <div className='chatContainer'>
    <div className=' header'>
        <h3>Quick Chat</h3>
        <img  src={closeIcon} alt="close"/> 
       {/* <a href='/'><img  src={closeIcon} alt="close"/> </a>  */}
    </div>
    <ReactScrollToBottom className='chatBox'>
     {messages.map((item,i)=> <Message user={item.id===id?'': item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
    </ReactScrollToBottom>
    <div className='inputBox'>
    <input onKeyPress={(event)=>event.key === 'Enter'? send(): null} type= "text" id="chatInput"/>
    <button onClick={send} className=' sendBtn'> <h1>Send</h1></button>
                </div>
    </div>

    </div>
  )
}

export default Chat