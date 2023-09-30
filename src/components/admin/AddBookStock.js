import { useDeviceData } from '@/hooks/useDeviceWS';
import { post } from '@/lib/axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const AddBooksStock = (bookInfo) => {

  const { book_id, bookName, edition, author, publisher, stkQuantity, submitButtonAction, saveButtonState } = bookInfo

  const { deviceData, isScanning, communicateDevice } = useDeviceData()

  const [existingRfid, setExistingRfid] = useState([]);
  const [rfidNumbers, setRfidNumbers] = useState([]);
  const [rfidInput, setRfidInput] = useState('');

  useEffect(() => {
    post({
      postendpoint: "/books/get_book_rfids",
      postData: { book_id: book_id },
      config: {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }
    })
      .then((res) => {
        setExistingRfid([...res?.data?.data?.map((data) => {
          if (!existingRfid.includes(data?.rfid)) {
            return data?.rfid
          }
        })])
      })
      .catch(error => {
        throw error
      })
  }, [book_id])

  useEffect(() => {
    if (deviceData) {
      setRfidInput(deviceData?.rfid)
    }
  }, [deviceData])

  useEffect(() => {
    if (rfidInput.trim() !== '') {
      if (!rfidNumbers.includes(rfidInput)) {
        setRfidNumbers([...rfidNumbers, rfidInput]);
      }
      setRfidInput('');
    }
  }, [rfidInput])

  const handleRemove = (index) => {
    const updatedRfidNumbers = [...rfidNumbers];
    updatedRfidNumbers.splice(index, 1);
    setRfidNumbers(updatedRfidNumbers);
  };

  useEffect(() => {
    if (saveButtonState && rfidNumbers.length > 0) {
      submitButtonAction(rfidNumbers)
    }
    else if (saveButtonState && rfidNumbers.length <= 0) {
      alert("Empty RFID List, Add some books");
    }

  }, [saveButtonState])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={e => {
            e.preventDefault()
          }}>
            <div className="mb-3">
              <label htmlFor="bookName" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="bookName"
                name="bookName"
                defaultValue={bookName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edition" className="form-label">
                Edition
              </label>
              <input
                type="text"
                className="form-control"
                id="edition"
                name="edition"
                defaultValue={edition}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                defaultValue={author}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                name="publisher"
                defaultValue={publisher}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stkQuantity" className="form-label">
                Stk Quantity
              </label>
              <input
                type="text"
                className="form-control"
                id="stkQuantity"
                name="stkQuantity"
                defaultValue={stkQuantity}
                disabled
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  communicateDevice("register")
                }}
              >
                Scan Book
              </button>
              <span className='m-l-40 text-danger'>{isScanning ? "Scan Now" : ""}</span>
            </div>
          </form>

        </div>
        {/* Result Table */}
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>RFID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className='text-center bg-secondary'>Existing Keys</td>
              </tr>
              {existingRfid.map((rfid, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rfid}</td>
                  <td>N/A</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className='text-center bg-primary'>New Keys</td>
              </tr>
              {rfidNumbers.map((rfid, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rfid}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(index)
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddBooksStock;
