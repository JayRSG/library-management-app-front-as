import Header from "@/components/Header"
import AdminNav from "@/components/admin/AdminNav"
import { faEllipsisVertical, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React from "react"

const returnBook = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div className='row'>
						<div className='col-sm-4 col-3'>
							<h4 className='page-title'>Return Books</h4>
						</div>
						<div className='col-sm-8 col-9 text-right m-b-20'>
							<Link href='/admin/addReturnBooks' className='btn btn btn-primary btn-rounded' style={{ float: "right" }}>
								<FontAwesomeIcon icon={faPlus} /> Add Return Books
							</Link>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<div className='table-responsive'>
								<table className='table table-border table-striped custom-table datatable mb-0'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Department</th>
											<th>Return Date</th>
											<th>Return Book</th>
											<th className='text-right'>Action</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>Arafat rasul</td>
											<td>CSE</td>
											<td>22 jun, 2023</td>
											<td>Aaj Himur Biye</td>
											<td className='text-right'>
												<div className='dropdown dropdown-action' style={{ position: "absolute" }}>
													<a href='#' className='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
														<FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
													</a>
													<div className='dropdown-menu dropdown-menu-right'>
														<a className='dropdown-item' href='#'>
															<FontAwesomeIcon icon={faPencil} style={{ marginRight: 10 }} /> Edit
														</a>
														<a className='dropdown-item' href='#' data-bs-toggle='modal' data-target='#delete_patient'>
															<FontAwesomeIcon icon={faTrash} style={{ marginRight: 10 }} /> Delete
														</a>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default returnBook
