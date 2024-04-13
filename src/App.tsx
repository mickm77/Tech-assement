import { useRef, useState, Children } from "react";
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer } from "@reduxjs/toolkit";
import { Movie, FetchMovies } from "./api/movies";
import { useQuery } from "react-query";
import Layout from "./layout/Layout";
import { Route, Router, Routes } from "react-router";
import MoviesTable from "./components/movies/MoviesTable";
import Home from "./pages/home/Home";

export const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movies' element={<Home />} />
				{/* <Route path='/movies/:movieId' element={<Movie />} />
				<Route path='/companies' element={<Companies />} />
				<Route path='/companies/:companyId' element={<Company />} /> */}
			</Routes>
		</Layout>
	);
};
