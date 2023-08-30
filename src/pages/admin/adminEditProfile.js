import Header from "@/components/Header"
import AdminEditProfile from "@/components/admin/AdminEditProfile"
import AdminNav from "@/components/admin/AdminNav"

const adminEditProfile = () => {

  return (
    <>
      <Header />

      <AdminNav />
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <h4 className='page-title'>Edit Profile</h4>
            </div>
          </div>

          <AdminEditProfile />

        </div>
      </div>
    </>
  )
}

export default adminEditProfile