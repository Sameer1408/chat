import { useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

function Input({ user, db, currentuser }) {

  // console.log(currentuser,"input")

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if(user.chatId){
      const i = uuid();
      if (img) {
      const storage = getStorage();
      const storageRef = ref(storage, i);
      const uploadTask = uploadBytesResumable(storageRef, img);
      
      uploadTask.on('state_changed',
      (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", user.chatId), {
              messages: arrayUnion({
                id: i,
                text,
                senderId: currentuser.uid,
                data: Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", user.chatId), {
        messages: arrayUnion({
          id: i,
          text,
          senderId: currentuser?.uid,
          data: Timestamp.now()
        })
      })
    }
    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [user.chatId + ".lastMessage"]: {
        text
      },
      [user.chatId + ".data"]: serverTimestamp()
    })
    
    await updateDoc(doc(db, "userChats", user.data.uuid), {
      [user.chatId + ".lastMessage"]: {
        text
      },
      [user.chatId + ".data"]: serverTimestamp()
    })
    
    setText("");
    setImg(null)
  }
  }

  return (
    <div className="input">
      <input type="text"
        placeholder="Type something..."
        value={text}
        onChange={e => setText(e.target.value)}
      ></input>
      <div className="send">
      
        <input type="file" 
           style={{ display: "none" }  }
          id="file"
          onChange={e => {setImg(e.target.files[0])
          console.log(e.target.files[0]);}
          }
        ></input>
        <label htmlFor="file">
          {
            img?.name.length>0?
            <p>{img?.name}</p>:
            <i class="ri-image-add-line"></i>
          }

        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;