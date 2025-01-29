"use client"

import axios from 'axios';
import React, { useState } from 'react'

export default function DashBoard() {
    const [prompt, setPrompt] = useState("")
    const [answer, setAnswer] = useState("");

    const onFunc = async ()=>{
        try{
            
            const res = await axios.post('/api/openAI',{
                prompt
            })
            const aiResponse = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            setAnswer(aiResponse)
        }catch(e){
            console.log(e);
            setAnswer("something went wrong")
        }
    }

  return (
    <div  className='flex justify-center items-center w-screen h-screen bg-neutral-300'>
        <div className='flex flex-col p-4 items-center justufy-center white text-red-700'>
            <input className='p-3 ' type="text" placeholder='Enter your queries' onChange={(e)=>{
                setPrompt(e.target.value)
            }}/>
            <button onClick={onFunc} className='p-3 mt-3'>Submit</button>
            <div>
                {answer}
            </div>
        </div>
    </div>
  )
}
