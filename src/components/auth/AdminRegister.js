import { post } from "@/lib/axios"
import { useRouter } from "next/router"
import { useState } from "react"

const AdminRegister = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    submit: false
  })

  const handleInputChange = async (e) => {
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
        router.push('/admin/users')
      }).catch(error => {
        alert(error?.response?.data?.message)
      })
    }

  }

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

        {/* <div className='form-group'>
          <label>Password</label>
          <input type='password' name="password" onChange={handleInputChange} value={formData?.password} className='form-control' required />
        </div> */}

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
            Register
          </button>
        </div>
      </form>
    </>
  )
}

export default AdminRegister