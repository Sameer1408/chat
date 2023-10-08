import { useEffect, useRef } from "react";

function Message({message,currentuser,user}) {

    const ref= useRef();
    useEffect(()=>{
      ref.current?.scrollIntoView({behavior:"smooth"});
    },[message])
    
    return (
      <div ref={ref}>

      {
        message.senderId==currentuser.uid?

       <div className="message owner">
        <div className="messageInfo">
          <img src={currentuser.photoURL}></img>
          {/* <span>Just now</span> */}
        </div>
        <div className="messageContent">
         {
          message?.text?.length? <p>{message.text}</p>:null
         }
          {
            message.img&&
          <img style={{marginTop:"10px"}} src={message.img}></img>
          }
        </div>
        </div> 
        :
        
              <div className="message ">
              <div className="messageInfo">
                <img src={user.data.photoURL}></img>
                <span>just now</span>
              </div>
              <div className="messageContent">
                <p>{message.text}</p>
                {
                  message.img&&
                <img src={message.img}></img>
                }
              </div>
              </div>
          

      }
      
      </div>
    );
  }  
  export default Message;