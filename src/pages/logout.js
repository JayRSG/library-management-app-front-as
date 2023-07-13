import SwrClient from "@/hooks/swr"
import { useRouter } from "next/router"

const Logout = () => {
  const router = useRouter()
  const { type } = router.query

  const { data: user, error: userError, logout } = SwrClient({
    endpoint: `/${type}`,
    middleware: "auth",
  })

  if (!userError) {
    logout()
      .then((res) => {
        if (res?.status >= 400 && res?.status <= 500)
          router.push('/')
      })
  }

  return (
    <div>Logging Out</div>
  )
}

export default Logout