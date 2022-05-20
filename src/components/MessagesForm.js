import React from 'react'
import { Upload } from './svg/Upload'

export const MessagesForm = ({ handleSubmit, text, setText, setImg }) => {
    return (
        <form className='message_form' onSubmit={handleSubmit}>
            <label htmlFor='img'><Upload />
            </label>
            <input type="file" accept='image/' id="img" hidden onChange={(e) => setImg(e.target.files[0])} />
            <div>  <input type="text" placeholder='enter your message' value={text} onChange={e => {
                setText(e.target.value)
            }} /></div>
            <div>
                <button className='btn' type='submit'>send</button>
            </div>
        </form>
    )
}
