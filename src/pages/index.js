import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SwrClient from "@/hooks/swr"
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  const { data: admin, error: adminError } = SwrClient({
    endpoint: '/admin',
    middleware: "guest"
  })

  const { data: user, error: userError } = SwrClient({
    endpoint: '/user',
    middleware: "guest"
  })

  return (
    <>
      <Header />

      <div id='carouselExampleCaptions' className='carousel slide carousel-fade' data-bs-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div style={{ height: "1000px" }}>
              <Image src='/img/librarybg.jpg' className='d-block w-100' height='5957' width='3493' alt='...' />
            </div>

            <div className='carousel-caption d-none d-md-block '>
              <h1 style={{ fontSize: "60px", textShadow: "2px 2px 4px #000000" }}>Library Managment System</h1>
              <p style={{ fontSize: "20px", backgroundColor: "#47494b" }}>
                Library Management System project website used to manage all library system activities.
              </p>

              {
                admin ?
                  (
                    <button className='btn btn-danger'>
                      <Link className='text-light' href='/admin'>
                        Admin Panel
                      </Link>
                    </button>
                  )
                  :
                  user ?
                    (
                      <button className='btn btn-primary'>
                        <Link className='text-light' href='/user'>
                          User Panel
                        </Link>
                      </button>
                    )
                    :
                    ""
              }



            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
