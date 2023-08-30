import { useAdmin } from "@/hooks/useAdmin"
import { put } from "@/lib/axios"
import { useState } from "react"

const AdminEditProfile = () => {
  const { data: admin, isLoading: adminLoading, error: adminError, mutate: adminMutate } = useAdmin({ middleware: "auth" })
  const user = admin?.data

  const [formData, setFormData] = useState({
    email: user?.email,
    password: "",
    new_password: "",
    confirm_password: "",
    submit: false
  })
  
  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (formData?.confirm_password != formData?.new_password) {
      alert("Password mismatch")
      return;
    } else if (formData?.submit == true) {

      await put({
        putendpoint: "/admin/update", updatedData: formData, config: {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }
      }).then(res => {
        alert(res?.data?.message);
        adminMutate()
        setFormData({
          email: user?.email,
          password: "",
          new_password: "",
          confirm_password: "",
          submit: false
        })
      }).catch(error => {
        alert(error?.response?.data?.message)
      })
    }
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        handlePasswordSubmit(e)
      }}>
        <div className='card-box'>
          <h3 className='card-title'>Account Information</h3>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group form-focus'>
                <label className='focus-label'>Email</label>
                <input type='text' className='form-control floating' defaultValue={user?.email} disabled />
              </div>
            </div>
            <div className='col-md-12'>
              <div className='form-group form-focus'>
                <label className='focus-label'>Password</label>
                <input type='password' className='form-control floating' name="password" onChange={handlePasswordChange} value={formData?.password} />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='form-group form-focus'>
                <label className='focus-label'>New password</label>
                <input type='password' className='form-control floating' name="new_password" onChange={handlePasswordChange} value={formData?.new_password} />
              </div>
            </div>

            <div className='col-md-12'>
              <div className='form-group form-focus'>
                <label className='focus-label'>Confirm Password</label>
                <input type='password' className='form-control floating' name="confirm_password" onChange={handlePasswordChange} value={formData?.confirm_password} />
              </div>
            </div>
          </div>
        </div>

        <div className='text-center m-t-20'>
          <button className='btn btn-primary submit-btn' onClick={e => {
            e.stopPropagation()
            setFormData({
              ...formData,
              email: user?.email,
              submit: true
            })
          }} type='submit'>
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default AdminEditProfile