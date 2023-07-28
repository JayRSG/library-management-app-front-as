import { useAllUsers } from "@/hooks/useAllUsers"
import { faCircleLeft, faClockRotateLeft, faEllipsisVertical, faPencil, faTrash, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const Users = () => {
  const [queryParams, setQueryParams] = useState({
    account_type: "user"
  })
  const showUser = queryParams?.account_type == "user";
  const showAdmin = queryParams?.account_type == "admin";

  const { data: allUsers, isLoading, mutate } = useAllUsers({ params: queryParams?.submit ? queryParams : "" })

  const handleFilterChange = e => {
    setQueryParams({ ...queryParams, submit: false, [e.currentTarget.name]: e.currentTarget.value })
  }

  const deleteUser = (id) => {
    alert("User #" + id + " Deleted/Deactivated");
  }

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-4 col-3'>
              <h4 className='page-title'>{showUser ? "Users" : showAdmin && "Admins"}</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className="col-md-12">
                <button className="btn btn-primary mx-2" name="account_type" onClick={e => setQueryParams({ ...queryParams, account_type: showUser ? "admin" : showAdmin && "user" })}> {showUser ? "Show Admin" : showAdmin && "Show User"}</button>


                {showUser && <label className="" htmlFor="">Student ID: <input className="form-control" value={queryParams?.student_id} onChange={handleFilterChange} type="text" name="student_id" placeholder="student_id" /></label>}

                <label className="" htmlFor="">Email: <input className="form-control" onChange={handleFilterChange} type="text" value={queryParams?.email} name="email" placeholder="some@email.com" /></label>

                <label className="" htmlFor="">Phone: <input className="form-control" type="text" onChange={handleFilterChange} value={queryParams?.phone} name="phone" placeholder="+8801XXXXXXX" /></label>

                <button className="btn btn-success" onClick={e => {
                  e.stopPropagation()
                  setQueryParams({ ...queryParams, submit: true })
                }} type="submit">Search</button>

                <span className="" onClick={e => {
                  setQueryParams({ account_type: "user" })
                }}>
                  <FontAwesomeIcon icon={faClockRotateLeft} style={{ marginLeft: 10 }} />
                </span>

              </div>
              <div className='table-responsive'>
                <table className='table table-border table-striped custom-table datatable mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      {showUser && <th>Student_id</th>}
                      <th>Email</th>
                      {showUser && <th>Phone</th>}
                      {showUser && <th>Department</th>}
                      {showUser ? <th>Deleted</th> : showAdmin && <th>Active</th>}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers?.data?.map((user, ind) => (
                      <tr key={"user" + ind}>
                        <td>{ind + 1}</td>
                        <td>{user?.first_name + " " + user?.last_name}</td>
                        {showUser && <td>{user?.student_id}</td>}
                        <td>{user?.email}</td>
                        {showUser && <td>{user?.phone}</td>}
                        {showUser && <td>{user?.department}</td>}
                        {showUser ? <td>{user?.deleted ? "Yes" : "No"}</td> : showAdmin && <td>{user?.active ? "Yes" : "No"}</td>}
                        <td className='text-right'>
                          <div className='dropdown dropdown-action' style={{ position: "absolute" }}>
                            <a href='#' className='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                              <FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
                            </a>
                            <div className='dropdown-menu dropdown-menu-right'>
                              <button className='dropdown-item' onClick={(e) => {
                                confirm("Are you sure you want to " + (showAdmin ? "deactivate" : showUser && "delete")) && deleteUser(user?.id)
                              }}>
                                <FontAwesomeIcon icon={faPencil} style={{ marginRight: 10 }} /> {showUser ? "Delete" : showAdmin && "Deactivate"}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}


export default Users