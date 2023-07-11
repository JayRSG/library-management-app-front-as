import Image from "next/image";
import Link from "next/link";
import React from "react";

const login = () => {
	return (
		<>
			<div class='main-wrapper account-wrapper'>
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
									<label>Email</label>
									<input type='text' autofocus='' class='form-control' />
								</div>

								<div class='form-group'>
									<label>Password</label>
									<input type='password' class='form-control' />
								</div>

								<div class='form-group text-center'>
									<button type='submit' class='btn btn-primary account-btn'>
										Scan Fingerprint
									</button>
								</div>

								<div class='form-group text-right'>
									<Link href='#'>Forgot your password?</Link>
								</div>

								<div class='form-group text-center'>
									<button type='submit' class='btn btn-primary account-btn'>
										Login
									</button>
								</div>

								<div class='text-center register-link'>
									Don’t have an account? <Link href='/admin/register'>Register Now</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default login;
