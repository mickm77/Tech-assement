import Header from "../header/header";
import css from "./layout.module.css";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<Header />
			<main className={css.center}>{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;
