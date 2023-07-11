import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import React from "react";

const userEditProfile = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div class='page-wrapper'>
				<div class='content'>
					<div class='row'>
						<div class='col-sm-12'>
							<h4 class='page-title'>Edit Profile</h4>
						</div>
					</div>
					<form>
						<div class='card-box'>
							<h3 class='card-title'>Basic Informations</h3>
							<div class='row'>
								<div class='col-md-12'>
									<div>
										<div class='row'>
											<div class='col-md-6'>
												<div class='form-group form-focus'>
													<label class='focus-label'>First Name</label>
													<input type='text' class='form-control floating' value='Arafat' />
												</div>
											</div>
											<div class='col-md-6'>
												<div class='form-group form-focus'>
													<label class='focus-label'>Last Name</label>
													<input type='text' class='form-control floating' value='Rasul' />
												</div>
											</div>
											<div class='col-md-6'>
												<div class='form-group form-focus'>
													<label class='focus-label'>Birth Date</label>
													<div class='cal-icon'>
														<input class='form-control floating datetimepicker' type='text' value='05/06/2001' />
													</div>
												</div>
											</div>
											<div class='col-md-6'>
												<div class='form-group form-focus select-focus'>
													<label class='focus-label'>Gender</label>
													<select class='select form-control floating'>
														<option value='male selected'>Male</option>
														<option value='female'>Female</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class='card-box'>
							<h3 class='card-title'>Contact Informations</h3>

							<div class='row'>
								<div class='col-md-12'>
									<div class='form-group form-focus'>
										<label class='focus-label'>Address</label>
										<input type='text' class='form-control floating' value='Lalkhanbazar, Bangladesh' />
									</div>
								</div>

								<div class='col-md-6'>
									<div class='form-group form-focus'>
										<label class='focus-label'>State</label>
										<input type='text' class='form-control floating' value='Chittagong' />
									</div>
								</div>

								<div class='col-md-6'>
									<div class='form-group form-focus'>
										<label class='focus-label'>Country</label>
										<input type='text' class='form-control floating' value='Bangladesh' />
									</div>
								</div>

								<div class='col-md-6'>
									<div class='form-group form-focus'>
										<label class='focus-label'>Phone Number</label>
										<input type='text' class='form-control floating' value='01234567891' />
									</div>
								</div>
							</div>
						</div>

						<div class='text-center m-t-20'>
							<button class='btn btn-primary submit-btn' type='button'>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default userEditProfile;
