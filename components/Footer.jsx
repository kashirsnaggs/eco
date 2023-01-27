import React from 'react'
import {AiFillApple, AiFillFacebook, AiFillInstagram,AiOutlineTwitter} from "react-icons/ai"


const Footer = () => {
  return (
    <div className='footer-container'>
                <p>2022 Ruggmobile All rights reserverd</p>
                <p className="icons">
                        <AiFillInstagram/>
                        <AiOutlineTwitter/>
                        <AiFillFacebook/>
                        <AiFillApple/>
                </p>
    </div>
  )
}

export default Footer