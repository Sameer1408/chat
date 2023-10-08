import { useState } from 'react';
import './style.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


function Register({ db }) {

    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        const auth = getAuth();

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storage = getStorage();
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
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
                        console.log('File available at', downloadURL, res.user);
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })

                        const docData = {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        };
                        await setDoc(doc(db, "users", res?.user?.uid), docData);
                        await setDoc(doc(db,"userChats",res?.user?.uid),{});
                        setLoading(false);
                        navigate("/")
                    });
                }
            );


            // uploadTask.on('state_changed',
            //     (error) => {
            //                setErr(true);
            //                console.log(error);
            //     },
            //     (data) => {
            //         console.log("inside")
            //         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            //             console.log('File available at', downloadURL);
            //             await updateProfile(res.user,{
            //                 displayName,
            //                 photoURL:downloadURL
            //             })
            //             await setDoc(doc(db, "users",res.user.uid), {
            //                 uid:res.user.uid,
            //                 displayName,
            //                 email,
            //                 photoURL:downloadURL
            //               });
            //         });
            //     }
            // );
        }
        catch (error) {
            setErr(true);
            console.log(error)
            setLoading(false);
        }
    }


    return (<div className="formContainer">
        <div className="formWraper">
            <span className="logo">Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name"></input>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <p>minimum 6 characters password</p>
                <input type="file"></input>
                {/* <lable type="file" htmlFor="file">
                    file
                </lable> */}
                <button disabled={loading}>{
                    loading?<>Loading..</>
                    :<>Sign up </>
                    }</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Do you have an account? Login</p>
        </div>
    </div>
    )
}

export default Register;