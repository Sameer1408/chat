import { useState } from 'react';
import './style.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link} from 'react-router-dom';

function Login() {

    const [err, setErr] = useState();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const auth = getAuth();
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);  
        navigate('/');    
    }



    return (<div className="formContainer">
        <div className="formWraper">
            <span className="logo">Chat</span>
            <span className="title">Log in</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>

                <button>
                    {loading?
                <>Loading..</>
                :
                <>  Sign in</>    
                }
                  
                    </button>
            </form>
            <p>Do you have an account?<Link to='/register'>Register</Link></p>
        </div>
    </div>
    )
}

export default Login;