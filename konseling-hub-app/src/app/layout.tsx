import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";

export const metadata: Metadata = {
	title: "Teman Dengar",
	description: "Teman Dengar by Tessera Indonesia",
};

const poppins = Poppins({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="in">
			<body className={poppins.className + " text-slate-950 bg-white"}>
				{children}
			</body>
		</html>
	);
}
