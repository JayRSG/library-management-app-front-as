import Header from "@/components/Header"
import UserNav from "@/components/user/UserNav"
import React from "react"

const addBooks = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div className='row'>
						<div className='col-lg-8 offset-lg-2'>
							<h4 className='page-title'>Issue Book</h4>
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-8 offset-lg-2'>
							<form>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<label>Name</label>
											<input className='form-control' type='text' value='Araafat rasul' readonly='' />
										</div>
									</div>

									<div className='col-md-6'>
										<div className='form-group'>
											<label>Department</label>
											<input className='form-control' type='text' value='CSE' />
										</div>
									</div>
								</div>

								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<label>Issue Date</label>
											<input className='form-control' type='text' value='06-22-2023' />
										</div>
									</div>

									<div className='col-md-6'>
										<div className='form-group'>
											<label>Book Name</label>
											<input className='form-control' type='text' value='Aaj Himur Biye' />
										</div>
									</div>
								</div>

								<div className='m-t-20 text-center'>
									<button className='btn btn-primary submit-btn'>Add Issue Book</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default addBooks
