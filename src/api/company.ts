import { MovieCompany } from "./companies";
import { Movie } from "./movies";

export type MovieCompanyWithMovies = MovieCompany & {
    movies: Movie[];
};

export const FetchMovieCompany = async (id: number):Promise<MovieCompanyWithMovies> => {
    return await fetch(`${process.env.API_HOST}/movieCompanies/${id}`).then((res) => res.json());
}