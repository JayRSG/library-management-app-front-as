import LoginComponent from "@/components/auth/LoginComponent"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const login = () => {

  return (
    <>
      <div className='main-wrapper account-wrapper'>
        <div className='account-page'>
          <div className='account-center'>

            <LoginComponent type={'user'} />

          </div>
        </div>
      </div>
    </>
  )
}

export default login
