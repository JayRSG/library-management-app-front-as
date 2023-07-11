import Header from "@/components/Header";
import AdminNav from "@/components/admin/AdminNav";
import React from "react";

const addIssueBooks = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-lg-8 offset-lg-2'>
							<h4 class='page-title'>Add Issue Book</h4>
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

export default addIssueBooks;
