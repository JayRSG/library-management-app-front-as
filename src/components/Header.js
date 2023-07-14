import SwrClient from "@/hooks/swr"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Header = () => {

  const { data: admin, error: adminError } = SwrClient({
    endpoint: '/admin',
    middleware: "guest"
  })

  const { data: user, error: userError } = SwrClient({
    endpoint: '/user',
    middleware: "guest"
  })

  return (
    <>
      <div className='main-wrapper'>
        <div className='header'>
          <div className='header-left'>
            <Link href='/' className='logo'>
              <Image src='/img/logo.png' width='35' height='35' alt='' /> <span>LMS</span>
            </Link>
          </div>

          <a id='mobile_btn' className='mobile_btn float-left' href='#sidebar'>
            <i className='fa fa-bars'></i>
          </a>

          <ul className='nav user-menu header-right'>
            <li className='nav-item dropdown '>
              <a href='#' className='dropdown-toggle nav-link user-link' data-bs-toggle='dropdown'>
                <span className='user-img'>
                  <Image className='rounded-circle' src='/img/user.jpg' width='24' height='24' alt='Admin' />
                  <span className='status online'></span>
                </span>
                <span style={{ marginLeft: 10 }}>Login</span>
              </a>

              <div className='dropdown-menu'>
                <Link className='dropdown-item' href='/admin/login'>
                  Admin
                </Link>

                <Link className='dropdown-item' href='/user/login'>
                  User
                </Link>
              </div>
            </li>
          </ul>
          :
          <ul className="nav user-menu header-right">
            Hello
            {
              admin ?
                <div className="nav-item">
                  <span style={{ marginLeft: 5, color: "#bbb" }}>{admin?.data?.first_name}</span>
                </div>
                : user ?

                  <div className="nav-item">
                    <span style={{ marginLeft: 5, color: "#bbb" }}>{user?.data?.first_name}</span>
                  </div>
                  :
                  ""
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
