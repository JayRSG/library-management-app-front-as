import { useRouter } from "next/router"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressBook, faBook, faDashboard, faRotateLeft, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const AdminNav = () => {
  const router = useRouter()

  return (
    <>
      <div className='sidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>Main</li>

              <li className={router.pathname === "/admin" ? "active" : ""}>
                <Link href='/admin'>
                  <FontAwesomeIcon icon={faDashboard} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* <li className={router.pathname === "/admin/adminProfile" ? "active" : ""}>
								<Link href='/admin/adminProfile'>
									<FontAwesomeIcon icon={faUserPlus} />
									<span>My Account</span>
								</Link>
							</li> */}

              <li className={router.pathname === "/admin/bookStock" || router.pathname === "/admin/addBook" ? "active" : ""}>
                <Link href='/admin/bookStock'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Add Book Stock</span>
                </Link>
              </li>

              {/* <li className={router.pathname === "/user/userBookReports" ? "active" : ""}>
								<Link href='/user/userBookReports'>
									<FontAwesomeIcon icon={faUserPlus} />
									<span>Add User</span>
								</Link>
							</li> */}

              <li className={router.pathname === "/admin/issueBook" || router.pathname === "/admin/addIssueBooks" ? "active" : ""}>
                <Link href='/admin/issueBook'>
                  <FontAwesomeIcon icon={faAddressBook} />
                  <span>Issue Books</span>
                </Link>
              </li>

              <li className={router.pathname === "/admin/returnBook" || router.pathname === "/admin/addReturnBooks" ? "active" : ""}>
                <Link href='/admin/returnBook'>
                  <FontAwesomeIcon icon={faRotateLeft} />
                  <span>Return Books</span>
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
