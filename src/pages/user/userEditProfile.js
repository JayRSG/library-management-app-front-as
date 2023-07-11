import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import React from "react";

const userEditProfile = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div className='row'>
						<div className='col-sm-12'>
							<h4 className='page-title'>Edit Profile</h4>
						</div>
					</div>
					<form>
						<div className='card-box'>
							<h3 className='card-title'>Basic Informations</h3>
							<div className='row'>
								<div className='col-md-12'>
									<div>
										<div className='row'>
											<div className='col-md-6'>
												<div className='form-group form-focus'>
													<label className='focus-label'>First Name</label>
													<input type='text' className='form-control floating' value='Arafat' />
												</div>
											</div>
											<div className='col-md-6'>
												<div className='form-group form-focus'>
													<label className='focus-label'>Last Name</label>
													<input type='text' className='form-control floating' value='Rasul' />
												</div>
											</div>
											<div className='col-md-6'>
												<div className='form-group form-focus'>
													<label className='focus-label'>Birth Date</label>
													<div className='cal-icon'>
														<input className='form-control floating datetimepicker' type='text' value='05/06/2001' />
													</div>
												</div>
											</div>
											<div className='col-md-6'>
												<div className='form-group form-focus select-focus'>
													<label className='focus-label'>Gender</label>
													<select className='select form-control floating'>
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

						<div className='card-box'>
							<h3 className='card-title'>Contact Informations</h3>

							<div className='row'>
								<div className='col-md-12'>
									<div className='form-group form-focus'>
										<label className='focus-label'>Address</label>
										<input type='text' className='form-control floating' value='Lalkhanbazar, Bangladesh' />
									</div>
								</div>

								<div className='col-md-6'>
									<div className='form-group form-focus'>
										<label className='focus-label'>State</label>
										<input type='text' className='form-control floating' value='Chittagong' />
									</div>
								</div>

								<div className='col-md-6'>
									<div className='form-group form-focus'>
										<label className='focus-label'>Country</label>
										<input type='text' className='form-control floating' value='Bangladesh' />
									</div>
								</div>

								<div className='col-md-6'>
									<div className='form-group form-focus'>
										<label className='focus-label'>Phone Number</label>
										<input type='text' className='form-control floating' value='01234567891' />
									</div>
								</div>
							</div>
						</div>

						<div className='text-center m-t-20'>
							<button className='btn btn-primary submit-btn' type='button'>
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
