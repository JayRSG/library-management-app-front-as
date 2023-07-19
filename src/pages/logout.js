import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { logout } from "@/lib/axios"
import { useRouter } from "next/router"

const Logout = () => {
  const router = useRouter()
  const { type } = router.query

  const { data: admin, isLoading: adminLoading } = useAdmin({ middleware: "auth" })
  const { data: user, isLoading: userLoading } = useUser({ middleware: "auth" })

  if ((!adminLoading || !userLoading) && (admin || user)) {
    logout()
      .catch(error => {
        throw error
      })
  }

  return (
    <div>Logging Out</div>
  )
}

export default Logout