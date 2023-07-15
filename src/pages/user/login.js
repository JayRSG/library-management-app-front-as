import LoginComponent from "@/components/auth/LoginComponent"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const login = () => {
	return (
		<>
			<div className='main-wrapper account-wrapper'>
				<div className='account-page'>
					<div className='account-center'>
						<div className='account-box'>
							<form action='' className='form-signin'>
								<div className='account-logo'>
									<Link href='/'>
										<Image src='/img/logo-dark.png' alt='' width={240} height={240} />
									</Link>
								</div>

								<div className='form-group'>
									<label>Email</label>
									<input type='text' autoFocus='' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Password</label>
									<input type='password' className='form-control' />
								</div>

								<div className='form-group text-center'>
									<button type='submit' className='btn btn-primary account-btn'>
										Scan Fingerprint
									</button>
								</div>

								<div className='form-group text-right'>
									<Link href='#'>Forgot your password?</Link>
								</div>

								<div className='form-group text-center'>
									<button type='submit' className='btn btn-primary account-btn'>
										Login
									</button>
								</div>

          </div>
        </div>
      </div>
    </>
  )
}

export default login
