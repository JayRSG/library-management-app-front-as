import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import BorrowList from "@/components/admin/BorrowList"
import { useAdmin } from "@/hooks/useAdmin"
import { faEllipsisVertical, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React from "react"

const issueBook = () => {
  const { data: adminData, isLoading: adminLoading } = useAdmin({ middleware: "auth" })
  return (
    <>
      <Header />

      <AdminNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-4 col-3'>
              <h4 className='page-title'>Book Borrowers</h4>
            </div>
            {/* <div className='col-sm-8 col-9 text-right m-b-20'>
              <Link href='/admin/addReturnBooks' className='btn btn btn-primary btn-rounded' style={{ float: "right" }}>
                <FontAwesomeIcon icon={faPlus} /> Return Book
              </Link>
            </div> */}
          </div>

          <BorrowList auth={adminData} loader={adminLoading} />
        </div>
      </div>
    </>
  )
}

export default issueBook
