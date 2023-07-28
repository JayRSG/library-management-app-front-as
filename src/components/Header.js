import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Header = () => {
  const { data: admin, isLoading: adminLoading, error: adminError } = useAdmin({ middleware: "guest" })
  const { data: user, isLoading: userLoading, error: userError } = useUser({ middleware: "guest" })

  return (
    <>
      <div className='main-wrapper'>
        <div className='header'>
          <div className='header-left'>
            <Link href='/' className='logo'>
              <Image src='/img/logo2.png' width='60' height='60' alt=''/> <span>L M S</span>
            </Link>
          </div>

          <a id='mobile_btn' className='mobile_btn float-left' href='#sidebar'>
            <i className='fa fa-bars'></i>
          </a>

          {!user && !admin ?
            (
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
            )
            :
            <ul style={{marginTop: "10px"}} className="nav user-menu header-right">
              
              {
                user ?
                  <div className="nav-item">
                    <span style={{ color: "#fff", marginRight: 30}}>{"Hello, " + user?.data?.first_name}</span>
                  </div>
                  :
                  admin ?

                    <div className="nav-item">
                      <span style={{color: "#fff", marginRight: 30}}>{"Hello, " + admin?.data?.first_name}</span>
                    </div>
                    :
                    ""
              }
            </ul>
          }

        </div>
      </div>
    </>
  )
}

export default Header
