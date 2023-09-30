import { useAllUsers } from "@/hooks/useAllUsers"
import { useBooks } from "@/hooks/useBooks"
import { useDeviceData } from "@/hooks/useDeviceWS"
import { useUser } from "@/hooks/useUser"
import { fetcher } from "@/lib/axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const IssueBook = (props) => {
  const router = useRouter()
  const { id } = router.query
  const { auth, auth_type } = props
  const [queryParams, setQueryParams] = useState({
    account_type: "",
    id: ""
  })

  const { bookdata, bookLoading } = useBooks({ params: { id: id } })
  const [scanData, setScanData] = useState(null)

  const { deviceData: fingerPrintData, isScanning: fingerPrintScanning, communicateDevice: scanFingerPrint } = useDeviceData()
  const { deviceData: rfidData, isScanning: rfidScanning, communicateDevice: scanRfid } = useDeviceData()


  const [showMessage, setShowMessage] = useState("")
  const [foundFingerprint, setFoundFingerprint] = useState(null)

  const { data: borrowerData, isLoading, mutate } = useAllUsers({ params: foundFingerprint && queryParams?.account_type == "user" ? queryParams : "" })

  useEffect(() => {
    console.log(rfidData)
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

      if (data?.message == "Fingerprint matched") {
        setFoundFingerprint(data?.id)
      }
    }
  }, [fingerPrintData])

  // Search for fingerprint data for any user
  async function searchFingerprint() {
    if (foundFingerprint) {
      return await fetcher({
        url: "user/fingerprint_manage",
        params: {
          operation: "search",
          fingerprint: foundFingerprint
        }
      })
    }
  }

  // get the fingerprint information per user and set query to fetch user information
  useEffect(() => {
    if (foundFingerprint) {
      searchFingerprint()
        .then(res => {
          setQueryParams({ ...res?.data })
        })
        .catch(error => { alert(error?.response?.data?.message) })

    }
  }, [foundFingerprint])

  const handleSubmit = (e) => {

  }

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
      return "[Unauthorized user, scan users only]"
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
      return "[Unauthorized user, scan users only]"
    }

    return "Scan Fingerprint"
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
                      <p>{bookdata?.data?.name + " "} {!scanData && "[Scan Book]"}</p>
                    </div>
                  </div>
                  <div className={`col-sm-3 ${rfidScanning ? 'col-md-3' : 'col-md-2'}`}>
                    <button type="button" name="" className="btn btn-success btn-block" onClick={(e) => {
                      e.stopPropagation()
                      scanRfid({ command: "read", id: "123" })
                    }}>
                      Scan Book
                    </button>
                    {rfidScanning ? <span className="m-l-5">Scanning Book</span> : ""}
                  </div>

                  {auth_type == "admin" && <div className={`col-sm-3 ${fingerPrintScanning ? 'col-md-4' : 'col-md-2'}`}>
                    <button type="button" name="" className="btn btn-danger btn-block" onClick={(e) => {
                      e.stopPropagation()
                      scanFingerPrint({ command: "search" })
                    }}>
                      Scan Fingerprint
                    </button>
                    {fingerPrintScanning ? <span className="m-l-5">Scanning FingerPrint</span> : ""}
                  </div>}
                  <div className="col-md-3" style={{ marginTop: "5px" }}>{!fingerPrintScanning && showMessage ? showMessage?.message : ""}</div>

                </div>

                <div className='m-t-20 text-center'>
                  <button type="submit" className='btn btn-primary submit-btn' disabled={!scanData}>Issue Book</button>
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