import { useAdmin } from "@/hooks/useAdmin"
import { post } from "@/lib/axios"
import { useRouter } from "next/router"
import { useState } from "react"

const UserRegister = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    student_id: "",
    phone: "",
    user_type_id: "",
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
        router.push('/admin/users')
      }).catch(error => {
        alert(error?.response?.data?.message)
      })
    }

  }

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
          <label>Phone</label>
          <input type='text' name="phone" onChange={handleInputChange} value={formData?.phone} className='form-control' />
        </div>

        {/* <div className='form-group'>
            <label>Password</label>
            <input type='password' name="password" onChange={handleInputChange} value={formData?.password} className='form-control' />
          </div> */}


        <div className='form-group'>
          <label>User type</label>
          <select name="user_type_id" onChange={handleInputChange} value={formData?.user_type_id} className='form-control select' required>
            <option value="" disabled>Select User Type</option>
            <option value="1">Student</option>
            <option value="2">Teacher</option>
            <option value="3">Officials</option>
            <option value="4">Guest</option>
          </select>
        </div>

        {/* Shown only when user type student is selected */}
        {formData?.user_type_id == "1" &&
          <div className='form-group'>
            <label>Student Id</label>
            <input type='text' name="student_id" onChange={handleInputChange} value={formData?.student_id} className='form-control' required />
          </div>
        }
        {/* <div className='form-group text-center'>
          <button className='btn btn-primary account-btn' type='submit'>
            Add fingerprint
          </button>
        </div> */}

        <div className='form-group text-center'>
          <button className='btn btn-primary account-btn' type='submit' onClick={(e) => {
            e.stopPropagation()
            setFormData({
              ...formData,
              submit: true
            })
          }}>
            Register
          </button>
        </div>
      </form>
    </>
  )
}

export default UserRegister