"use client";
import Beams from "@/components/Beams/Beams";
import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';

import {
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

import {
	FaLinkedin,
	FaTwitter,
	FaGoogle,
	FaFacebook
} from 'react-icons/fa';

import { ScrollArea } from '@/components/ui/scroll-area';
import Link from "next/link";
import { Edu_QLD_Beginner, Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
	variable: "--font-meriweather",
	weight: ["400", "700"],
	subsets: ["latin"],
});

const Edu_AU = Edu_QLD_Beginner({
	variable: "--font-edu-hand",
	subsets: ["latin"],
	display: "swap",
});

export default function Page() {

	const [currentSlide, setCurrentSlide] = useState(0);

	const socialLinks = [
		{
			name: 'LinkedIn',
			icon: <FaLinkedin size={22} />,
			url: 'https://www.linkedin.com/company/theaibro/',
		},
		{
			name: 'X',
			icon: <FaTwitter size={22} />,
			url: 'https://x.com/the_aibro',
		},
	];

	const nextSlide = () => {
		setCurrentSlide(1);
	};

	const prevSlide = () => {
		setCurrentSlide(0);
	};
	return (

		<div className={` min-h-screen flex items-center justify-center px-4 py-8 w-full`}>
			<div className="absolute inset-0 z-[-1] w-full">
				<Beams
					beamWidth={1.6}
					beamHeight={14}
					beamNumber={15}
					lightColor="#E44949"
					speed={4}
					noiseIntensity={1.75}
					scale={0.23}
					rotation={225}
				/>
			</div>
			<div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl h-[85vh] sm:h-[90vh] relative">
				{/* Desktop Layout */}

				<div className="hidden lg:grid lg:grid-cols-2 h-full relative">
					{/* Left Branding Section */}
					<div className={`absolute h-full flex flex-col justify-between p-2 pb-20 opacity-90 m-8 ${libreBaskerville.className}`}>
						<div className="text-sm">clarity isn't found, it's built.</div>
						<div className=" space-y-2">
							<div className="text-4xl">See</div>
							<div className="text-4xl">through</div>
							<div className="text-4xl">your <span className="text-primary font-extrabold">Routine</span></div>
							<span className="text-xs">Get visibility into your day, and build a system that works for you</span>
						</div>
					</div>

					<div className="flex flex-col relative overflow-hidden 
                          basis-1/2
						  bg-background/40 
						  backdrop-blur-2xl
                          mask-[url(/white-rectangle.png),url(/black-rectangle.png)]
                          mask-[position:0%_0%,center]
                          mask-[size:100%_100%,120%_95%]
                          mask-no-repeat
                          mask-subtract
                          w-full h-full
                          border-none">
					</div>

					{/* Right Form Section */}
					<ScrollArea className="flex-1 justify-center relative p-8 lg:p-8 min-h-[90vh] overflow-y-auto bg-background/40 backdrop-blur-2xl">
						<div className="max-w-md flex-1 flex flex-col items-center h-full ">
							{/* Header */}
							<div className="text-center mb-8">
								<h2 className="text-3xl font-bold mb-2">Welcome</h2>
								<p className="">Sign in to your Tren dashboard</p>
							</div>
							<SignIn
								appearance={{
									baseTheme: dark,
									elements: {
										card: "bg-background p-6 rounded-lg border border-red-700",
										headerTitle: "text-white text-lg font-semibold",
										socialButtonsBlockButton: "bg-white/30 hover:bg-white/40 text-white",
										formFieldInput: "bg-white/20 border border-white/30 text-white",
										formButtonPrimary: "bg-white/30 hover:bg-white/40 text-white font-semibold",
									},
								}} />

						</div>

					</ScrollArea>

				</div>

				{/* Mobile Swipe Layout */}
				<div className="lg:hidden relative h-full min-h-[85vh] overflow-hidden">
					{/* Slide Container */}
					<div
						className="flex h-full transition-transform duration-300 ease-in-out"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{/* Slide 1: Branding */}
						<div className="flex-shrink-0 flex flex-col justify-end h-full text-white relative overflow-hidden w-full">
							<div className={`absolute h-full flex flex-col justify-between p-2 py-16 pb-24 opacity-90 m-8 ${libreBaskerville.className}`}>
								<div className="text-sm">clarity isn't found, it's built.</div>
								<div className=" space-y-2">
									<div className="text-4xl">See</div>
									<div className="text-4xl">through</div>
									<div className="text-4xl">your <span className="text-primary font-extrabold">Routine</span></div>
									<span className="text-xs">Get visibility into your day, and build a system that works for you.</span>
								</div>
							</div>
							<div className="backdrop-blur-2xl bg-background/40
                          					mask-[url(/white-rectangle.png),url(/black-rectangle.png)]
                          					mask-[position:0%_0%,center]
                          					mask-[size:100%_100%,115%_95%]
                          					mask-no-repeat
                          					mask-subtract
                          					w-full h-full
                          					border-none">
							</div>

							<div className="relative z-10 backdrop-blur-2xl bg-background/40 px-8 pb-8">

								{/* Swipe to Login Button */}
								<button
									onClick={nextSlide}
									className="w-full bg-primary backdrop-blur-sm rounded-xl py-4 px-6 text-white font-medium flex items-center justify-center gap-3 hover:bg-white/30 transition-all duration-200"
								>
									Get Started
									<ChevronRight size={20} />
								</button>
							</div>
						</div>


						{/* Slide 2: Login Form */}
						<div className="w-full relative flex-shrink-0 flex flex-col bg-background/30 backdrop-blur-2xl pb-10 ">
							<div className="flex-1 overflow-y-auto px-4 py-6 max-h-[90vh] mask-b-from-98% mask-b-to-100%">
								<div className="w-full max-w-[100%] mx-auto">

									{/* Back Button */}
									<button
										onClick={prevSlide}
										className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
									>
										<ChevronLeft size={20} />
										Back
									</button>

									{/* Header */}
									<div className="text-center mb-6">
										<h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
										<p>Sign in to your Nudge dashboard</p>
									</div>

									{/* Clerk SignIn */}
									<div className="relative w-full overflow-hidden">
										<SignIn
											appearance={{
												baseTheme: dark,
												layout: {
													socialButtonsVariant: "auto", // uses smaller social buttons
													socialButtonsPlacement: "bottom",
												},
												elements: {
													card: "w-[83vw] p-3 rounded-xl border border-white/20 bg-background h-[60vh]",
													headerTitle: "text-white text-base font-semibold",
													formFieldInput: "bg-white/10 border border-white/20 text-white text-sm",
													formButtonPrimary: "bg-white/20 hover:bg-white/30 text-white text-sm font-medium",
													socialButtonsBlockButton: "bg-white/20 hover:bg-white/30 text-white text-sm",
													footer:"max-w-[83vw] rounded-b-2xl"
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>


					</div>

					{/* Slide Indicators */}
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
						<button
							onClick={() => setCurrentSlide(0)}
							className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === 0 ? 'bg-primary w-6' : 'bg-gray-300'
								}`}
						/>
						<button
							onClick={() => setCurrentSlide(1)}
							className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === 1 ? 'bg-primary w-6' : 'bg-gray-300'
								}`}
						/>
					</div>
				</div>
			</div>
		</div>

	);
}
