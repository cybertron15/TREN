import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="flex justify-center items-center w-full h-svh">
			<div className="text-center flex flex-col items-center justify-center gap-3">
				<p className="text-3xl">Clerk Basic Setup</p>
				<SignedOut>
					<div className="w-fit px-8 py-2 border border-gray-400 rounded-md">
						<SignInButton />
					</div>
				</SignedOut>

				<SignedIn>
					<div className="w-fit px-8 py-2 border border-gray-400 rounded-md">
						<UserButton />
					</div>
				</SignedIn>
			</div>
		</div>
	);
}
