import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { post } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const AdminRegister = () => {
  const router = useRouter()
  const { data: admin, isLoading: adminLoading, mutate: adminMutate } = useAdmin({
    middleware: "guest", redirectIfAuthenticated: "/admin"
  })
  const { data: user, isLoading: userLoading, mutate: userMutate } = useUser({
    middleware: "guest", redirectIfAuthenticated: "/user"
  })

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    submit: false
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      submit: false,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData?.submit == true) {
      await post({
        postendpoint: '/admin/register', postData: formData, config: {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }
      }).then((res) => {
        alert(res?.data?.message);
        router.push('/admin/login')
      }).catch(error => {
        alert(error?.response?.data?.message)
      })
    }

  }
  if (user || admin) {
    return "Loading..."
  } else {
    return (
      <>
        <form action='' className='form-signin' onSubmit={e => {
          e.preventDefault()
          handleSubmit(e)
        }}>
          <div className='form-group'>
            <label>First Name</label>
            <input type='text' name="first_name" onChange={handleInputChange} value={formData?.first_name} className='form-control' required />
          </div>

          <div className='form-group'>
            <label>Last Name</label>
            <input type='text' name="last_name" onChange={handleInputChange} value={formData?.last_name} className='form-control' required />
          </div>

          <div className='form-group'>
            <label>Email Address</label>
            <input type='email' name="email" onChange={handleInputChange} value={formData?.email} className='form-control' required />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input type='password' name="password" onChange={handleInputChange} value={formData?.password} className='form-control' required />
          </div>

          <div className='form-group text-center'>
            <button className='btn btn-primary account-btn' type='submit'>
              Add Fingerprint
            </button>
          </div>

          <div className='form-group text-center'>
            <button className='btn btn-primary account-btn' name="submit" type='submit' onClick={(e) => {
              e.stopPropagation()
              setFormData({ ...formData, submit: true })
            }}>
              Signup
            </button>
          </div>

          <div className='text-center login-link'>
            Already have an account? <Link href='/admin/login'>Login</Link>
          </div>
        </form>
      </>
    )
  }
}

export default AdminRegister