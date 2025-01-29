"use client"

import { signIn, signOut } from "next-auth/react"

 const Appbar = ()=>{
    return (
        <div className="w-full h-full flex justify-between">
            <div>100xSchool</div>
            <button className="bg-blue-700 p-5 mr-3" onClick={()=>{
                signIn()
            }}>Sign In</button>
            <button className="bg-red-700 p-5"
            onClick={()=>[
                signOut()
            ]}>
                Sign Out
            </button>
        </div>
    )
}

export default Appbar;