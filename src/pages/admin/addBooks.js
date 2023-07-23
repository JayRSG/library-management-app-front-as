import Header from "@/components/Header"
import AddBooks from "@/components/admin/AddBooks"
import AdminNav from "@/components/admin/AdminNav"
import { useAdmin } from "@/hooks/useAdmin"

const addBook = () => {
  const { data: admin, isLoading: adminLoading } = useAdmin({ middleware: "auth" })
  return (
    <>
      <Header />
      <AdminNav />
      <AddBooks />
    </>
  )
}

export default addBook