import Header from "@/components/Header";
import AdminNav from "@/components/admin/AdminNav";
import React from "react";

const addBook = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-lg-8 offset-lg-2'>
							<h4 class='page-title'>Add Book</h4>
						</div>
					</div>
					<div class='row'>
						<div class='col-lg-8 offset-lg-2'>
							<form>
								<div class='row'>
									<div class='col-md-6'>
										<div class='form-group'>
											<label>Book ID</label>
											<input class='form-control' type='text' value='001' readonly='' />
										</div>
									</div>

									<div class='col-md-6'>
										<div class='form-group'>
											<label>Book Name</label>
											<input class='form-control' type='text' value='Aj Himur Biye' />
										</div>
									</div>
								</div>

								<div class='row'>
									<div class='col-md-6'>
										<div class='form-group'>
											<label>Author Name</label>
											<input class='form-control' type='text' value='Mohammad Humayan Ahmed' />
										</div>
									</div>

									<div class='col-md-6'>
										<div class='form-group'>
											<label>ISBN</label>
											<input class='form-control' type='text' value='' />
										</div>
									</div>
								</div>

								<div class='row'>
									<div class='col-md-6'>
										<div class='form-group'>
											<label>Publisher</label>
											<input class='form-control' type='text' value='Penguin Random House' />
										</div>
									</div>

									<div class='col-md-6'>
										<div class='form-group'>
											<label>Quantity</label>
											<input class='form-control' type='text' value='2' />
										</div>
									</div>
								</div>

								<div class='form-group'>
									<label>Description</label>
									<textarea cols='30' rows='4' class='form-control' value='this is a good book'></textarea>
								</div>

								<div class='m-t-20 text-center'>
									<button class='btn btn-primary submit-btn'>Add Book</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default addBook;
