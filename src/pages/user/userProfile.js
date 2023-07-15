import Header from "@/components/Header"
import UserNav from "@/components/user/UserNav"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const userProfile = () => {
  return (
    <>
      <Header />

      <UserNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-7 col-6'>
              <h4 className='page-title'>My Profile</h4>
            </div>

            <div className='col-sm-5 col-6 text-right m-b-30'>
              <Link href='/user/userEditProfile' className='btn btn-primary btn-rounded'>
                <FontAwesomeIcon icon={faPlus} /> Edit Profile
              </Link>
            </div>
          </div>

          <div className='card-box profile-header'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='profile-view'>
                  <div className='profile-basic'>
                    <div className='row'>
                      <div className='col-md-5'>
                        <div className='profile-info-left'>
                          <h3 className='user-name m-t-0 mb-0'>Arafat Rasul</h3>
                          <small className='text-muted'>Bsc 2018-2023</small>
                          <div className='staff-id'>Student ID : 18202007 CSE</div>
                        </div>
                      </div>

                      <div className='col-md-7'>
                        <ul className='personal-info'>
                          <li>
                            <span className='title'>Phone:</span>
                            <span className='text'>
                              <a href='#'>0305-8751544</a>
                            </span>
                          </li>

                          <li>
                            <span className='title'>Email:</span>
                            <span className='text'>
                              <a href='#'>example@gmail.com</a>
                            </span>
                          </li>

                          <li>
                            <span className='title'>Birthday:</span>
                            <span className='text'>1st January</span>
                          </li>

                          <li>
                            <span className='title'>Address:</span>
                            <span className='text'>Lalkhan Bazar, Bangladesh</span>
                          </li>

                          <li>
                            <span className='title'>Gender:</span>
                            <span className='text'>Male</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default userProfile
