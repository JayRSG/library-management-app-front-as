import Header from "@/components/Header"
import UserNav from "@/components/user/UserNav"
import { useUser } from "@/hooks/useUser"
import React from "react"

const Index = () => {
  const { data: user, isLoading: userLoading, error: userError } = useUser({ middleware: "auth" })

  return (
    <>
      <Header />

      <UserNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div>
            <h1 style={{ textAlign: "center" }}>Reader, Welcome to your panel</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
