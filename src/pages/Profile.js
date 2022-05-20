import React, { useState, useEffect } from 'react'
import avatar from '../images/louki.jpeg'
import { AddIcon } from '../components/svg/AddIcon';
import { DeleteIcon } from '../components/svg/deleteIcon';
import { storage, db, auth } from '../firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc } from 'firebase/firestore'

export const Profile = () => {
    const [img, setImg] = useState("");
    const [user, setUser] = useState("");
    const deleteImage = async () => {
        try {
            const confimDelete = window.confirm("are you sure");
            if (confimDelete) {
                await deleteObject(ref(storage, user.avatarPath))
                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar : "",
                    avatarPath: ""
                })
                setImg(user.avatarPath)
            }
        } catch (err) {
            console.log(err)
        }

    }
    console.log(img)
    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        })
        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage, `avatar/${new Date().getTime()} - ${img.name}`
                );
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img)
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
                    await updateDoc(doc(db, "users", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath

                    });
                    setImg("")
                } catch (err) {
                    console.log(err.message)
                }
            };
            uploadImg();
        }
    }, [img])
    return (
        <div>
            <div className='profile'>
                <h1>{user.name}</h1>
                <div className='imageContainer'>
                <img src={user.avatar || avatar} alt='avator' />
                  <div className='overlay'>
                  <label className="inputchangeImage" htmlFor="actual-btn"><AddIcon /><label>
                     <label> {user.avatar ? <DeleteIcon deleteImage={deleteImage}/> : null}</label>       
                    </label></label>
                    <input type="file" accept='image/' id="actual-btn" hidden onChange={(e) => setImg(e.target.files[0])} />

                  </div>
                    
                </div>
                <h3>{user.email}</h3>
                <h3>created at:...</h3>
            </div>
        </div>
    )
}
