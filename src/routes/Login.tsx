// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form, type LoaderFunctionArgs, useActionData, Navigate, useNavigate, redirect} from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosAuth from "@/utils/axiousAuth";
import { toast } from "sonner";

type ActionData = {
	errorMessage: string
}

function Login() {
	const actionData = useActionData() as ActionData
	const navigate = useNavigate()
	const [inputs, setinputs] = useState({
		email:"palashdhavlee@gmail.com",
		password:"tron@1234",
	})
	const handleInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
		const key = event.target.name
		const val = event.target.value
		setinputs({...inputs,[key]:val})
		
	}
	
	useEffect(() => {
	  // Display the error message in a toast if it exists
		if (actionData?.errorMessage) {
			toast(actionData.errorMessage);
		}
	}, [actionData])
	
	return (
		<div className="flex justify-center items-center h-svh">
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Enter your email and password to login to your account
					</CardDescription>
				</CardHeader>
				<Form method="POST">
					<input name="formType" defaultValue="login" className="border-2 hidden" />
					<CardContent className="flex flex-col">
						<label htmlFor="Email">Email</label>
						<input type="email" name="email" value={inputs.email} onChange={handleInput} className="border-2" />
					</CardContent>
					<CardContent className="flex flex-col">
						<label htmlFor="Password">Passowrd</label>
						<input type="password" name="password" value={inputs.password} onChange={handleInput} className="border-2" />
					</CardContent>
				<CardFooter className="flex gap-2">
					<Button type="submit">Login</Button>
					<Button type="button" onClick={()=>{navigate('/signup')}}>Signup</Button>
				</CardFooter>
				</Form>
			</Card>
		</div>
	);
}

async function action({ params, request }: LoaderFunctionArgs) {
	const formData = await request.formData()
	const response = await axiosAuth(formData)
	if (response.success){
		return redirect('/dashboard')
	}
	return response
	
	
}
export {action}
export default Login;
