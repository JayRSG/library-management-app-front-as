import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faDashboard, faList, faUser, faUserPlus, } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { resolveActive } from "@/lib/utils"
import { useRouter } from "next/router"

const UserNav = () => {
  const router = useRouter()
  return (
    <>
      <div className='sidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>Main</li>

              <li className={resolveActive(["/user"], router.pathname)}>
                <Link href='/user'>
                  <FontAwesomeIcon icon={faDashboard} />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li className={resolveActive(["/user/userProfile", "/user/userEditProfile"], router.pathname)}>
                <Link href='/user/userProfile'>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>My Account</span>
                </Link>
              </li>

              <li className={resolveActive(["/booksLibrary", "/issueBook", "/user/addBooks"], router.pathname)}>
                <Link href='/booksLibrary'>
                  <FontAwesomeIcon icon={faBook} />
                  <span>Book Library</span>
                </Link>
              </li>

              <li className={resolveActive(["/user/userBorrows"], router.pathname)}>
                <Link href='/user/userBorrows'>
                  <FontAwesomeIcon icon={faList} />
                  <span>My Borrows</span>
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
