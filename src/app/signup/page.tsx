"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result , setResult] = useState("Sign Up")

    async function handleClick(){
      try{
        const res = await axios.post('/api/signup',{
            username,
            password
          })
          setResult("signed up successfully")
          if(res){
          router.push('/api/auth/signin')}   
      }catch(e){
        setResult("User already existes")
      }
    }

  return (
    <div className='flex justify-center items-center bg-black w-full h-full'>
      <div className='flex flex-col justify-center items-center bg-white rounded-xl p-5 w-full h-full text-black'>
      <input type="text" placeholder='username/email' onChange={(e)=>{
        setUsername(e.target.value)
      }}/>
      <input type="password" placeholder='password' onChange={(e)=>{
        setPassword(e.target.value)
      }}/>
      <button onClick={handleClick}>{result}</button>
      </div>
    </div>
  )
}
