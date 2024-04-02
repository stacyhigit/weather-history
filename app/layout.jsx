import { Inter } from "next/font/google";
import "./globals.css";
import { SelectionsProvider } from "./context/SelectionsContext";
import Nav from "./components/header/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Weather History",
	description: "See historical weather for a given day",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SelectionsProvider>
					<div className="background">
						<div className="gradient" />
					</div>
					<main>
						<Nav />
						{children}
						<Footer />
					</main>
				</SelectionsProvider>
			</body>
		</html>
	);
}
