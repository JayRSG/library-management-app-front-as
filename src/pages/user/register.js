import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import UserRegister from "@/components/auth/UserRegister"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const register = () => {
  return (
    <>
      <Header />
      <AdminNav />
      
      <div className='main-wrapper  account-wrapper'>
        <div className='account-page'>
          <div className='account-center'>
            <div className='account-box'>
              <div className='account-logo'>
                <Link href='/'>
                  <Image src='/img/logo2.png' alt='' width={240} height={240} />
                </Link>
              </div>

              <UserRegister />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default register
