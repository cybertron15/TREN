import axios from "axios";

interface ErrorResponse {
	message: string
	response: {
		status: number
		data: {
			email?: string[];
			username?: string[];
			password?: string[];
			detail?: string[];
			non_field_errors?: string[];
		};
	};
}

export default async function axiosAuth(formData: FormData) {
	const formType = formData.get("formType");
	// const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;
	const BACKEND_API = 'http://localhost:8000/api'
	try {
		if (formType === "login") {
			const email = formData.get("email");
			const password = formData.get("password");
			// Handle login form submission
			const response = await axios.post(`${BACKEND_API}/token/`, {
				email,
				password,
			});
			localStorage.setItem("accessToken", response.data.access);
			localStorage.setItem("refreshToken", response.data.refresh);
			return {
				success: true,
			};
		}
		// signup logic
		const first_name = formData.get("firstName");
		const last_name = formData.get("lastName");
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		const re_password = formData.get("rePassword");
		// Handle signup form submission
		await axios.post(`${BACKEND_API}/signup/`, {
			first_name,
			last_name,
			username,
			email,
			password,
			re_password,
		});
		// After successful signup, log in to get tokens
		const response = await axios.post(`${BACKEND_API}/token/`, {
			email,
			password,
		});
		localStorage.setItem("accessToken", response.data.access);
		localStorage.setItem("refreshToken", response.data.refresh);
		return {
			success: true,
		};
	} catch (error) {
		const err = error as ErrorResponse;
		console.error("Error during form submission:", err);
		if (axios.isAxiosError(err) && err.response) {
			const data = err.response.data;
			const status = err.response.status;

			if (status === 401) {
				return {
					success: false,
					errorMessage:
						err.response.data.detail ||
						"An error occurred during the submission.",
					status: status,
				};
			}
			if (status === 400) {
				if (data.email) {
					return {
						success: false,
						errorMessage:
							err.response.data.email ||
							"An Account with this email already exist",
						status: status,
					};
				}
				if (data.username) {
					return {
						success: false,
						errorMessage:
							err.response.data.username ||
							"An Account with this username already exist",
						status: status,
					};
				}
				if (data.non_field_errors) {
					const errorArray = data.non_field_errors;
					let errors = "";
					for (let i = 0; i < errorArray.length; i++) {
						errors += errorArray[i];
					}
					return {
						success: false,
						errorMessage: errors || "please input a stronger password",
						status: status,
					};
				}
			}
			return {
				
				success: false,
				errorMessage: "An unexpected error occurred.",
			};
		}

		return { errorMessage: err.message || "Unknown form submission" };
	}
}
