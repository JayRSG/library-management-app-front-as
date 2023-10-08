import { useAllUsers } from "@/hooks/useAllUsers"
import { useBookRFID, useBooks } from "@/hooks/useBooks"
import { useDeviceData } from "@/hooks/useDeviceWS"
import { fetcher, post } from "@/lib/axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const IssueBook = (props) => {
  const router = useRouter()
  const { id } = router.query
  const { auth, auth_type } = props
  const [queryParams, setQueryParams] = useState({
    account_type: "",
    id: "",
    submit: false
  })

  const [formData, setFormData] = useState({
    user_id: "",
    rfid: ""
  })

  const { deviceData: fingerPrintData, isScanning: fingerPrintScanning, socket: fingerSocket, communicateDevice: scanFingerPrint } = useDeviceData()
  const { deviceData: rfidData, isScanning: rfidScanning, socket: rfidSocket, communicateDevice: scanRfid } = useDeviceData()

  const [showMessage, setShowMessage] = useState("")

  // Scan target Data
  const [foundFingerprint, setFoundFingerprint] = useState(null)
  const [rfidCard, setRfidCard] = useState(null)
  const [disableSubmitState, setDisableSubmitState] = useState(true)

  // Fetches user data based on fingerprint
  const { data: borrowerData, isLoading, mutate } = useAllUsers({ params: foundFingerprint && queryParams?.id && queryParams?.account_type != "admin" ? queryParams : "" })

  // Fetches book id based on scanned book
  const { data: rfidBookId, isLoading: loadingRfidBookId, mutate: mutateRfidBookId } = useBookRFID({ params: rfidCard ? { rfid: rfidCard } : {} })
  const { bookdata, bookLoading } = useBooks({ params: { id: rfidBookId && rfidBookId?.data?.book_id == id ? rfidBookId?.data?.book_id : id ? id : "" } })

  useEffect(() => {
    if (rfidData) {
      let data = null
      if (typeof rfidData == "string") {
        data = JSON.parse(rfidData)
      } else {
        data = rfidData
      }
      setShowMessage(data)

      if (data?.message == "Card Read") {
        setRfidCard(data?.id)

        var t = setTimeout(() => {
          setShowMessage({ ...showMessage, message: "" })
        }, 5000);
      }
    }

    return () => {
      clearTimeout(t)
    }
  }, [rfidData])

  // extract fingerprint data from the received json string and set the display message
  useEffect(() => {
    if (fingerPrintData) {
      let data = null
      if (typeof fingerPrintData == "string") {
        data = JSON.parse(fingerPrintData)
      } else {
        data = fingerPrintData
      }


      setShowMessage(data)

      if (data?.message == "Fingerprint Matched" && data?.id) {
        setFoundFingerprint(data?.id)
      }
    }
  }, [fingerPrintData])

  useEffect(() => {
    if (!id) {
      router.push("/booksLibrary")
    } else if (rfidBookId?.data?.book_id != id && borrowerData?.data[0]?.fingerprint_id == foundFingerprint) {
      if (rfidData && showMessage?.message == "Card Read") {
        setShowMessage({ ...showMessage, message: "Book mismatch" })
      }
      setDisableSubmitState(true)
      console.log("setting disabled true")

    } else if ((rfidBookId?.data?.book_id == id && auth_type == "user" )||(auth_type == "admin" && rfidBookId?.data?.book_id == id && foundFingerprint && borrowerData?.data[0]?.fingerprint_id == foundFingerprint)) {
      setDisableSubmitState(false)
      console.log("setting disabled false")
    }
  }, [rfidData, rfidBookId?.data?.book_id, foundFingerprint, id])

  // prints name of scanned borrower
  const showName = () => {
    if (auth_type == "admin" && fingerPrintData && borrowerData?.data[0]) {
      return (
        borrowerData?.data[0]?.first_name + " " + borrowerData?.data[0]?.last_name
      )
    } else if (auth_type == "user") {
      return (
        auth?.first_name + " " + auth?.last_name
      )
    } else if (queryParams?.account_type == "admin") {
      return "[Scan users only]"
    }

    return "Scan Fingerprint"
  }

  // show semester, id, dept of scanned borrower
  const showBorrowerIdSemDept = () => {
    if (auth_type == "admin" && fingerPrintData && borrowerData?.data[0]) {
      return (
        <>
          {borrowerData?.data[0]?.student_id}; {borrowerData?.data[0]?.student_info?.admission_semester};<br />
          {borrowerData?.data[0]?.student_info?.department}
        </>
      )
    } else if (auth_type == "user") {
      return (
        <>
          {auth?.student_id}; {auth?.student_info?.admission_semester}; <br />
          {auth?.student_info?.department}
        </>
      )
    }
    else if (queryParams?.account_type == "admin") {
      return "[Scan users only]"
    }

    return "Scan Fingerprint"
  }

  // Search for fingerprint data for any user
  async function searchFingerprint() {
    if (foundFingerprint) {
      return await fetcher({
        url: "user/fingerprint_manage",
        params: {
          operation: "search",
          fingerprint_id: foundFingerprint
        }
      })
    }
  }

  // get the fingerprint information per user and set query to fetch user information
  useEffect(() => {
    if (foundFingerprint) {
      searchFingerprint()
        .then(res => {
          setQueryParams({ ...res?.data, submit: true })
        })
        .catch(error => { alert(error?.response?.data?.message) })

    }
  }, [foundFingerprint])

  const disableSubmit = () => {
    if (auth_type == "user" && !disableSubmitState) {
      return false
    }
    else if (auth_type == "admin" && !disableSubmitState && foundFingerprint) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (auth_type == "user" && rfidCard) {
      setFormData({ ...formData, user_id: auth?.id, rfid: rfidCard })
    } else if (auth_type == "admin" && rfidCard) {
      if (borrowerData?.data[0]) {
        setFormData({ ...formData, user_id: borrowerData?.data[0]?.id, rfid: rfidCard })
      }
    }
  }, [auth, auth_type, rfidCard, borrowerData])

  const handleSubmit = (e) => {
    console.log(formData);
    post({
      postendpoint: "/books/borrow_book", postData: formData, config:
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    }).then(res => {
      alert(res?.data?.message)
      router.push("/booksLibrary");
    }).catch(error => {
      alert(error?.response?.data?.message)
    })
  }

  return (
    <>
      <div className='page-wrapper'>
        <div className='content'>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <h4 className='page-title'>Issue Book</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Name</label>
                      <p>{
                        showName()
                      }</p>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>ID, Semester, School</label>
                      <p>
                        {
                          showBorrowerIdSemDept()
                        }

                      </p>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Issue Date</label>
                      <p>{(new Date()).toLocaleString('en-UK', {
                        year: 'numeric',
                        month: "2-digit",
                        day: "2-digit",
                        timeZone: "Asia/Dhaka"
                      })}</p>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Book Name</label>
                      <p>{(id || rfidBookId) ? bookdata?.data?.name + " " : ""} {!rfidBookId && "[Scan Book]"}</p>
                    </div>
                  </div>
                  <div className={`col-sm-3 ${rfidScanning ? 'col-md-3' : 'col-md-2'}`}>
                    <button type="button" name="" className="btn btn-success btn-block" onClick={(e) => {
                      e.stopPropagation()
                      scanRfid({ command: "read" })
                    }}>
                      Scan Book
                    </button>
                    {rfidScanning ? <span className="m-l-5">Scanning Book</span> : ""}
                  </div>

                  {auth_type == "admin" && <div className={`col-sm-3 ${fingerPrintScanning ? 'col-md-4' : 'col-md-2'}`}>
                    <button type="button" name="" className="btn btn-danger btn-block" onClick={(e) => {
                      e.stopPropagation()
                      setQueryParams({ ...queryParams, submit: false })
                      scanFingerPrint({ command: "search" })
                    }}>
                      Scan Fingerprint
                    </button>

                    {fingerPrintScanning ? <span className="m-l-5">Scanning FingerPrint</span> : ""}
                  </div>
                  }
                  <div className="col-md-3" style={{ marginTop: "5px" }}>{!fingerPrintScanning && !rfidScanning && showMessage ? showMessage?.message : ""}</div>

                </div>

                <div className='m-t-20 text-center'>
                  <button type="submit" className='btn btn-primary submit-btn' onClick={(e) => { e.stopPropagation() }} disabled={disableSubmit()}>Issue Book</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IssueBook