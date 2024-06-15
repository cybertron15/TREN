import React from "react";
import { useRouteError } from "react-router-dom";
interface RouteError {
	statusText?: string;
	message?: string;
	status?: number;
}
export default function ErrorPage() {
	const error = useRouteError() as RouteError;
	console.error(error);

	return (
		<div
			id="error-page"
			className="flex flex-col h-svh justify-center items-center debug"
		>
			<div className="text-7xl">
				<span className=" text-black leading-none font-JetBrainsMono">
					TRE<span className="text-red-500">N</span>
				</span>
			</div>
			{error.status === 404 ? (
				<div className="font-JetBrainsMono text-center">
					<div>Stop wandering around</div>
					<div>404! Not Found</div>
				</div>
			) : (
				<p>
					{error.statusText || error.message}
				</p>
			)}
		</div>
	);
}
