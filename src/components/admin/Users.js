import { useAllUsers } from "@/hooks/useAllUsers"
import { faClockRotateLeft, faEllipsisVertical, faFingerprint, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useRouter } from "next/router"
import PopupModal from "../Modal"
import EditFingerPrint from "./EditFingerprint"
import { useEffect } from "react"
import { post } from "@/lib/axios"

const Users = () => {
  const router = useRouter()
  const [queryParams, setQueryParams] = useState({
    account_type: "user",
    submit: false
  })
  const showUser = queryParams?.account_type == "user";
  const showAdmin = queryParams?.account_type == "admin";

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("Add Book Stock")
  const [modalData, setModalData] = useState()
  const [saveButtonState, setSaveButtonState] = useState(false)
  const [userForFinger, setUserForFinger] = useState(null)

  const handleShowModal = () => {
    setShowModal(true)
    setSaveButtonState(false)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalData(null)
    setSaveButtonState(false)
    setUserForFinger(null)
  }

  const handleOpenModal = () => {
    setModalTitle("Fingerprint Management")
    handleShowModal();
  };

  const { data: allUsers, isLoading, mutate } = useAllUsers({ params: queryParams?.submit ? queryParams : "" })

  function handleFilterChange(e) {
    setQueryParams({ ...queryParams, submit: false, [e.currentTarget.name]: e.currentTarget.value })
    // setShowRegister(true)
  }

  function deleteUser(id) {
    alert("User #" + id + " Deleted/Deactivated");
  }

  async function saveFingerPrintAction(user_id, fingerprint_id) {
    await post({
      postendpoint: "user/update_fingerprint",
      postData: { user_id: user_id, fingerprint_id: fingerprint_id, account_type: queryParams?.account_type },
      config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      alert(res?.data?.message)
      mutate()
      handleCloseModal()
    }).catch(error => {
      alert(error?.response?.data?.message)
    })
  }

  useEffect(() => {
    if (userForFinger) {
      setModalData(
        <EditFingerPrint
          userData={userForFinger}
          userType={queryParams?.account_type}
          submitButtonAction={saveFingerPrintAction}
          saveButtonState={saveButtonState}
          handleCloseModal={handleCloseModal}
        />
      )

      handleOpenModal()
    }
  }, [userForFinger, saveButtonState])

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-4 col-md-6'>
              <h4 className='page-title'>{showUser ? "Users" : showAdmin && "Admins"}</h4>
            </div>
            <div className='col-sm-8 col-md-6 text-right m-b-20'>
              <button className='btn btn btn-primary btn-rounded' style={{ float: "right" }} onClick={(e) => {
                e.stopPropagation()
                router.push("/user/register")
              }}>
                <FontAwesomeIcon icon={faPlus} /> Add User
              </button>
              <button className='btn btn btn-primary btn-rounded' style={{ float: "right", }} onClick={(e) => {
                e.stopPropagation()
                router.push("/admin/register")
              }}>
                <FontAwesomeIcon icon={faPlus} /> Add Admin
              </button>
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
                      {showUser && <th>User Type</th>}
                      {showUser ? <th>Deleted</th> : showAdmin && <th>Active</th>}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers?.data?.map((user, ind) => (
                      <tr key={"user" + ind}>
                        <td>{ind + 1}</td>
                        <td>{user?.first_name + " " + user?.last_name}</td>
                        {showUser && <td>{user?.student_id ?? "N/A"}</td>}
                        <td>{user?.email}</td>
                        {showUser && <td>{user?.phone}</td>}
                        {showUser && <td>{user?.user_type}</td>}
                        {showUser ? <td>{user?.deleted ? "Yes" : "No"}</td> : showAdmin && <td>{user?.active ? "Yes" : "No"}</td>}
                        <td className='text-right'>
                          <div className='dropdown dropdown-action' style={{ position: "absolute" }}>
                            <a href='#' className='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                              <FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
                            </a>
                            <div className='dropdown-menu dropdown-menu-right'>
                              <button className='dropdown-item' onClick={(e) => {
                                setUserForFinger(user)
                                // handleOpenModal()
                              }}>
                                <FontAwesomeIcon icon={faFingerprint} style={{ marginRight: 10 }} /> Fingerprint
                              </button>
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
      </div>

      <PopupModal
        title={modalTitle}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        data={modalData}
        saveButtonAction={setSaveButtonState}
      />
    </>
  )
}


export default Users