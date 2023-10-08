import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

function Chats({currentuser,db,setUser,user}) {

const [chats,setChats] = useState([]);

useEffect(()=>{
const getChats=()=>{

  const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
    setChats(doc.data());
  });
  return()=>{
    unsub();
  }
}
currentuser.uid&&getChats();
  },[currentuser.uid])

  console.log(Object.entries(chats));


  const handleSelect=(chat)=>{
    const combinedId = currentuser.uid>chat[1]?.userInfo.uuid?currentuser.uid+chat[1]?.userInfo.uuid:chat[1]?.userInfo.uuid+currentuser.uid;

    setUser({chatId:combinedId,data:chat[1]?.userInfo});
  }

  return (
      <div className="chats">
        {Object.entries(chats)?.sort((a,b)=>a[1].date-b[1].date).map((chat)=>(
           <div className="userChat" key={chat[0]} onClick={(e)=>{
           handleSelect(chat)
          }
            }>
            <img src={chat[1].userInfo.photoURL} alt=""></img>
        
            <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
        ))}
      </div>
    );
  }
  
  export default Chats;