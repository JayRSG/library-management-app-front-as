import Header from "@/components/Header"
import UserNav from "@/components/user/UserNav"
import SwrClient from "@/hooks/swr"
import React from "react"

const Index = () => {
  const { data: user, error: userError } = SwrClient({
    endpoint: '/user',
    middleware: "auth",
    redirectIfAuthenticated: "/user"
  })

  return (
    <>
      <Header />

      <UserNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div>
            <h1 style={{ textAlign: "center" }}>Welcome to your panel</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
