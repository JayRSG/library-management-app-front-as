import { post } from "@/lib/axios"
import { useState } from "react"

const AddBooks = () => {
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    publisher: "",
    isbn: "",
    description: "",
    submit: false
  })

  const handleInputChange = (e) => {
    setBookData({
      ...bookData,
      submit: false,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const resetForm = () => {
    setBookData({
      author: "",
      description: "",
      edition: "",
      call_number: "",
      isbn: "",
      name: "",
      publisher: "",
      submit: false
    })
  }

  const submitBookData = async (e) => {
    e.preventDefault()
    if (bookData?.submit) {
      await post({
        postendpoint: "/books/add", postData: bookData, config: {
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        }
      }).then((res) => {
        alert(res?.data?.message)
        resetForm()
      }).catch((error) => {
        alert(error?.response?.data?.message)
      })
    }
  }

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <h4 className='page-title'>Add Book</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <form onSubmit={submitBookData}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Book Name</label>
                      <input className='form-control' type='text' name="name" value={bookData?.name} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Edition</label>
                      <input className='form-control' type='text' name="edition" value={bookData?.edition} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label>Author(s)</label>
                      <input className='form-control' type='text' name="author" value={bookData?.author} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Publisher</label>
                      <input className='form-control' type='text' name="publisher" value={bookData?.publisher} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Call Number</label>
                      <input className='form-control' type='text' name="call_number" value={bookData?.call_number} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>ISBN</label>
                      <input className='form-control' type='text' name="isbn" value={bookData?.isbn} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Description</label>
                      <input className='form-control' type='text' name="description" value={bookData?.description} required onChange={handleInputChange} />
                    </div>
                  </div>
                  {/* <div className="col-md-6 col-sm-6"></div> */}
                  <div className="row d-flex justify-content-center">
                    {/* <div className="col-sm-3 d-flex col-md-2 justify-content-center">
                      <button name="" className="btn btn-success btn-block">
                        Scan Book
                      </button>
                    </div> */}

                    <div className="col-sm-2 col-md-2 d-flex justify-content-center">
                      <button name="" className="btn btn-danger btn-block" onClick={(e) => {
                        e.preventDefault()
                        resetForm()
                      }}>
                        Clear
                      </button>
                    </div>
                  </div>

                </div>

                <div className='m-t-20 text-center'>
                  <button onClick={(e) => {
                    e.stopPropagation()
                    setBookData({
                      ...bookData,
                      submit: true
                    })
                  }} className='btn btn-primary submit-btn'>Add Book</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBooks