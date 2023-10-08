import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

function Messages({user,db,currentuser}) {
  const [messages,setMessages] = useState([]);

  useEffect(()=>{

    if(user.chatId)
    {

      const unSub=onSnapshot(doc(db,"chats",user?.chatId),(doc)=>{
        
        doc.exists() && setMessages(doc.data().messages);
        console.log(doc.data().messages,"messages");
        
    })

    return ()=>{
      unSub();
    }
  }

  },[user.chatId])


    return (
      <div className="messages">
        {
          messages.map(m=>{
           return <Message 
           currentuser={currentuser} 
           user={user} 
           message={m}
           key={m.id}
           />

          })
        }

      </div>
    );
  }
  
  export default Messages;