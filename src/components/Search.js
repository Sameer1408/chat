import { useState } from "react";
import { collection, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getDocs ,getDoc} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

function Search({ db ,currentuser,setuser,User}) {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
   
    try{
      const q =  query(collection(db, "users"),
      where("displayName", "==", username));
      // console.log(q,'qqqqqqq');
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
         
        setUser(doc.data());
    });
    } catch(err){
      console.log(err);
      setErr(true);
    }
  }

  const handleKey = (e) => {
    e.code == "Enter" && handleSearch();
  }

  const handleSelect=async()=>{
    //check wheter the group(chats in firestore exists,if not create)
    const combinedId = currentuser.uid>user.uid?currentuser.uid+user.uid:user.uid+currentuser.uid;
    try{
      const res = await getDoc(doc(db,"chats",combinedId));
      
      if(!res.exists())
      {
        //create a chat in chats collection
        
        await setDoc(doc(db,"chats",combinedId),{messages:[]})
        //create user chats
        // console.log(currentuser.uid,"__",combinedId,"____",user.uid);
        await updateDoc(doc(db,"userChats",currentuser?.uid),{
          [combinedId+".userInfo"]:{
            uuid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".data"]:serverTimestamp()
        })

          await updateDoc(doc(db,"userChats",user?.uid),{
          [combinedId+".userInfo"]:{
            uuid:currentuser.uid,
            displayName:currentuser.displayName,
            photoURL:currentuser.photoURL
          },
          [combinedId+".data"]:serverTimestamp()
        })
        
      }
            
    }catch(err){
      console.log(err)
    }
    setUser(null);
    setUsername("");
    //create user chats
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          value={username}
          placeholder="search a user and press Enter"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>
      {err&& <span>User not found!</span>}
      {
        user&&  
        <div className="userChat" onClick={handleSelect}>
        <img src={user?.photoURL}
         alt=""></img>
        <div className="userChatInfo">
          <span>{user?.displayName}</span>
        </div>
      </div>
      }
    </div>
  );
}

export default Search;