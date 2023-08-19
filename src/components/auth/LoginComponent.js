import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { post } from "@/lib/axios"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const LoginComponent = ({ type }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: type
  })

  const { data: admin, isLoading: adminLoading, mutate: adminMutate } = useAdmin({
    middleware: "guest", redirectIfAuthenticated: "/admin"
  })
  const { data: user, isLoading: userLoading, mutate: userMutate } = useUser({
    middleware: "guest", redirectIfAuthenticated: "/user"
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await post({
      postendpoint: "/login", postData: formData, config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then(() => {
      type == "admin" ? adminMutate() : type == 'user' ? userMutate() : ""
      if (type == "admin" || type == "user") {
        window.localStorage.setItem('auth_type', type)
      }
    })
      .catch(error => {
        alert(error?.response?.data?.message)
      })
  }

  if (user || admin) {
    return "Loading..."
  } else {
    return (
      <div className='account-box'>
        <form action='' className='form-signin' onSubmit={handleFormSubmit}>
          <div className='account-logo'>
            <Link href='/'>
              <Image src='/img/logo2.png' alt='' width={850} height={450} />
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
              required={true}
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
              required={true}
              className='form-control'
            />
          </div>

          <div className='form-group text-center'>
            <button
              type='submit'
              className='btn btn-primary account-btn'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Login
            </button>

          </div>

          <div className="text-center">Or</div>

          <div className='form-group text-center'>
            <button type='submit' className='btn btn-primary account-btn'>
              Scan Fingerprint
            </button>
          </div>


          {/* <div className='text-center register-link'>
            Don’t have an account? <Link href={`/${type}/register`}>Register Now</Link>
          </div> */}
        </form>
      </div>
    )
  }


}

export default LoginComponent