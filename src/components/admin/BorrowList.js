import { useBorrows } from "@/hooks/useBorrows"
import { post } from "@/lib/axios"
import { faEllipsisVertical, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const BorrowList = (props) => {
  const [queryParams, setQueryParams] = useState({
    id: "",
    all: true,
    returned: 1,
    book_id: "",
    user_id: "",
    date_from: "",
    date_to: "",
    submit: false
  })

  const { borrowData, borrowLoading, borrowMutate } = useBorrows({ params: queryParams?.submit && queryParams })
  const [fine, setFine] = useState([])

  const handleInputChange = e => {
    setQueryParams({
      ...queryParams,
      submit: false,
      all: (e.currentTarget.name != "all" && e.currentTarget.name != "returned") ? 0 : 1,
      [e.currentTarget.name]: e.currentTarget.type == "checkbox" ? (e.currentTarget.checked ? 1 : 0) : e.currentTarget.value
    })
    setFine([])
  }

  const submitForm = async (e) => {
    borrowMutate()
  }

  const calcualteFine = async (ind, borrow_id, user_id) => {
    await post({
      postendpoint: "/books/calculate_fine", postData: { user_id: user_id, book_borrow_id: borrow_id }, config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      setFine(fine => {
        const new_arr = fine ? [...fine] : []
        new_arr[ind] = res?.data?.data?.fine_info?.fine ?? "N/A"

        return new_arr
      })
    }).catch(error => {
      setFine(fine => {
        const new_arr = fine ? [...fine] : []
        new_arr[ind] = null

        return new_arr
      })
    })
  }


  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          {/* Filters */}

          <div className="col-md-12 input-group" style={{ marginBottom: "10px" }}>
            <label htmlFor="all" style={{ paddingTop: "20px" }}><input className="form-check-input" id="all" name="all" checked={queryParams?.all} onClick={e => { e.stopPropagation() }} onChange={e => handleInputChange(e)} type="checkbox" /> All</label>

            <label htmlFor="returned" style={{ paddingTop: "20px", marginLeft: "10px" }}><input className="form-check-input" id="returned" name="returned" checked={queryParams?.returned} onClick={e => { e.stopPropagation() }} onChange={e => handleInputChange(e)} type="checkbox" /> Returned</label>

            <span style={{ margin: "0px 10px" }} className="vr"></span>

            <label style={{ marginLeft: "10px" }}>ID: <input type="number" className="form-control" id="id" name="id" value={queryParams?.id} onChange={e => handleInputChange(e)} /></label>

            <label style={{ marginLeft: "10px" }}>Book: <input type="number" className="form-control" id="book_id" name="book_id" value={queryParams?.book_id} onChange={e => handleInputChange(e)} /></label>


            <label style={{ marginLeft: "10px" }}>User: <input type="number" className="form-control" id="user_id" name="user_id" value={queryParams?.user_id} onChange={e => handleInputChange(e)} /></label>

            <span>
              <label style={{ marginLeft: "10px" }}>Date From: <input type="date" className="form-control" id="date_from" name="date_from" value={queryParams?.date_from} onChange={e => handleInputChange(e)} /></label>

              <label style={{ marginLeft: "10px" }}>Date To: <input type="date" className="form-control" id="date_to" name="date_to" value={queryParams?.date_to} onChange={e => handleInputChange(e)} /></label>

              <button className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={e => {
                e.stopPropagation()
                setQueryParams({ ...queryParams, submit: true })
                submitForm(e)
              }}>Search</button>

              <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={e => {
                e.stopPropagation()
                setFine([])
                setQueryParams({
                  id: "",
                  all: true,
                  returned: 1,
                  book_id: "",
                  user_id: "",
                  date_from: "",
                  date_to: "",
                  submit: false
                })
              }}>Clear </button>
            </span>

          </div>

          <div className='table-responsive'>
            <table className='table table-border table-striped custom-table datatable mb-0'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Book Name</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Issued By</th>
                  <th>Issuer Type</th>
                  <th>Return Date</th>
                  <th>Returned By</th>
                  <th>Type</th>
                  <th>Late Fine</th>
                  <th>Fine Payment Date</th>
                  <th>Returned</th>
                  <th className='text-right'>Action</th>
                </tr>
              </thead>

              <tbody>
                {borrowData?.data?.map((data, ind) => (
                  <tr key={"borrow" + ind}>
                    <td>{ind + 1}</td>
                    <td>{data?.first_name + " " + data?.last_name}</td>
                    <td>{data?.name}</td>
                    <td>{data?.borrow_time}</td>
                    <td>{data?.due_time}</td>
                    <td>{data?.issue_user_type == "admin" ?
                      data?.issuer_admin_first_name + " " + data?.issuer_admin_last_name : data?.issue_user_type == "user" && data?.issuer_user_first_name + " " + data?.issuer_user_last_name}</td>
                    <td>{data?.issue_user_type}</td>
                    <td>{data?.return_time}</td>
                    <td>{data?.return_user_type == "admin" ?
                      data?.return_admin_first_name + " " + data?.return_admin_last_name :
                      data?.return_user_type == "user" && data?.return_user_first_name + " " + data?.return_user_last_name}</td>
                    <td>{data?.return_user_type}</td>
                    <td>{fine[ind] ?? (<button className="btn btn-primary" onClick={(e) => {
                      e.stopPropagation()
                      calcualteFine(ind, data?.id, data?.user_id)
                    }}>Calculate Fine</button>)}</td>
                    <td>{data?.fine_payment_date ?? "N/A"}</td>
                    <td>{data?.returned == 1 ? "Returned" : "Not Returned"}</td>
                    <td className='text-right'> {/* Action */}
                      <div className='dropdown dropdown-action' style={{ position: "absolute" }}>
                        <a href='#' className='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                          <FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
                        </a>
                        <div className='dropdown-menu dropdown-menu-right'>
                          <a className='dropdown-item' href='#'>
                            <FontAwesomeIcon icon={faPencil} style={{ marginRight: 10 }} /> Edit
                          </a>
                          <a className='dropdown-item' href='#' data-bs-toggle='modal' data-target='#delete_patient'>
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: 10 }} /> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default BorrowList