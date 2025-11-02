import { Link, usePage } from "@inertiajs/react";
import { type PropsWithChildren } from "react";

import { home } from "@/routes";
import type { SharedData } from "@/types";

import Squares from "@/components/backgrounds/squares-background";

import AppLogoIcon from "@/components/application/app-logo-icon";

interface AuthLayoutProps {
	title?: string;
	description?: string;
}

export default function Layout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
	const { name } = usePage<SharedData>().props;

	return (
		<div className="bg-sidebar/50 relative grid h-dvh flex-col items-center justify-center max-sm:px-4 md:max-w-none md:grid-cols-2">
			<div className="relative hidden h-full flex-col p-10 text-white md:flex dark:border-r">
				<Squares
					speed={0.1}
					squareSize={40}
					direction="diagonal"
					borderColor="var(--primary-business)"
					borderColorOpacity={0.3}
					hoverFillColor="#ffffff"
					hoverColorOpacity={0.1}
					className="absolute inset-0"
				/>

				{/* <div className="absolute inset-0 bg-zinc-900" /> */}
				<Link href={home()} className="relative z-20 flex items-center text-lg font-medium">
					<AppLogoIcon className="mr-2 size-8 fill-current text-white" />
					{name}
				</Link>
			</div>

			<div className="flex h-full w-full items-center justify-center p-0 md:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 md:max-w-[500px]">
					<Link href={home()} className="relative z-20 flex items-center justify-center md:hidden">
						<AppLogoIcon className="h-10 fill-current text-black" />
					</Link>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-xl font-medium text-balance">{title}</h1>
						<p className="text-muted-foreground text-sm text-balance">{description}</p>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
