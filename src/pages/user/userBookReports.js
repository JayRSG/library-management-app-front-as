import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import React from "react";

const userBookReports = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-sm-12'>
							<h4 class='page-title'>Book Report</h4>
						</div>
					</div>
					<div class='row filter-row'>
						<div class='col-sm-6 col-md-3'>
							<div class='form-group'>
								<input type='text' autofocus='' class='form-control' placeholder='search book name' />
							</div>
						</div>

						<div class='col-sm-6 col-md-3'>
							<a href='#' class='btn btn-success btn-block'>
								Search
							</a>
						</div>
					</div>
					<div class='row'>
						<div class='col-md-12'>
							<div class='table-responsive'>
								<table class='table table-striped custom-table mb-0 datatable'>
									<thead>
										<tr>
											<th>Book-ID</th>
											<th>Book-Name</th>
											<th>Borrow Date</th>
											<th>return Date</th>
											<th>Late Fine</th>
											<th>Fine Payment Date</th>
											<th>Status</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>
												<strong>1</strong>
											</td>
											<td>Aj Himur Biye</td>
											<td>22 jun,2023</td>
											<td>22 July 2023</td>
											<td>0</td>
											<td>NA</td>
											<td>Pending</td>
										</tr>

										<tr>
											<td>
												<strong>1</strong>
											</td>
											<td>Aj Himur Biye</td>
											<td>22 jun,2023</td>
											<td>22 July 2023</td>
											<td>0</td>
											<td>NA</td>
											<td>Pending</td>
										</tr>

										<tr>
											<td>
												<strong>1</strong>
											</td>
											<td>Aj Himur Biye</td>
											<td>22 jun,2023</td>
											<td>22 July 2023</td>
											<td>0</td>
											<td>NA</td>
											<td>Pending</td>
										</tr>

										<tr>
											<td>
												<strong>1</strong>
											</td>
											<td>Aj Himur Biye</td>
											<td>22 jun,2023</td>
											<td>22 July 2023</td>
											<td>0</td>
											<td>NA</td>
											<td>Pending</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default userBookReports;
