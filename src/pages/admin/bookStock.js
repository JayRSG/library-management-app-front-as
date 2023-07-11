import Header from "@/components/Header";
import AdminNav from "@/components/admin/AdminNav";
import { faEllipsisVertical, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const bookStock = () => {
	return (
		<>
			<Header />

			<AdminNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-sm-4 col-3'>
							<h4 class='page-title'>Books</h4>
						</div>
						<div class='col-sm-8 col-9 text-right m-b-20'>
							<Link href='/admin/addBook' class='btn btn btn-primary btn-rounded' style={{ float: "right" }}>
								<FontAwesomeIcon icon={faPlus} /> Add Books
							</Link>
						</div>
					</div>
					<div class='row'>
						<div class='col-md-12'>
							<div class='table-responsive'>
								<table class='table table-border table-striped custom-table datatable mb-0'>
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Author</th>
											<th>Isbn</th>
											<th>Publisher</th>
											<th>quantity</th>
											<th>description</th>
											<th class='text-right'>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>001</td>
											<td>AAj Himur Biye</td>
											<td>Mohammad Humayun Ahmed</td>
											<td>098765690</td>
											<td>Penguin Random House</td>
											<td>2</td>
											<td>This is a good book</td>
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

			{/* <div id='delete_patient' class='modal fade delete-modal' role='dialog'>
				<div class='modal-dialog modal-dialog-centered'>
					<div class='modal-content'>
						<div class='modal-body text-center'>
							<Image src='/img/sent.png' alt='' width='50' height='46' />
							<h3>Are you sure want to delete this Patient?</h3>
							<div class='m-t-20'>
								<a href='#' class='btn btn-white' data-bs-dismiss='modal'>
									Close
								</a>
								<button type='submit' class='btn btn-danger'>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default bookStock;
