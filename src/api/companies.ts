export type MovieCompany = {
    id: number;
    name: string;
};

export const FetchMovieCompanies = async (): Promise<MovieCompany[]> =>
    await fetch(`${process.env.API_HOST}/movieCompanies`).then((res) =>
        res.json()
    );
    