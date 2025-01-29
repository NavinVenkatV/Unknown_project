import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { prompt } = await req.json();
    try{
        const respond = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,{
                contents : [
                    {
                        parts : [{text : prompt}]
                    },
                ]
            },{
                headers : {
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(respond)
        return NextResponse.json(respond.data)
    }catch(e){
        return NextResponse.json(e)
    }
}

