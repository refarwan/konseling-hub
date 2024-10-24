import { ReactNode } from "react";

const Button = ({
	type = "filled",
	className,
	children,
}: {
	type?: "text" | "filled";
	className?: string;
	children: ReactNode;
}) => {
	return (
		<button
			className={
				"h-[40px] px-[24px] rounded-[20px] " +
				className +
				(type === "filled"
					? " bg-sky-500 text-white hover:shadow hover:bg-sky-600 focus:bg-sky-700 active:bg-sky-800"
					: " text-sky-500 hover:bg-sky-50 focus:bg-sky-100 active:bg-sky-200")
			}
		>
			{children}
		</button>
	);
};

export default Button;
