import SwrClient, { post } from "@/hooks/swr"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const LoginComponent = ({ type }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: type
  })

  const { data: user, isLoading: userLoading, error: userError, get, post } = SwrClient({
    endpoint: `/${type}`,
    middleware: "guest",
    redirectIfAuthenticated:
      type == "user" ?
        "/user" :
        type == "admin" ?
          '/admin' : ""
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    post({
      postendpoint: "/login", postData: formData, options: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      get()
    }).catch(error => {
      alert(error?.response?.data?.message)
    })
  }

  return (
    <div className='account-box'>
      <form action='' className='form-signin' onSubmit={handleFormSubmit}>
        <div className='account-logo'>
          <Link href='/'>
            <Image src='/img/logo-dark.png' alt='' width={240} height={240} />
          </Link>
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            type='text'
            autoFocus=''
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            type='password'
            className='form-control'
          />
        </div>

        <div className='form-group text-center'>
          {userLoading ?
            (<div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>)
            :

            (<button
              type='submit'
              className='btn btn-primary account-btn'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Login
            </button>)
          }
        </div>

        <div className="text-center">Or</div>

        <div className='form-group text-center'>
          <button type='submit' className='btn btn-primary account-btn'>
            Scan Fingerprint
          </button>
        </div>

        {/* <div className='form-group text-right'>
									<Link href='#'>Forgot your password?</Link>
								</div> */}


        <div className='text-center register-link'>
          Don’t have an account? <Link href='/user/register'>Register Now</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginComponent