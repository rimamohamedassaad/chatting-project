import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from "firebase/firestore"
import { AuthContext } from '../context/auth';
function Navbar() {
    const { user } = useContext(AuthContext)
    const handlSignOut = async () => {
        await updateDoc(doc(
            db, "users", auth.currentUser.uid), {
            isOnline: false
        })
        await signOut(auth);
    }
    return (
        <nav>
            {user ?
                <>
                    <Link to='/profile'>profile</Link>
                    <Link to='/'>Chatting</Link>
                    <button className='logout' onClick={handlSignOut}>logout</button>
                    {console.log("current user", user)}
                </>
                :
                <>
                    <Link to='/register'>registe</Link>
                    <Link to='/login'>login</Link>
                    {console.log("there is no user", user)}
                </>}
        </nav>
    )
}

export default Navbar