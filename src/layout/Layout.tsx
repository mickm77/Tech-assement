import Header from "../header";
import css from "./layout.module.css";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			<main className={css.center}>{children}</main>
			<div className={css.bottomPage}>&nbsp;</div>
		</>
	);
};

export default Layout;
