import React, { useEffect, useState } from 'react'
import { db, auth, storage } from '../firebase'
import { collection, query, onSnapshot, where, addDoc, Timestamp, orderBy, setDoc,doc , getDoc , updateDoc } from 'firebase/firestore'
import { User } from '../components/User';
import './pages.css'
import { MessagesForm } from '../components/MessagesForm';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { Message } from '../components/Message';
function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([])
  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const userRef = collection(db, "users");
    //create the query
    const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]))
    //execute it
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    })
    return () => unsub();
  }, [])
  const selectUser = async (user) => {
    setChat(user);
    console.log(user)
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgRef = collection(db, 'messages', id, 'chat')
    const q = query(msgRef, orderBy('createdAt', 'asc'))
    onSnapshot(q, querySnapshot => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })
    console.log("array",msgs)
const snapdoc = await getDoc(doc(db,"lastMsg",id))
if(snapdoc.data().from !== user1){
  await updateDoc(doc(db, "lastMsg", id),{
    unread : false
  })
}
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage, `imagesx/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img)
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ""
    })
    setDoc(doc(db,"lastMsg",id),{
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread:true
    })
    setText("");

  }
  return (
    <div className='home_container'>
      <div className='users_container'>
        {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat}/>)}
      </div>
      <div className='messages_container'>
        {chat ? (
          <>
            <div className='messages_user'>
              <h3>{chat.name}</h3>
            </div>
            <div className='messages'>
              {msgs.length ?
               msgs.map((msg, i) => 
                <Message key={i} msg={msg} user1={user1}/>
              ) :
               null}
            </div>
            <MessagesForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} />
          </>) : (<div className='no_conv'><h3>Select a user</h3></div>)}

      </div>
    </div>
  )
}

export default Home