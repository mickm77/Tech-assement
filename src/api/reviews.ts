

export type Review = {
    id: number;
    movieId: number;
    score: number;
    review: string;
};

export const FetchReviews = async (movieId: number): Promise<Review[]> =>
    await fetch(`${process.env.API_HOST}/reviews?movieId=${movieId}`).then((res) =>
        res.json().then((data) => data as Review[]
        )
    );

export const AddReview = async (review: Review): Promise<Review> =>
    await fetch(`${process.env.API_HOST}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })
    .then((res) => res.json()
    .then((data) => data as Review));