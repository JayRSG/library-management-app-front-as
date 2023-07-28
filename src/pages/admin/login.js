import LoginComponent from "@/components/auth/LoginComponent"
import React from "react"

const login = () => {
  return (
    <>
      <div className='main-wrapper account-wrapper'>
        <div className='account-page'>
          <div className='account-center'>

            <LoginComponent type={'admin'} />

          </div>
        </div>
      </div>
    </>
  )
}

export default login
