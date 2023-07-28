import BooksLibrary from "@/components/BooksLibrary"
import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import UserNav from "@/components/user/UserNav"
import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const Books = () => {
  const router = useRouter()
  const { data: admin, isLoading: adminLoading, } = useAdmin()
  const { data: user, isLoading: userLoading, } = useUser()

  useEffect(() => {
    if (!adminLoading && !userLoading) {
      if (!admin && !user) {
        router.push('/')
      }
    }
  }, [user, admin, adminLoading, userLoading])

  return (
    <>
      <Header />
      {/* Show Either admin nav or user nav based on page. this is a common page component */}

      {user ? <UserNav /> : admin ? <AdminNav /> : ""}

      <BooksLibrary auth={user ? user : admin} auth_type={user ? "user" : admin ? "admin" : ""} />
    </>
  )
}

export default Books
