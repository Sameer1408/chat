import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7_51uxfLt-TCr5Rfns97SEQxukiEZ2pU",
  authDomain: "fir-808f3.firebaseapp.com",
  projectId: "fir-808f3",
  storageBucket: "fir-808f3.appspot.com",
  messagingSenderId: "110132628701",
  appId: "1:110132628701:web:29245f3c9cb88931305f34",
  measurementId: "G-ZYG9Q9QEWR"
};

function App() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();
  const [currentuser,setCurrentUser] = useState({});
  const [user,setUser] = useState({
    chatId:"",
    data:{}
  });


  useEffect(()=>{
    return ()=>{
      onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user);
        console.log(user,"uuuuuuseeeeeer");
      })
    }
  },[])



  return (
    <Router>
      <div className="">
        <Routes>
          <Route
            path='/'
            exact element={
             currentuser?
            <Home 
            currentuser={currentuser} 
            db={db}
            user={user}
            setUser={setUser}
            />
               :<Login/> 
             }/>
          <Route
            path='/register'
            exact element={<Register db={db} />} />
          <Route
            path='/login'
            exact element={<Login db={db} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;