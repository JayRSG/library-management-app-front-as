import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<Header />

			<div id='carouselExampleCaptions' class='carousel slide carousel-fade' data-bs-ride='carousel'>
				<div class='carousel-inner'>
					<div class='carousel-item active'>
						<div style={{ height: "1000px" }}>
							<Image src='/img/librarybg.jpg' class='d-block w-100' height='5957' width='3493' alt='...' />
						</div>

						<div class='carousel-caption d-none d-md-block '>
							<h1 style={{ fontSize: "60px", textShadow: "2px 2px 4px #000000" }}>Library Managment System</h1>
							<p style={{ fontSize: "20px", backgroundColor: "#47494b" }}>
								Library Management System project website used to manage all library system activities.
							</p>
							<button class='btn btn-danger'>
								<a class='text-light' href='index-2.html'>
									Admin
								</a>
							</button>
							|
							<button class='btn btn-primary'>
								<a class='text-light' href='index Student.html'>
									User
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
