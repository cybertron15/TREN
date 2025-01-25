import React, { useState } from "react";
import Dashboard, {loader as dashboardLoader, action as dashboardAction} from "./routes/Dashboard";
import Journal from "./routes/Journal";
import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import ErrorPage from "./components/errorpage";
import Login, {action as loginAction} from "./routes/Login";
import Signup,  {action as signupAction} from "./routes/Signup";

export default function App() {
	const router = createBrowserRouter([
		{
			// Root route with common error page
			errorElement: <ErrorPage />,
			children: [
				{
					path: "login",
					element: <Login />,
					action: loginAction,
				},
				{
					path: "signup",
					element: <Signup />,
					action: signupAction,
				},
				{
					path: "dashboard",
					element: <Dashboard />,
					loader: dashboardLoader,
					action: dashboardAction
				},
				{
					path: "journal",
					element: <Journal />,
				},
			],
		},
	])
	return (
		<RouterProvider router={router} />
	);
}
