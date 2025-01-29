import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();



export async function POST(req:NextRequest){
    const body = await req.json();
    try{
        const findUser = await prisma.user.findUnique({
            where :{
                username : body?.username
            }
        })
        if(findUser){
            return NextResponse.json({
                msg : "User already exists"
            }, {
                status : 401
            })
        }
       
        const hash_pass = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
            data :{
                username : body.username,
                password : hash_pass
            }
        })
        return NextResponse.json({
            msg : "User created successfully"
        })
    }catch(e){
        NextResponse.json({
            msg : "Something went wrong"
        })
    }
}