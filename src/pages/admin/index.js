import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import SwrClient from "@/hooks/swr"
import React from "react"

const Index = () => {
  const { data: admin, error: adminError } = SwrClient({
    endpoint: '/admin',
    middleware: "auth",
    redirectIfAuthenticated: "/admin"
  })

  return (
    <>
      <Header />

      <AdminNav />

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
