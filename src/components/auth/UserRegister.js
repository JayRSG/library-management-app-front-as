import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import { post } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const UserRegister = () => {
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
    student_id: "",
    department: "",
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
        postendpoint: "/user/register", postData: formData, config: {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }
      }).then((res) => {
        alert(res?.data?.message);
        router.push('/user/login')
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
        <form action='' className='form-signin' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>First Name</label>
            <input type='text' name="first_name" onChange={handleInputChange} value={formData?.first_name} className='form-control' />
          </div>

          <div className='form-group'>
            <label>Last Name</label>
            <input type='text' name="last_name" onChange={handleInputChange} value={formData?.last_name} className='form-control' />
          </div>

          <div className='form-group'>
            <label>Email Address</label>
            <input type='email' name="email" onChange={handleInputChange} value={formData?.email} className='form-control' />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input type='password' name="password" onChange={handleInputChange} value={formData?.password} className='form-control' />
          </div>

          <div className='form-group'>
            <label>Student Id</label>
            <input type='text' name="student_id" onChange={handleInputChange} value={formData?.student_id} className='form-control' />
          </div>

          {/* <div className='form-group'>
            <label>Semester</label>
            <input type='text' className='form-control' />
          </div> */}

          <div className='form-group'>
            <label>Department</label>
            <input type='text' name="department" onChange={handleInputChange} value={formData?.department} className='form-control' />
          </div>

          <div className='form-group text-center'>
            <button className='btn btn-primary account-btn' type='submit'>
              Add fingerprint
            </button>
          </div>

          <div className='form-group text-center'>
            <button className='btn btn-primary account-btn' type='submit' onClick={(e) => {
              e.stopPropagation()
              setFormData({
                ...formData,
                submit: true
              })
            }}>
              Signup
            </button>
          </div>

          <div className='text-center login-link'>
            Already have an account? <Link href='/user/login'>Login</Link>
          </div>
        </form>
      </>
    )
  }
}

export default UserRegister