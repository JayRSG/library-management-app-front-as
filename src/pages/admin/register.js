import Image from "next/image"
import Link from "next/link"
import React from "react"

const register = () => {
	return (
		<>
			<div className='main-wrapper  account-wrapper'>
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
									<label>First Name</label>
									<input type='text' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Last Name</label>
									<input type='text' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Email Address</label>
									<input type='email' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Password</label>
									<input type='password' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Student Id</label>
									<input type='text' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Semester</label>
									<input type='text' className='form-control' />
								</div>

								<div className='form-group'>
									<label>Department</label>
									<input type='text' className='form-control' />
								</div>

								<div className='form-group text-center'>
									<button className='btn btn-primary account-btn' type='submit'>
										Scan Fingerprint
									</button>
								</div>

								<div className='form-group text-center'>
									<button className='btn btn-primary account-btn' type='submit'>
										Signup
									</button>
								</div>

								<div className='text-center login-link'>
									Already have an account? <Link href='/admin/login'>Login</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default register
