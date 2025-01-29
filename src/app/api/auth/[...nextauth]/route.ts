import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Usernmae/Email", type: "text", placeholder: "example@gmail.com" },
        password: { label: "password", type: "password", placeholder: "Your password" },
      },

      //this aithorize function is just authenticating user prompts and checking with the db.
      async authorize(credentials) {
        if(!credentials?.username || !credentials?.password){
            return null
        }
        const existingUser = await prisma.user.findUnique({
            where : {
                username : credentials.username
            }
        })
        if(existingUser){
            const hash_pass = await bcrypt.compare(credentials.password, existingUser.password)
            if(hash_pass){
                return {
                    id : '1',
                    username : existingUser.username
                }
            }
        }
        const hash_pass = await bcrypt.hash(credentials.password, 10)
        await prisma.user.create({
            data : {
                username : credentials.username,
                password : hash_pass
            }
        })
        return {
          id: '1',
          username : credentials.username,
          password : credentials.password
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
