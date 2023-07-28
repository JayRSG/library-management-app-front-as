import Header from "@/components/Header"
import UserNav from "@/components/user/UserNav"
import UserProfileComponent from "@/components/user/UserProfile"
import { useUser } from "@/hooks/useUser"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


const UserProfile = () => {
  const { data: user, isLoading: userLoading, mutate: userMutate } = useUser({ middleware: "auth" })
  return (
    <>
      <Header />

      <UserNav />

      <UserProfileComponent />
    </>
  )
}

export default UserProfile
