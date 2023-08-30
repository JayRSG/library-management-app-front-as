import { useUser } from "@/hooks/useUser"
import { put } from "@/lib/axios"
import { useState } from "react"

const UserEditProfile = () => {
  const { data: userData, isLoading: userLoading, mutate: userMutate } = useUser({ middleware: "auth" })
  const user = userData?.data



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
        putendpoint: "/user/update", updatedData: formData, config: {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }
      }).then(res => {
        alert(res?.data?.message);
        userMutate()
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
      <div className='card-box'>
        <h3 className='card-title'>Basic Informations</h3>
        <div className='row'>
          <div className='col-md-12'>
            <div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group form-focus'>
                    <label className='focus-label'>First Name</label>
                    <input type='text' className='form-control floating' name="first_name" defaultValue={user?.first_name} disabled />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group form-focus'>
                    <label className='focus-label'>Last Name</label>
                    <input type='text' className='form-control floating' defaultValue={user?.last_name} disabled />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group form-focus'>
                    <label className='focus-label'>Student_id</label>
                    <input className='form-control floating' type='text' defaultValue={user?.student_id} disabled />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group form-focus'>
                    <label className='focus-label'>Department</label>
                    <input className='form-control floating' type='text' defaultValue={user?.student_info?.department} disabled />
                  </div>
                </div>
                {/* <div className='col-md-6'>
                  <div className='form-group form-focus select-focus'>
                    <label className='focus-label'>Gender</label>
                    <input className='form-control floating' type='text' defaultValue={user?.gender == 1 ? "Male" : user?.gender == 2 ? "Female" : "Other"} disabled />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>


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

export default UserEditProfile