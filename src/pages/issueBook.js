import Header from "@/components/Header"
import IssueBook from "@/components/IssueBook"
import AdminNav from "@/components/admin/AdminNav"
import UserNav from "@/components/user/UserNav"
import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const addBook = () => {
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
    typeof user == "object" || typeof admin == "object" ?
      <>
        <Header />

        {user ? <UserNav /> : admin ? <AdminNav /> : ""}

        <IssueBook auth={user ? user?.data : admin?.data} auth_type={user ? "user" : admin ? "admin" : ""} />
      </> : "loading..."
  )
}

export default addBook
