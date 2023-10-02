import { useBooks } from "@/hooks/useBooks"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useEffect, useState } from "react"
import PopupModal from "./Modal"
import AddBooksStock from "./admin/AddBookStock"
import { fetcher, post } from "@/lib/axios"

const BooksLibrary = ({ auth_type, auth }) => {
  const [searchTerm, setSearchTerm] = useState({
    search_term: "",
  })
  const { bookdata, bookLoading, bookError, bookMutate } = useBooks({
    params: searchTerm,
  })

  const [selectedBook, setSelectedBook] = useState(null);

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("Add Book Stock")
  const [modalData, setModalData] = useState()
  const [saveButtonState, setSaveButtonState] = useState(false)
  const [selectedBookInfo, setSelectedBookInfo] = useState(null)

  const handleShowModal = () => {
    setShowModal(true)
    setSaveButtonState(false)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setModalData(null)
    setSaveButtonState(false)
  }

  const handleOpenModal = () => {
    setModalTitle("Add Book Stock")
    handleShowModal();
  };

  const addBooksStockAction = async (rfidData) => {
    await post({
      postendpoint: "/books/add_book_stock",
      postData: {
        book_id: selectedBookInfo?.id,
        rfid: rfidData
      },
      config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    }).then((res) => {
      alert(res?.data?.message)
      handleCloseModal()
      bookMutate()
    }).catch(error => {
      alert(error?.response?.data?.message)
    })
  }

  const updateBookStock = async (book_id) => {
    await fetcher({ url: '/books/update_book_stock', params: { book_id: book_id } })
      .then(res => {
        alert("Updated Stock Fetched")
        bookMutate()
      })
      .catch(error => {
        alert(error?.response?.data?.message)
      })
  }

  useEffect(() => {
    if (selectedBookInfo)
      setModalData(
        <AddBooksStock
          key={1}
          book_id={selectedBookInfo?.id}
          bookName={selectedBookInfo?.name}
          edition={selectedBookInfo?.edition}
          author={selectedBookInfo?.author}
          publisher={selectedBookInfo?.publisher}
          stkQuantity={selectedBookInfo?.quantity}
          submitButtonAction={addBooksStockAction}
          saveButtonState={saveButtonState}
        />
      )
  }, [selectedBookInfo, saveButtonState])

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
          <div className="col-sm-6 col-md-4">
            <div className="form-group">
              <input
                name="search_term"
                onChange={searchTermChangeHandler}
                type="text"
                autoFocus={true}
                className="form-control text-center"
                placeholder="Enter Book Name, Author, Publisher, ISBN, Call Number"
              />
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <Link
              href={`/issueBook?id=${selectedBook}`}
              className={`btn btn-success btn-rounded ${!selectedBook ? 'disabled' : ''}`}
              style={{ float: "right" }}
            >
              <FontAwesomeIcon icon={faPlus} /> {auth_type == "admin" ? "Issue Book" : "Borrow Book"}
            </Link>
          </div>

          {auth_type == "admin" &&
            <div className="col-sm-6 col-md-3">
              <Link
                href={`/admin/addBooks`}
                className={`btn btn-primary btn-rounded`}
                style={{ float: "right" }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Books
              </Link>
            </div>
          }


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
                    <th>Edition</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Call Number</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Remaining Qty</th>
                    {auth_type == "admin" && <th className="text-center">Action</th>}
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
                          onDoubleClick={(e) => {
                            e.stopPropagation()
                            e.currentTarget.checked = false
                            setSelectedBook(null)
                          }}
                          onChange={handleRadioChange}
                          disabled={data?.remaining_qty <= 0}
                          type="radio" /></td>
                        <td>{ind + 1}</td>
                        <td>{data?.name}</td>
                        <td>{data?.edition}</td>
                        <td>{data?.author}</td>
                        <td>{data?.publisher}</td>
                        <td>{data?.isbn}</td>
                        <td>{data?.call_number}</td>
                        <td>{data?.description}</td>
                        <td>{data?.quantity}</td>
                        <td>{data?.remaining_qty}</td>
                        {
                          auth_type == "admin" &&
                          <td>
                            <button className="btn btn-success m-r-5" onClick={(e) => {
                              e.stopPropagation()
                              updateBookStock(data?.id)
                            }}>Update Stock</button>
                            <button className="btn btn-primary" onClick={(e) => {
                              e.stopPropagation()
                              setSelectedBookInfo({ ...data })
                              handleOpenModal()
                            }}>Add Books</button>
                          </td>
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
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
        modalSize='lg'
      />

    </div>
  )
}

export default BooksLibrary
