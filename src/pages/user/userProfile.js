import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import Image from "next/image";
import React from "react";

const userProfile = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-sm-7 col-6'>
							<h4 class='page-title'>My Profile</h4>
						</div>

						<div class='col-sm-5 col-6 text-right m-b-30'>
							<a href='edit-profile.html' class='btn btn-primary btn-rounded'>
								<i class='fa fa-plus'></i> Edit Profile
							</a>
						</div>
					</div>

					<div class='card-box profile-header'>
						<div class='row'>
							<div class='col-md-12'>
								<div class='profile-view'>
									<div class='profile-basic'>
										<div class='row'>
											<div class='col-md-5'>
												<div class='profile-info-left'>
													<h3 class='user-name m-t-0 mb-0'>Arafat Rasul</h3>
													<small class='text-muted'>Bsc 2018-2023</small>
													<div class='staff-id'>Student ID : 18202007 CSE</div>
												</div>
											</div>

											<div class='col-md-7'>
												<ul class='personal-info'>
													<li>
														<span class='title'>Phone:</span>
														<span class='text'>
															<a href='#'>0305-8751544</a>
														</span>
													</li>

													<li>
														<span class='title'>Email:</span>
														<span class='text'>
															<a href='#'>example@gmail.com</a>
														</span>
													</li>

													<li>
														<span class='title'>Birthday:</span>
														<span class='text'>1st January</span>
													</li>

													<li>
														<span class='title'>Address:</span>
														<span class='text'>Lalkhan Bazar, Bangladesh</span>
													</li>

													<li>
														<span class='title'>Gender:</span>
														<span class='text'>Male</span>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default userProfile;
