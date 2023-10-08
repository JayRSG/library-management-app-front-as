import { useAdmin } from "@/hooks/useAdmin"
import { useDeviceData } from "@/hooks/useDeviceWS"
import { useUser } from "@/hooks/useUser"
import { post } from "@/lib/axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useState } from "react"

const LoginComponent = ({ type }) => {
  const { deviceData: fingerprintData, isScanning, socket, communicateDevice } = useDeviceData()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fingerprint_id: "",
    user_type: type
  })

  const { data: admin, isLoading: adminLoading, mutate: adminMutate } = useAdmin({
    middleware: "guest", redirectIfAuthenticated: "/admin"
  })
  const { data: user, isLoading: userLoading, mutate: userMutate } = useUser({
    middleware: "guest", redirectIfAuthenticated: "/user"
  })


  const [showMessage, setShowMessage] = useState("")

  useEffect(() => {
    if (fingerprintData) {
      let data = null
      if (typeof fingerprintData == "string") {
        data = JSON.parse(fingerprintData)
      } else {
        data = fingerprintData
      }
      setShowMessage(data)

      if (data?.message == "Fingerprint Matched" && data?.id) {
        setFormData({ ...formData, fingerprint_id: data?.id })
      }
    }
  }, [fingerprintData])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleFormSubmit = async (e = null) => {
    if (e) {
      e.preventDefault()
    }
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

  useEffect(() => {
    if (showMessage?.message == "Fingerprint Matched" && formData?.fingerprint_id > 0) {
      handleFormSubmit()
    }
  }, [formData?.fingerprint_id, showMessage])


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
            <button type='submit' className='btn btn-primary account-btn' onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              communicateDevice({ command: "search" })
            }}>
              Scan Fingerprint
            </button>
          </div>

          <div className="d-flex justify-content-center">{showMessage?.message}</div>


          {/* <div className='text-center register-link'>
            Don’t have an account? <Link href={`/${type}/register`}>Register Now</Link>
          </div> */}
        </form>
      </div>
    )
  }


}

export default LoginComponent