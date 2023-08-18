import { useUser } from "@/hooks/useUser"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const UserProfileComponent = () => {
  const { data: user, isLoading: userLoading, mutate: userMutate } = useUser({ middleware: "auth" })

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-7 col-6'>
            <h4 className='page-title'>My Profile</h4>
          </div>

          <div className='col-sm-5 col-6 text-right m-b-30'>
            <Link href='/user/userEditProfile' className='btn btn-primary btn-rounded'>
              <FontAwesomeIcon icon={faPlus} /> Edit Profile
            </Link>
          </div>
        </div>

        <div className='card-box profile-header'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile-view'>
                <div className='profile-basic'>
                  <div className='row'>
                    <div className='col-md-5'>
                      <div className='profile-info-left'>
                        <h3 className='user-name m-t-0 mb-0'>{user?.data?.first_name + " " + user?.data?.last_name}</h3>
                        <small className='text-muted'>{user?.data?.student_info?.department}</small>
                        {
                          user?.data?.user_type == "Student" &&

                          (<>
                            <div className='staff-id'>Student ID : {user?.data?.student_id}</div>
                            <div className='staff-id'>Admission Year : {user?.data?.student_info?.admission_semester +  " " + user?.data?.student_info?.admission_year}</div>
                          </>
                          )

                        }
                      </div>
                    </div>

                    <div className='col-md-7'>
                      <ul className='personal-info'>
                        <li>
                          <span className='title'>Phone:</span>
                          <span className='text'>
                            <a href='#'>{`${user?.data?.phone}`}</a>
                          </span>
                        </li>

                        <li>
                          <span className='title'>Email:</span>
                          <span className='text'>
                            <a href='#'>{`${user?.data?.email}`}</a>
                          </span>
                        </li>

                        {/* <li>
                            <span className='title'>Birthday:</span>
                            <span className='text'>1st January</span>
                          </li> */}

                        {/* <li>
                            <span className='title'>Address:</span>
                            <span className='text'>Lalkhan Bazar, Bangladesh</span>
                          </li> */}

                        {/* <li>
                            <span className='title'>Gender:</span>
                            <span className='text'>Male</span>
                          </li> */}
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
export default UserProfileComponent