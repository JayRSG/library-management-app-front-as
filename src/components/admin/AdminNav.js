import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faDashboard, faMoneyBillWave, faUser, faUsers, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { resolveActive } from "@/lib/utils"
import { useRouter } from "next/router"

const AdminNav = () => {
  const router = useRouter()
  return (
    <>
      <div className='sidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>Main</li>

              <li className={resolveActive(["/admin"], router.pathname)}>
                <Link href='/admin'>
                  <FontAwesomeIcon icon={faDashboard} />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li className={resolveActive(["/booksLibrary", "/issueBook", "/admin/addBooks"], router.pathname)}>
                <Link href='/booksLibrary'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Book Library</span>
                </Link>
              </li>

              <li className={resolveActive(["/admin/issueBook", "/admin/addIssueBooks"], router.pathname)}>
                <Link href='/admin/issueBook'>
                  <FontAwesomeIcon icon={faUsersRectangle} />
                  <span>Borrower List</span>
                </Link>
              </li>

              <li className={resolveActive(["/admin/payment"], router.pathname)}>
                <Link href='/admin/payment'>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  <span>Payment</span>
                </Link>
              </li>

              {/* <li className={resolveActive(["/admin/bookStock"], router.pathname)}>
                <Link href='/admin/bookStock'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Add Books</span>
                </Link>
              </li> */}

              <li className={resolveActive(["/admin/users"], router.pathname)}>
								<Link href='/admin/users'>
									<FontAwesomeIcon icon={faUsers} />
									<span>Users</span>
								</Link>
							</li>


              <li>
                <Link href='/logout?type=admin'>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNav
