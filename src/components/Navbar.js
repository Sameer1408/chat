import { getAuth, signOut } from "firebase/auth";

function Navbar({currentuser}) {
  // console.log(currentuser,"navbar")
  const auth = getAuth();
    return (
      <div className="navbar">
      <span className="log">Chat</span>
      <div className="user">
        <img src={currentuser?.photoURL} alt="profile"></img>
        <span>{currentuser?.displayName}</span>
        <button onClick={()=>{
          signOut(auth);
        }}>log out</button>
      </div>

      </div>
    );
  }
  
  export default Navbar;