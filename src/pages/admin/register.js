import AdminRegister from "@/components/auth/AdminRegister"
import Image from "next/image"
import Link from "next/link"

const register = () => {
 return (
    <>
      <div className='main-wrapper  account-wrapper'>
        <div className='account-page'>
          <div className='account-center'>
            <div className='account-box'>
              <div className='account-logo'>
                <Link href='/'>
                  <Image src='/img/logo2.png' alt='' width={240} height={240} />
                </Link>
              </div>

              <AdminRegister />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default register
