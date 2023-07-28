import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useAdmin } from "@/hooks/useAdmin"
import { useUser } from "@/hooks/useUser"
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  const { data: admin, error: adminError } = useAdmin({
    middleware: "guest",
    redirectIfAuthenticated: "/admin"

  })

  const { data: user, error: userError } = useUser({
    middleware: "guest",
    redirectIfAuthenticated: '/user'

  })

  return (
    <>
      <Header />

      <div id='carouselExampleCaptions' className='carousel slide carousel-fade' data-bs-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div style={{ height: "960px" }}>
              <Image src='/img/mylibbg.png' className='d-block w-100' height='600' width='400' alt='...' />
            </div>

            <div className='carousel-caption d-none d-md-block '>
              <h1 style={{ fontSize: "60px", textShadow: "2px 2px 4px #000000" }}>Library Management System</h1>
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
