import Header from "@/components/Header"
import UserEditProfile from "@/components/user/UserEditProfile"
import UserNav from "@/components/user/UserNav"
import React from "react"

const userEditProfile = () => {
  return (
    <>
      <Header />

      <UserNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <h4 className='page-title'>Edit Profile</h4>
            </div>
          </div>
          
          <UserEditProfile />
        </div>
      </div>
    </>
  )
}

export default userEditProfile
