import { useBorrows } from "@/hooks/useBorrows"
import { post } from "@/lib/axios"
import { faEllipsisVertical, faRecycle, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import PopupModal from "../Modal"
import ReturnBook from "../ReturnBook"

const UserBorrows = (props) => {
  const { auth } = props
  const [queryParams, setQueryParams] = useState({
    all: "",
    returned: 0,
    user_id: "",
    date_from: "",
    date_to: "",
  })

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("Modal Title")
  const [modalData, setModalData] = useState(false)
  const [saveButtonState, setSaveButtonState] = useState(false)

  const { borrowData, borrowLoading, borrowMutate } = useBorrows({ params: queryParams })
  const [fine, setFine] = useState([])
  const [bookReturnData, setBookReturnData] = useState({
    borrow_data: "",
  })


  const handleShowModal = () => {
    setShowModal(true)
    setSaveButtonState(false)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setSaveButtonState(false)
  }

  const handleOpenModal = () => {
    setModalTitle("Return Book")
    handleShowModal();
  };

  useEffect(() => {
    if (auth) {
      setQueryParams({ ...queryParams, user_id: auth?.id })
    }
  }, [auth])

  const handleFilterChange = (e) => {
    setQueryParams({
      ...queryParams,
      [e.currentTarget.name]: e.currentTarget.type == "checkbox" ? (e.currentTarget.checked ? 1 : 0) : e.currentTarget.value
    })
  }

  useEffect(() => {
    if (bookReturnData?.borrow_data) {
      setModalData(
        <ReturnBook
          bookBorrowData={bookReturnData?.borrow_data}
          saveButtonState={saveButtonState}
          handleCloseModal={handleCloseModal}
          borrowMutate={borrowMutate}
        />
      )

      handleOpenModal()
    }
  }, [bookReturnData, saveButtonState])


  const calcualteFine = async (ind, borrow_id) => {
    await post({
      postendpoint: "/books/calculate_fine", postData: { user_id: auth?.id, book_borrow_id: borrow_id }, config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      setFine(fine => {
        const new_arr = fine ? [...fine] : []
        new_arr[ind] = res?.data?.data?.fine_info?.fine

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
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <h4 className='page-title'>Book Issue History</h4>
            </div>
          </div>

          {/* <div className='row filter-row'>
          <div className='col-sm-6 col-md-3'>
            <div className='form-group'>
              <input type='text' autoFocus='' className='form-control' placeholder='search book name' />
            </div>
          </div>

          <div className='col-sm-6 col-md-3'>
            <a href='#' className='btn btn-success btn-block'>
              Search
            </a>
          </div>
        </div> */}

          <div className="row filter-row flex-d justify-content-center">
            <div className="col-sm-2 col-md-2">
              <label htmlFor="returned">
                <input
                  name="returned"
                  id="returned"
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  onChange={(e) => handleFilterChange(e)} />
                Returned
              </label>
            </div>
            <div className="col-sm-3 col-md-6">
              <label style={{ marginRight: "20px" }} htmlFor="returned">Date From
                <input
                  style={{ marginLeft: "10px" }}
                  name="date_from"
                  id="date_from"
                  type="date"
                  onChange={handleFilterChange} />
              </label>
              <label htmlFor="returned">Date To
                <input
                  style={{ marginLeft: "10px" }}
                  name="date_to"
                  id="date_to"
                  type="date"
                  onChange={handleFilterChange} />
              </label>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-md-12'>
              <div className='table-responsive'>
                {borrowData?.data?.length > 0 ?
                  <table className='table table-striped custom-table mb-0 datatable'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Book-Name</th>
                        <th>Borrow Date</th>
                        <th>Due Date</th>
                        <th>return Date</th>
                        <th>Fine Payment Date</th>
                        <th>Late Fine</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        borrowData?.data?.map((data, ind) => (
                          <tr key={"borrow_data" + ind}>
                            <td>{ind + 1}</td>
                            <td>{data?.name}</td>
                            <td>{data?.borrow_time}</td>
                            <td>{data?.due_time ?? 'N/A'}</td>
                            <td>{data?.return_time ?? "N/A"}</td>
                            <td>{data?.fine_payment_date ?? 'N/A'}</td>
                            <td title={"Late fine"}>
                              {
                                data?.late_fine ? (data?.late_fine) :
                                  fine[ind] ??
                                  (<button className="btn btn-primary" onClick={(e) => {
                                    e.stopPropagation()
                                    calcualteFine(ind, data?.id)
                                  }}>Calculate Fine</button>)
                              }
                            </td>
                            <td>{data?.returned == "1" ? "Returned" : data?.returned == "0" && "Pending"}</td>
                            <td>
                              <div className='dropdown dropdown-action' style={{ position: "absolute" }}>
                                <a href='#' className='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                                  <FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
                                </a>
                                <div className='dropdown-menu dropdown-menu-right'>
                                  <span className='dropdown-item' style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setBookReturnData({ borrow_data: data })
                                    }}>
                                    <FontAwesomeIcon icon={faRecycle} style={{ marginRight: 10 }} /> Return
                                  </span>

                                  <span className='dropdown-item' style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      borrowMutate()
                                      calcualteFine(ind, data?.id)
                                    }}>
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 10 }} /> Refresh
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  : <div className="d-flex justify-content-center"><div className="text-center">No Data Found</div></div>
                }
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

export default UserBorrows