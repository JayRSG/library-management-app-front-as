import { useBooks } from "@/hooks/useBooks"
import { faDashcube } from "@fortawesome/free-brands-svg-icons"
import { faAdd, faEllipsisVertical, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

const BooksLibrary = ({ auth_type, auth }) => {
  const [searchTerm, setSearchTerm] = useState({
    search_term: "",
  })
  const { bookdata, bookLoading, bookError, bookMutate } = useBooks({
    params: searchTerm,
  })

  const [selectedBook, setSelectedBook] = useState(null);
  const [issueList, setIssueList] = useState([])

  const handleRadioChange = (e) => {
    setSelectedBook(e.target.value);
  }


  const searchTermChangeHandler = (e) => {
    e.preventDefault()
    if (e.currentTarget.value.length >= 2) {
      setSearchTerm({
        ...searchTerm,
        [e.currentTarget.name]: e.currentTarget.value,
      })
    }
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="page-title">Books</h4>
          </div>
        </div>
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group">
              <input
                name="search_term"
                onChange={searchTermChangeHandler}
                type="text"
                autoFocus=""
                className="form-control"
                placeholder="Enter Book Name, Author, Publisher, ISBN"
              />
            </div>
          </div>

          {/* <div className="col-sm-1 col-md-1">
            <button
              name="searchSubmit"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="btn btn-success btn-block"
            >
              Search
            </button>
          </div> */}

          {/* {auth_type == "admin" &&
            (<div className="col-sm-6 col-md-3">
              <Link
                href="/user/addBooks"
                className="btn btn-primary btn-rounded"
                style={{ float: "right" }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Books
              </Link>
            </div>)
          } */}


          <div className="col-sm-6 col-md-3">
            <Link
              href={`/issueBook?id=${selectedBook}`}
              className="btn btn-success btn-rounded"
              style={{ float: "right" }}
            >
              <FontAwesomeIcon icon={faPlus} /> Issue Book
            </Link>
          </div>

        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped custom-table mb-0 datatable">
                <thead>
                  <tr>
                    <th></th>
                    <th>#</th>
                    <th>Book-Name</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Remaining Qty</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    bookdata?.data?.map((data, ind) =>
                    (
                      <tr key={"book " + ind}>
                        <td><input
                          className="radio"
                          value={data?.id}
                          name="selectedBook"
                          checked={selectedBook == data?.id}
                          onChange={handleRadioChange}
                          disabled={data?.remaining_qty <= 0}
                          type="radio" /></td>
                        <td>{ind + 1}</td>
                        <td>{data?.name}</td>
                        <td>{data?.author}</td>
                        <td>{data?.publisher}</td>
                        <td>{data?.isbn}</td>
                        <td>{data?.description}</td>
                        <td>{data?.quantity}</td>
                        <td>{data?.remaining_qty}</td>
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
  )
}

export default BooksLibrary
