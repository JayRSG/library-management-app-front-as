import { useBooks } from "@/hooks/useBooks"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const IssueBook = (props) => {
  const router = useRouter()
  const { id } = router.query
  const { auth, auth_type } = props
  const { bookdata, bookLoading } = useBooks({ params: { id: id } })
  const [scanData, setScanData] = useState(null)

  
  const handleSubmit = (e) => {

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
                      <p>{(auth_type == "admin" && "Scan Fingerprint") || (auth_type == "user" && auth?.first_name + " " + auth?.last_name)}</p>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>ID, Semester Department</label>
                      <p>{(auth_type == "admin" && "Scan Fingerprint") || (auth_type == "user" && auth?.student_id + "; " + auth?.semester + "th semester, " + auth?.department)}</p>
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
                  <div className="col-sm-3 col-md-2">
                    <button name="" className="btn btn-success btn-block">
                      Scan Book
                    </button>
                  </div>

                  {auth_type == "admin" && <div className="col-sm-3 col-md-2">
                    <button name="" className="btn btn-danger btn-block">
                      Scan Fingerprint
                    </button>
                  </div>}
                </div>

                <div className='m-t-20 text-center'>
                  <button className='btn btn-primary submit-btn' disabled={!scanData}>Issue Book</button>
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