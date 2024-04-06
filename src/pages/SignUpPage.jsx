import React from 'react'
import { SignUp } from "@clerk/clerk-react"


const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full bg-green-100">
        <SignUp />
      </div>
    </>
  )
}

export default SignUpPage