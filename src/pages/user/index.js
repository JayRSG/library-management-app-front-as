import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserNav from "@/components/user/UserNav";
import Link from "next/link";
import React from "react";

const index = () => {
	return (
		<>
			<Header />

			<UserNav />

			<div className='page-wrapper'>
				<div className='content'>
					<div>
						<h1 style={{ textAlign: "center" }}>Welcome to your panel</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
