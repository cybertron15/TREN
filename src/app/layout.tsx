import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Provider from "@/providers";
import { ThemeProvider } from "next-themes";

const josefinSans = Josefin_Sans({
	variable: "--font-josefin-sans",
	subsets: ["latin"],
	display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
	title: {
		default: 'TrenAI',
		template: '%s | TrenAI',
	},
	description:
		"Transform your daily routine with intelligent and automated insights. Achieve your goals faster than ever before with TrenAI—your AI-powered productivity tracker and analyzer.",
	keywords: [
		"AI productivity tracker",
		"AI productivity analyzer",
		"automated scheduling",
		"goal tracking",
		"time management",
		"daily routine optimization",
	],
	openGraph: {
		title: "Streamline your productivity with AI | TrenAI",
		description:
			"Transform your daily routine with intelligent and automated insights. Achieve your goals faster than ever before with TrenAI, your AI-powered productivity tracker and analyzer.",
		url: `${baseUrl}`,
		siteName: "TrenAI",
		images: [
			{
				url: `${baseUrl}/og-banner.png`,
				width: 1200,
				height: 630,
				alt: "TrenAI — AI-powered productivity tracker dashboard",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@thetrenai",
		creator: "@DhavlePalash",
		title: "Streamline your productivity with AI | TrenAI",
		description:
			"Transform your daily routine with intelligent and automated insights. Achieve your goals faster than ever before with TrenAI—your AI-powered productivity tracker and analyzer.",
		images: [`${baseUrl}/og-banner.png`],
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		shortcut: "/favicon-16x16.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${josefinSans.variable} antialiased`}
			>
				<Provider>
						{children}
				</Provider>
			</body>
		</html>
	);
}
