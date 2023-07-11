import Header from "@/components/Header";
import AdminNav from "@/components/admin/AdminNav";
import { faEllipsisVertical, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const issueBook = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-sm-4 col-3'>
							<h4 class='page-title'>Issue Books</h4>
						</div>
						<div class='col-sm-8 col-9 text-right m-b-20'>
							<Link href='/admin/addIssueBooks' class='btn btn btn-primary btn-rounded' style={{ float: "right" }}>
								<FontAwesomeIcon icon={faPlus} /> Add Issue Books
							</Link>
						</div>
					</div>
					<div class='row'>
						<div class='col-md-12'>
							<div class='table-responsive'>
								<table class='table table-border table-striped custom-table datatable mb-0'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Department</th>
											<th>Issue Date</th>
											<th>Book</th>
											<th class='text-right'>Action</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>Arafat rasul</td>
											<td>CSE</td>
											<td>22 jun, 2023</td>
											<td>Aaj Himur Biye</td>
											<td class='text-right'>
												<div class='dropdown dropdown-action' style={{ position: "absolute" }}>
													<a href='#' class='action-icon dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
														<FontAwesomeIcon icon={faEllipsisVertical} style={{ bottom: 10, position: "relative" }} />
													</a>
													<div class='dropdown-menu dropdown-menu-right'>
														<a class='dropdown-item' href='#'>
															<FontAwesomeIcon icon={faPencil} style={{ marginRight: 10 }} /> Edit
														</a>
														<a class='dropdown-item' href='#' data-bs-toggle='modal' data-target='#delete_patient'>
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
	);
};

export default issueBook;
