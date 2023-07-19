import { useBorrows } from "@/hooks/useBorrows"
import { post } from "@/lib/axios"
import { useEffect, useState } from "react"

const UserBorrows = (props) => {
  const { auth } = props
  const [queryParams, setQueryParams] = useState({
    all: "",
    returned: 0,
    user_id: "",
    date_from: "",
    date_to: "",
  })

  const { borrowData, borrowLoading } = useBorrows({ params: queryParams })
  const [fine, setFine] = useState(null)

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

  const calcualteFine = async (borrow_id) => {
    await post({
      postendpoint: "/books/calculate_fine", postData: { user_id: auth?.id, book_borrow_id: borrow_id }, config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      console.log(res?.data)
      setFine(res?.data?.data?.fine_info?.fine)
    }).catch(error => {
      setFine(false)
    })
  }

  return (
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
                name="date_from"
                id="date_from"
                type="date"
                onChange={handleFilterChange} />
            </label>
            <label htmlFor="returned">Date To
              <input
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
                      <th>return Date</th>
                      <th>Late Fine</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      borrowData?.data?.map((data, ind) => (
                        <tr key={"borrow_data" + ind}>
                          <td>{ind + 1}</td>
                          <td>{data?.name}</td>
                          <td>{data?.borrow_time}</td>
                          <td>{data?.return_time ?? "N/A"}</td>
                          <td>{data?.late_fine ? data?.late_fine : (fine == undefined) ? <button className="btn btn-primary" onClick={(e) => {
                            e.stopPropagation()
                            calcualteFine(data?.id)
                          }}>Calculate Fine</button> : fine}</td>
                          <td>{data?.returned ? "Returned" : "Pending"}</td>
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
  )
}

export default UserBorrows