import Image from "next/image";
import React from "react";

const Header = () => {
	return (
		<>
			<div class='main-wrapper'>
				<div class='header'>
					<div class='header-left'>
						<a href='index.html' class='logo'>
							<Image src='/img/logo.png' width='35' height='35' alt='' /> <span>LMS</span>
						</a>
					</div>

					<a id='mobile_btn' class='mobile_btn float-left' href='#sidebar'>
						<i class='fa fa-bars'></i>
					</a>

					<ul class='nav user-menu header-right'>
						<li class='nav-item dropdown '>
							<a href='#' class='dropdown-toggle nav-link user-link' data-bs-toggle='dropdown'>
								<span class='user-img'>
									<Image class='rounded-circle' src='/img/user.jpg' width='24' height='24' alt='Admin' />
									<span class='status online'></span>
								</span>
								<span>Login</span>
							</a>

							<div class='dropdown-menu'>
								<a class='dropdown-item' href='login.html'>
									Admin
								</a>

								<a class='dropdown-item' href='user/login'>
									User
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Header;
