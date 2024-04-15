import css from "./errorBox.module.css";

const ErrorBox = ({ error }: { error: string }) => {
	return (
		<div className={css.dataError}>
			<h1>Error</h1>
			<p>{error}</p>
		</div>
	);
};

export default ErrorBox;
