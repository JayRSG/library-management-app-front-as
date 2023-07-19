import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressBook, faBook, faDashboard, faRotateLeft, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
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

              {/* <li className={resolveActive(["/admin/adminProfile"])}>
								<Link href='/admin/adminProfile'>
									<FontAwesomeIcon icon={faUserPlus} />
									<span>My Account</span>
								</Link>
							</li> */}

              <li className={resolveActive(["/booksLibrary", "/issueBook", "/addBooks"], router.pathname)}>
                <Link href='/booksLibrary'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Book Library</span>
                </Link>
              </li>

              <li className={resolveActive(["/admin/issueBook", "/admin/addIssueBooks"], router.pathname)}>
                <Link href='/admin/issueBook'>
                  <FontAwesomeIcon icon={faAddressBook} />
                  <span>Issue Books</span>
                </Link>
              </li>

              <li className={resolveActive(["/admin/returnBook", "/admin/addReturnBooks"], router.pathname)}>
                <Link href='/admin/returnBook'>
                  <FontAwesomeIcon icon={faRotateLeft} />
                  <span>Return Books</span>
                </Link>
              </li>

              <li className={resolveActive(["/admin/bookStock", "/admin/addBook"], router.pathname)}>
                <Link href='/admin/bookStock'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Add Books</span>
                </Link>
              </li>

              {/* <li className={resolveActive(["/user/userBookReports"], router.pathname)}>
								<Link href='/user/userBookReports'>
									<FontAwesomeIcon icon={faUserPlus} />
									<span>Add User</span>
								</Link>
							</li> */}


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
