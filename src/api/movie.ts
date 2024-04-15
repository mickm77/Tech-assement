import { Movie } from './movies';
import { Review } from './reviews';


export type MovieWithReviews = Movie & {
    reviews: Review[];
};

export const FetchMovie = async (id:number): Promise<MovieWithReviews> =>
    await fetch(`${process.env.API_HOST}/movies/${id}`).then((res) =>
        res.json().then((data) => data as MovieWithReviews
        )
    );
