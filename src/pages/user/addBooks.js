import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import React from "react";

const addBooks = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-lg-8 offset-lg-2'>
							<h4 class='page-title'>Issue Book</h4>
						</div>
					</div>
					<div class='row'>
						<div class='col-lg-8 offset-lg-2'>
							<form>
								<div class='row'>
									<div class='col-md-6'>
										<div class='form-group'>
											<label>Name</label>
											<input class='form-control' type='text' value='Araafat rasul' readonly='' />
										</div>
									</div>

									<div class='col-md-6'>
										<div class='form-group'>
											<label>Department</label>
											<input class='form-control' type='text' value='CSE' />
										</div>
									</div>
								</div>

								<div class='row'>
									<div class='col-md-6'>
										<div class='form-group'>
											<label>Issue Date</label>
											<input class='form-control' type='text' value='06-22-2023' />
										</div>
									</div>

									<div class='col-md-6'>
										<div class='form-group'>
											<label>Book Name</label>
											<input class='form-control' type='text' value='Aaj Himur Biye' />
										</div>
									</div>
								</div>

								<div class='m-t-20 text-center'>
									<button class='btn btn-primary submit-btn'>Add Issue Book</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default addBooks;
