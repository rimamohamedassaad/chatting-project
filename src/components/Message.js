import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'
import "./comp.css"
export const Message = ({ msg, user1 }) => {
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    },[msg])
    return (
        <div className={`message_wrapper ${msg.from === user1 ? "own" : null}`} ref={scrollRef} >
            <div className='message_containere'>
                <p className={msg.from === user1 ? 'me' : "freind"}>
                    {msg.media ? <img src={msg.media} alt={msg.text} /> : null} {msg.text}
                    <br />
                    <small>
                        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                    </small>
                </p>
            </div>
        </div>
    )
}
