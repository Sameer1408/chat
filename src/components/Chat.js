import Input from "./Input";
import Messages from "./Messages";

function Chat({ currentuser,user,db}) {
  console.log(user,"uuuuuusssssseeeeeeeerrrrrrr")
    return (
      <div className="chat">
        <div className="chatInfo">
        <span>{user.data.displayName}</span>
        
        <div className="chatIncons">
          <img></img>
        </div>
        </div>
        <Messages currentuser={currentuser} db={db} user={user}/>
        <Input currentuser={currentuser} db={db} user={user}/>
      </div>
    );
  }
  
  export default Chat;