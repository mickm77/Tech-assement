import React from "react";

const StopPropagation = ({ children }: { children: React.ReactNode }) => {
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return <div onClick={handleClick}>{children}</div>;
};

export default StopPropagation;
