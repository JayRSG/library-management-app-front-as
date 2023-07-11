import Header from "@/components/Header";
import AdminNav from "@/components/admin/AdminNav";
import React from "react";

const addIssueBooks = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div className='row'>
						<div className='col-lg-8 offset-lg-2'>
							<h4 className='page-title'>Add Issue Book</h4>
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
	);
};

export default addIssueBooks;
