import { useRouter } from "next/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDashboard, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UserNav = () => {
	const router = useRouter();

	return (
		<>
			<div class='sidebar' id='sidebar'>
				<div class='sidebar-inner slimscroll'>
					<div id='sidebar-menu' class='sidebar-menu'>
						<ul>
							<li class='menu-title'>Main</li>

							<li class={router.pathname === "/user" ? "active" : ""}>
								<Link href='/user'>
									<FontAwesomeIcon icon={faDashboard} />
									<span>Dashboard</span>
								</Link>
							</li>

							<li class={router.pathname === "/user/userProfile" || router.pathname === "/user/userEditProfile" ? "active" : ""}>
								<Link href='/user/userProfile'>
									<FontAwesomeIcon icon={faUserPlus} />
									<span>My Account</span>
								</Link>
							</li>

							<li class={router.pathname === "/user/userBookReports" ? "active" : ""}>
								<Link href='/user/userBookReports'>
									<FontAwesomeIcon icon={faBook} />
									<span>Book Reports</span>
								</Link>
							</li>

							<li>
								<Link href='/'>
									<FontAwesomeIcon icon={faUser} />
									<span>Logout</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserNav;
