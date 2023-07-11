import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const books = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div className='row'>
						<div className='col-sm-12'>
							<h4 className='page-title'>Books</h4>
						</div>
					</div>
					<div className='row filter-row'>
						<div className='col-sm-6 col-md-3'>
							<div className='form-group'>
								<input type='text' autoFocus='' className='form-control' placeholder='search book name' />
							</div>
						</div>

						<div className='col-sm-1 col-md-1'>
							<a href='#' className='btn btn-success btn-block'>
								Search
							</a>
						</div>

						<div className='col-sm-6 col-md-3'>
							<a href='#' className='btn btn-success btn-block'>
								Scan Books
							</a>
						</div>

						<div className='col-sm-6 col-md-3'>
							<Link href='/user/addBooks' className='btn btn-primary btn-rounded' style={{ float: "right" }}>
								<FontAwesomeIcon icon={faPlus} /> Issue Books
							</Link>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<div className='table-responsive'>
								<table className='table table-striped custom-table mb-0 datatable'>
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

export default books;
