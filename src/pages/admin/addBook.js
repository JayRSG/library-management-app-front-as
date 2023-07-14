import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import React from "react"

const addBook = () => {
  return (
    <>
      <Header />

      <AdminNav />

      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <h4 className='page-title'>Add Book</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <form>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Book ID</label>
                      <input className='form-control' type='text' value='001' readonly='' />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Book Name</label>
                      <input className='form-control' type='text' value='Aj Himur Biye' />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Author Name</label>
                      <input className='form-control' type='text' value='Mohammad Humayan Ahmed' />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>ISBN</label>
                      <input className='form-control' type='text' value='' />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Publisher</label>
                      <input className='form-control' type='text' value='Penguin Random House' />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Quantity</label>
                      <input className='form-control' type='text' value='2' />
                    </div>
                  </div>
                </div>

                <div className='form-group'>
                  <label>Description</label>
                  <textarea cols='30' rows='4' className='form-control' value='this is a good book'></textarea>
                </div>

                <div className='m-t-20 text-center'>
                  <button className='btn btn-primary submit-btn'>Add Book</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default addBook
