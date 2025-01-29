"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"  // Correct import for client-side routing

const Appbar = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="w-full h-full flex justify-between p-5 bg-gray-800 text-white">
      <div>100xSchool</div>

      {/* Conditional rendering based on session */}
      {!session ? (
        <>
          <button
            className="bg-blue-700 p-3 rounded"
            onClick={() => signIn()}
          >
            Sign In
          </button>
          <button
            className="bg-green-700 p-3 rounded"
            onClick={() => router.push('/')}
          >
            Sign Up
          </button>
        </>
      ) : (
        <button
          className="bg-red-700 p-3 rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      )}
    </div>
  )
}

export default Appbar;
