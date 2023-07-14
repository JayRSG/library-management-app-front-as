import { useRouter } from "next/router"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faDashboard, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const UserNav = () => {
  const router = useRouter()

  return (
    <>
      <div className='sidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>Main</li>

              <li className={router.pathname === "/user" ? "active" : ""}>
                <Link href='/user'>
                  <FontAwesomeIcon icon={faDashboard} />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li className={router.pathname === "/user/userProfile" || router.pathname === "/user/userEditProfile" ? "active" : ""}>
                <Link href='/user/userProfile'>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>My Account</span>
                </Link>
              </li>

              <li className={router.pathname === "/user/books" || router.pathname === "/user/addBooks" ? "active" : ""}>
                <Link href='/user/books'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Books</span>
                </Link>
              </li>

              <li className={router.pathname === "/user/userBookReports" ? "active" : ""}>
                <Link href='/user/userBookReports'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Book Reports</span>
                </Link>
              </li>

              <li>
                <Link href='/logout?type=user'>
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

export default UserNav
