import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from "../firebase"
import { doc , updateDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import './pages.css'
import Loader from '../Loader/Loader'
const Login = () => {
    const [data, setData] = useState({
        email: "",
        pass: "",
        error: null,
        loading: false
    })
    const navigate = useNavigate();
    const { email, pass, error,loading } = data;
    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true })
        console.log(data)
        if (!email || !pass) {
            setData({ ...data, error: "All fields are required" })
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, pass);
            console.log("hshsh", result.user)
            await updateDoc(doc(
                db, "users", result.user.uid), {
                isOnline: true
            }
            )
            setData({
                email: "",
                pass: "",
                error: null,
                loading: true
            })
            console.log("from",auth.currentUser)
            navigate('/profile')
        }
        catch (err) {
            console.log(err)
            setData({ ...data, error: err.message, loading: false })
        }
    }
    return (
        <div>
            {
              !loading ?
            
            <form className='container' onSubmit={handleSubmit}>
                <div><h1>sign in </h1></div>
                <div>
                    <label for="femail">email
                    </label>
                </div>
                <div> <input type='text' name="email" id="femail" value={email} onChange={handleChange} /></div>
                <div>
                    <label for="fpass">pass
                    </label>
                </div>
                <div> <input type='text' name="pass" id="fpass" value={pass} onChange={handleChange} /></div>
             {error ? <p>{error}</p> : null}
                <div><button type='submit' disabled={loading}>login</button></div>
               
            </form>
            : <Loader/>}
        </div>

    )
}

export default Login