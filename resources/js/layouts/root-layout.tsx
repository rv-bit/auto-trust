import { Link, usePage } from "@inertiajs/react";
import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { APP_NAME } from "@/resources/app-config";

import Footer from "@/components/navigation-footer";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { ChevronRight, Menu } from "lucide-react";

export default function RootLayout({ footer, className, children }: React.PropsWithChildren<{ footer?: boolean; className?: string }>) {
	const user = usePage().props.auth?.user;
	const isMobile = useMediaQuery("(max-width: 640px)");

	const actions: {
		title: string;
		isHidden?: boolean;
		method?: "get" | "post";
		href?: string;
		component?: React.FC;
	}[] = React.useMemo(
		() => [
			{
				title: "Manage Account",
				isHidden: user === null,
				href: "profile.dashboard",
			},
			{
				title: "Log Out",
				isHidden: user === null,
				method: "post",
				href: "logout",
			},
			{
				title: "Sign In",
				isHidden: user !== null,
				href: "login",
			},
			{
				title: "Create an Account",
				isHidden: user !== null,
				href: "register",
			},
		],
		[isMobile],
	);

	return (
		<React.Fragment>
			<nav
				style={{
					height: "var(--topbar-height)",
					position: "fixed",
					zIndex: 10,
				}}
				className="bg-background border-border w-full border-b"
			>
				<section className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
					<div className="flex shrink-0 items-center justify-start gap-2 sm:hidden">
						<Drawer autoFocus={true} direction="left">
							<DrawerTrigger name="Menu Button" aria-label="Menu Button">
								<Menu size={20} />
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader className="hidden p-0">
									<DrawerTitle className="flex h-20 w-full flex-row items-center justify-between p-5 py-3 hover:bg-gray-200">
										<DrawerClose />
									</DrawerTitle>
									<DrawerDescription aria-label="menu-description"></DrawerDescription>
								</DrawerHeader>

								{actions.map(
									(action) =>
										!action.isHidden &&
										(action.component ? (
											<action.component />
										) : (
											action.href && (
												<Link
													key={action.title}
													method={action.method}
													href={route(action.href)}
													className="flex h-15 w-full flex-row items-center justify-between p-5 py-3 text-left transition-colors duration-200 ease-linear hover:bg-gray-200"
												>
													{action.title}
													<ChevronRight size={13} />
												</Link>
											)
										)),
								)}

								<DrawerFooter className="p-0">
									<DrawerClose className="h-15 w-full p-5 text-left transition-colors duration-200 ease-linear hover:bg-gray-200">
										<h1>Close</h1>
									</DrawerClose>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>

						<Link href="/" className="font-bricolage text-lg font-semibold -tracking-wide lowercase italic">
							{APP_NAME}
						</Link>
					</div>

					<div className="flex w-full items-center justify-start gap-2"></div>

					<div className="hidden w-full items-center justify-center sm:flex">
						<Link href="/" className="font-bricolage text-lg font-semibold -tracking-wide lowercase italic">
							{APP_NAME}
						</Link>
					</div>

					<div className="flex w-full items-center justify-end gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger className="group flex h-fit w-fit items-center justify-center max-sm:hidden">
								<span className="flex items-center justify-center rounded-md group-hover:scale-110">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
										/>
									</svg>
								</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="flex min-h-20 w-full min-w-50 flex-col items-start justify-center rounded-none">
								{actions.map(
									(action) =>
										!action.isHidden && (
											<DropdownMenuItem
												key={action.title}
												onClick={(e) => {
													e.preventDefault();
												}}
												className="h-full w-full rounded-none"
											>
												{action.component ? (
													<action.component />
												) : (
													action.href && (
														<Link method={action.method} href={route(action.href)} className="h-full w-full text-left">
															{action.title}
														</Link>
													)
												)}
											</DropdownMenuItem>
										),
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</section>
			</nav>

			<main
				style={{
					minHeight: footer ? "calc(100svh - var(--topbar-height) - 0.25rem" : undefined,
					height: !footer ? "100svh" : undefined,
					width: "100%",
					flex: "1 1 0%",
					paddingTop: "var(--topbar-height)",
					overflowX: "visible",
				}}
			>
				{children}
			</main>

			{footer && <Footer />}
		</React.Fragment>
	);
}
