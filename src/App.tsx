import Layout from "./layout/Layout";
import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Companies from "./pages/companies";
import Movie from "./pages/movie";
import Company from "./pages/company";

export const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movies' element={<Home />} />
				<Route path='/companies' element={<Companies />} />
				<Route path='/movies/:id' element={<Movie />} />
				<Route path='/company/:id' element={<Company />} />
			</Routes>
		</Layout>
	);
};
