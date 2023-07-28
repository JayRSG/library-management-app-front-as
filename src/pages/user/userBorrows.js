import Header from "@/components/Header"
import UserBorrows from "@/components/user/UserBorrows"
import UserNav from "@/components/user/UserNav"
import { useUser } from "@/hooks/useUser"
import React from "react"

const userBorrows = () => {
  const { data: user, isLoading: userLoading, } = useUser({ middleware: "auth" })
  return (
    <>
      <Header />

      <UserNav />

      <UserBorrows auth={user?.data} />
    </>
  )
}

export default userBorrows
