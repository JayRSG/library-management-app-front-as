// import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css"

import { useEffect } from "react"

export default function App({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap")
	}, [])

	return <Component {...pageProps} />
}
