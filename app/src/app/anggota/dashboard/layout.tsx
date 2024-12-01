import { ReactNode } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Daftar Konselor | CounselingHub",
};

const Layout = ({ children }: { children: ReactNode }) => {
	return children;
};

export default Layout;
