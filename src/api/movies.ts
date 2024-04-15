export type Movie = {
	id: number;
	title: string;
	filmCompanyId: number;
	cost: number;
	releaseYear: number;
	averageReview: number;
};

export const FetchMovies = async (): Promise<Movie[]> =>
	await fetch(`${process.env.API_HOST}/movies`).then((res) =>
		res.json().then((data) => data as Movie[]
		)
	);
