import { useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom";

function Home({currentuser,db,user,setUser}) {

  const navigate = useNavigate();
  // console.log(currentuser,"home")
  
    return (
      <div className="home">
      <div className="container">
        <Sidebar currentuser={currentuser} db={db} user={user} setUser={setUser}/>
        <Chat currentuser={currentuser} db={db} user={user}/>
      </div>
      </div>
    );
  }
  
  export default Home;