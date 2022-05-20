import React, { useEffect, useState } from 'react'
import img from '../images/louki.jpeg'
import "./comp.css"
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
export const User = ({ user, selectUser, user1, chat }) => {
    const user2 = user?.uid;
    const [data, setDate] = useState("")
    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        const unsub = onSnapshot(doc(db, "lastMsg", id), doc => {
            setDate(doc.data())
        })
        return () =>
            unsub()

    }, [])
    return (
        <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={() => {
            selectUser(user)
        }}>
            <div className='user_info'>
                <div className='user_details'>
                    <img src={user.avatar || img} alt="avatar" className='avatarr' />
                    <h3>{user.name}</h3>
                    {data?.from !==user1 && data?.unread && (
                        <small className='unread'>New</small>
                    ) }
                </div>
                <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
            </div>
            {data && (
                <p className='truncket'>
                    <strong>{data.from === user1 ? "Me: " : null}
                    </strong>{data.text}
                </p>
            )}
        </div>
    )
}
