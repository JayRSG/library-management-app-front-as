import { returnBookAction, updateBookStock, useBookRFID } from "@/hooks/useBooks"
import { useDeviceData } from "@/hooks/useDeviceWS"
import { faCheck, faCreditCard, faFingerprint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const ReturnBook = (props) => {
  const { bookBorrowData, saveButtonState, handleCloseModal, borrowMutate } = props
  const [queryParams, setQueryParams] = useState({
    account_type: "",
    id: ""
  })

  const { deviceData, isScanning, socket, communicateDevice } = useDeviceData()
  const [fingerprint, setFingerprint] = useState(null)
  const [rfid, setRfid] = useState(null)
  const [showMessage, setShowMessage] = useState("")

  const { data: rfidBookId, isLoading: rfidBookIdLoading, mutate: mutateRfidBookId } = useBookRFID({ params: rfid ? { rfid: rfid } : {} })

  useEffect(() => {
    if (deviceData) {
      let data = null
      if (typeof deviceData == "string") {
        data = JSON.parse(deviceData)
      } else {
        data = deviceData
      }
      setShowMessage(data)

      if (data?.message == "Fingerprint Matched") {
        setFingerprint(data?.id)
      }
      else if (data?.message == "Card Read") {
        setRfid(data?.id)
      }
    }
  }, [deviceData])

  useEffect(() => {
    if (rfidBookId) {
      if (rfidBookId?.data?.id != bookBorrowData?.rfid_rel_id) {
        setShowMessage({ ...showMessage, action: "rfid", message: "Book Mismatch" })
      } else {
        setShowMessage("")
      }
    }
  }, [rfidBookId?.data?.id, bookBorrowData?.rfid_rel_id])

  useEffect(() => {
    if (rfidBookId && fingerprint && bookBorrowData && saveButtonState) {
      returnBookAction({
        book_id: rfidBookId?.data?.book_id,
        rfid_rel_id: rfidBookId?.data?.id,
        user_id: bookBorrowData?.user_id,
        id: bookBorrowData?.id
      }, borrowMutate).then(async (res) => {
        alert(res?.data?.message)
        handleCloseModal()
        await updateBookStock(rfidBookId?.data?.book_id)
      }).catch((error) => {
        alert(error?.response?.data?.message)
      })
    }
  }, [rfidBookId, fingerprint, saveButtonState])

  return (
    <>

      <div className="container">
        <div className="row">
          <div>{rfidBookId?.data?.id == bookBorrowData?.rfid_rel_id && <FontAwesomeIcon className="text-success" icon={faCheck} />} Book Name: {bookBorrowData?.name}</div>
          <div>{rfidBookId?.data?.id == bookBorrowData?.rfid_rel_id && <FontAwesomeIcon className="text-success" icon={faCheck} />} Edition: {bookBorrowData?.edition}</div>
          <div>{rfidBookId?.data?.id == bookBorrowData?.rfid_rel_id && <FontAwesomeIcon className="text-success" icon={faCheck} />} Author: {bookBorrowData?.author}</div>
          <div>{rfidBookId?.data?.id == bookBorrowData?.rfid_rel_id && <FontAwesomeIcon className="text-success" icon={faCheck} />} Publisher: {bookBorrowData?.publisher}</div>
          <div>{fingerprint && <FontAwesomeIcon className="text-success" icon={faCheck} />} Borrower: {bookBorrowData?.first_name + " " + bookBorrowData?.last_name}</div>
        </div>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <div className="row col-12">
          {showMessage?.action == "search" &&
            <div className="d-flex justify-content-center" style={{ fontSize: "28px" }}><FontAwesomeIcon icon={faFingerprint} size="xl" /></div>}
          {showMessage?.action == "read" &&
            <div className="d-flex justify-content-center" style={{ fontSize: "28px" }}><FontAwesomeIcon icon={faCreditCard} size="xl" /></div>}

          <div className=" my-3 text-center col-md-12">{showMessage && showMessage?.action + ": " + showMessage?.message}</div>
        </div>

        <button
          className={`bg-info rounded form-control ${showMessage?.message == "Card Read" && 'text-success'}`}
          onClick={(e) => {
            e.stopPropagation()
            communicateDevice({ command: "read" })
          }}>Scan Book</button>

        <button
          className={`bg-info rounded form-control ${showMessage?.message == "Fingerprint Matched" && 'text-success'}`}
          onClick={e => {
            e.stopPropagation()
            communicateDevice({ command: "verify", id: bookBorrowData?.fingerprint_id })
          }}>Scan Fingerprint</button>
      </form>
    </>
  )
}

export default ReturnBook