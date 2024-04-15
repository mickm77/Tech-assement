import { ChangeEvent, useState } from "react";
import css from "./review.module.css";
import { AddReview } from "../../api/reviews";
import { useMutation, useQueryClient } from "react-query";

type ReviewProps = {
	movieId: number;
	afterSave?: () => void;
	onCancel?: () => void;
	refetch?: () => void;
};

const Review = ({ movieId, afterSave, onCancel, refetch }: ReviewProps) => {
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(5);
	const [dirty, setDirty] = useState(false);
	const queryClient = useQueryClient();
	const mutation = useMutation(AddReview, {
		onSuccess: () => {
			queryClient.invalidateQueries(["movie", movieId]),
				queryClient.invalidateQueries(["movies"]);
		},
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e.target.value);
		setReview(e.target.value);
		setErrorMessage("");
		setDirty(true);
	};

	const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRating(parseInt(e.target.value));
		setErrorMessage("");
		setDirty(true);
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (review.length === 0 || rating === 0) {
			setErrorMessage("Error: Please fill out the review and rating fields");
			return;
		} else if (review.length > 100) {
			setErrorMessage("Error: Review must be less than 100 characters");
			return;
		} else if (rating < 1 || rating > 10) {
			setErrorMessage("Error: Rating must be between 1 and 10");
			return;
		}
		setDirty(false);
		try {
			mutation.mutate({ id: -1, movieId, review, score: rating });
			setReview("");
			setRating(5);
			afterSave?.();
			refetch?.();
			queryClient.invalidateQueries(["movie", movieId]);
			queryClient.invalidateQueries(["movies"]);
		} catch (error) {
			setErrorMessage("Error: Failed to submit review - please try again later");
		}
	};

	const tooMany = review.length > 100;
	if (movieId === null) return null;
	return (
		<div className={css.reviewForm}>
			<textarea
				rows={6}
				placeholder=' Leave a review here'
				onChange={handleReviewChange}
				value={review}
			></textarea>
			<div className={`${css.used} ${tooMany && css.tooMany}`}>{review.length}/100</div>

			<label htmlFor='score'>
				Rating:
				<input
					name='score'
					type='number'
					placeholder='Rating'
					min='1'
					max='10'
					onChange={handleRatingChange}
					value={rating}
				/>
			</label>
			<p className={css.formError}>{errorMessage}</p>
			<div className={css.buttons}>
				<p className={css.formError}>{errorMessage}</p>
				<button onClick={() => (onCancel ? onCancel() : null)}>Cancel</button>
				<button
					onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
						handleSubmit(e)
					}
					disabled={tooMany}
					className='accentButton'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Review;
