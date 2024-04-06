import React from 'react'
import { SignIn } from "@clerk/clerk-react"
import Navbar from '../components/Navbar'


const SignInPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full bg-green-100">
        <SignIn />
      </div>
    </>
  )
}

export default SignInPage