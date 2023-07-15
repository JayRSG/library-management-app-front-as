import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import { useAdmin } from "@/hooks/useAdmin"
import React from "react"

const Index = () => {
  const { data: admin, isLoading: adminLoading, error: adminError } = useAdmin({ middleware: "auth", })

  return (
    <>
      <Header />

      <AdminNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div>
            <h1 style={{ textAlign: "center" }}>Admin, Welcome to your panel</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
