import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

function Sidebar({currentuser,db,setUser,user}) {
  // console.log(currentuser,"sidebar");
    return (
      <div className="sidebar">
      <Navbar currentuser={currentuser}/>
      <Search currentuser={currentuser} db={db} setuser={setUser} User={user}/>
      <Chats currentuser={currentuser} user={user} db={db} setUser={setUser}/>
      </div>
    );
  }
  
  export default Sidebar;