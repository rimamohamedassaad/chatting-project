import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from "../firebase"
import { setDoc, doc, Timestamp } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import './pages.css'
const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        pass: "",
        error: null,
        loading: false
    })
    const navigate = useNavigate();
    const { name, email, pass, error } = data;
    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true })
        console.log(data)
        if (!name || !email || !pass) {
            setData({ ...data, error: "All fields are required" })
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, pass);
            console.log("hshsh", result.user)
            await setDoc(doc(
                db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            }
            )
            setData({
                name: "",
                email: "",
                pass: "",
                error: null,
                loading: true
            })
            navigate('/')
        }
        catch (err) {
            console.log(err)
            setData({ ...data, error: err.message, loading: false })
        }
    }
    return (
        <div>
            <form className='container' onSubmit={handleSubmit}>
                <div><h1>Register now</h1></div>
                <div>
                    <label for="fname">name
                    </label>
                </div>
                <div> <input type='text' name="name" id="fname" value={name} onChange={handleChange} /></div>

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
                <div><button type='submit' disabled={data.loading}>Register</button></div>
                {error ? <p className='error'>{error}</p> : null}
            </form>
        </div>

    )
}

export default Register