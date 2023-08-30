import { useAdmin } from "@/hooks/useAdmin"

const AdminDashboard = () => {
  const { data: admin, isLoading: adminLoading, error: adminError } = useAdmin({ middleware: "auth" })

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div>
          <h1 style={{ textAlign: "center" }}>Admin, Welcome to your panel</h1>
        </div>


        <div className='card-box profile-header'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile-view'>
                <div className='profile-basic'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='profile-info-left'>
                        <h3 className='user-name m-t-0 mb-0'>{admin?.data?.first_name + " " + admin?.data?.last_name}</h3>
                        <small className='text-muted'>Library Admin</small>
                      </div>
                    </div>

                    <div className='col-md-7'>
                      <ul className='personal-info'>
                        <li>
                          <span className='title'>Email:</span>
                          <span className='text'>
                            <a href='#'>{`${admin?.data?.email}`}</a>
                            <span style={{fontSize: "12px", textDecoration: "none"}} className="m-l-40"> <span className="m-l-5 m-r-5">|</span> <a href="/admin/adminEditProfile">Edit Profile</a></span>
                          </span>
                          
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard