import Image from "next/image";
import Link from "next/link";
import React from "react";

const register = () => {
	return (
		<>
			<div class='main-wrapper  account-wrapper'>
				<div class='account-page'>
					<div class='account-center'>
						<div class='account-box'>
							<form action='' class='form-signin'>
								<div class='account-logo'>
									<Link href='/'>
										<Image src='/img/logo-dark.png' alt='' width={240} height={240} />
									</Link>
								</div>

								<div class='form-group'>
									<label>First Name</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Last Name</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Email Address</label>
									<input type='email' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Password</label>
									<input type='password' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Student Id</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Semester</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Department</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Fingerprint</label>
									<input type='text' class='form-control' />
								</div>

								<div class='form-group text-center'>
									<button class='btn btn-primary account-btn' type='submit'>
										Signup
									</button>
								</div>

								<div class='text-center login-link'>
									Already have an account? <Link href='/user/login'>Login</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default register;
