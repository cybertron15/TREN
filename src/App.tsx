import React, { useState } from "react";
import Dashbaord from "./Pages/Dashboard";
import Journal from "./Pages/Journal";
import { Rating } from "react-simple-star-rating";
import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";

export default function App() {
	const router = createBrowserRouter([
		{
			path:"/dashboard",
			element: <Dashbaord/>
		},
		{
			path:"/journal",
			element: <Journal/>
		}
	])
	return (
		// <Desktop />
		<RouterProvider router={router} />


		// <Sample />
	);
}
