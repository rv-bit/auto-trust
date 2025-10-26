import { Link, usePage } from "@inertiajs/react";
import { gsap } from "gsap";
import { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { dashboard, login, register } from "@/routes";

import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";

import { type BreadcrumbItem, type NavItem, type SharedData } from "@/types";
import { type RouteDefinition } from "@/wayfinder";

import { UserMenuContent } from "@/components/settings/user-menu-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { type LucideIcon, LayoutGrid, Menu, Search } from "lucide-react";
import { GoArrowUpRight } from "react-icons/go";

import { Icon } from "@/icons/icons";

import AppLogo from "./app-logo";
import AppLogoIcon from "./app-logo-icon";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: dashboard(),
		icon: LayoutGrid,
	},
];

const rightNavItems: NavItem[] = [];

const activeItemStyles = "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

interface AppHeaderProps {
	breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
	const page = usePage<SharedData>();
	const { auth } = page.props;

	const getInitials = useInitials();

	return (
		<>
			<div className="border-sidebar-border/80 border-b">
				<div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
					{/* Mobile Menu */}
					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
								<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
								<SheetHeader className="flex justify-start text-left">
									<AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
								</SheetHeader>
								<div className="flex h-full flex-1 flex-col space-y-4 p-4">
									<div className="flex h-full flex-col justify-between text-sm">
										<div className="flex flex-col space-y-4">
											{mainNavItems.map((item) => (
												<Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
													{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
													<span>{item.title}</span>
												</Link>
											))}
										</div>

										<div className="flex flex-col space-y-4">
											{rightNavItems.map((item) => (
												<a
													key={item.title}
													href={typeof item.href === "string" ? item.href : item.href?.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center space-x-2 font-medium"
												>
													{item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
													<span>{item.title}</span>
												</a>
											))}
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<Link href={dashboard()} prefetch className="flex items-center space-x-2">
						<AppLogo />
					</Link>

					{/* Desktop Navigation */}
					<div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
						<NavigationMenu className="flex h-full items-stretch">
							<NavigationMenuList className="flex h-full items-stretch space-x-2">
								{mainNavItems.map((item, index) => (
									<NavigationMenuItem key={index} className="relative flex h-full items-center">
										<Link
											href={item.href}
											className={cn(
												navigationMenuTriggerStyle(),
												page.url === (typeof item.href === "string" ? item.href : item.href?.url) && activeItemStyles,
												"h-9 cursor-pointer px-3",
											)}
										>
											{item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
											{item.title}
										</Link>
										{page.url === item.href && <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>}
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="ml-auto flex items-center space-x-2">
						<div className="relative flex items-center space-x-1">
							<Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
								<Search className="size-5! opacity-80 group-hover:opacity-100" />
							</Button>
							<div className="hidden lg:flex">
								{rightNavItems.map((item) => (
									<TooltipProvider key={item.title} delayDuration={0}>
										<Tooltip>
											<TooltipTrigger>
												<a
													href={typeof item.href === "string" ? item.href : item.href?.url}
													target="_blank"
													rel="noopener noreferrer"
													className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
												>
													<span className="sr-only">{item.title}</span>
													{item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />}
												</a>
											</TooltipTrigger>
											<TooltipContent>
												<p>{item.title}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="size-10 rounded-full p-1">
									<Avatar className="size-8 overflow-hidden rounded-full">
										<AvatarImage src={auth.user.avatar} alt={auth.user.name} />
										<AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">{getInitials(auth.user.name)}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end">
								<UserMenuContent user={auth.user} />
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
			{breadcrumbs.length > 1 && (
				<div className="border-sidebar-border/70 flex w-full border-b">
					<div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
						<Breadcrumbs breadcrumbs={breadcrumbs} />
					</div>
				</div>
			)}
		</>
	);
}

type CardNavLink = {
	label: string;
	href: string;
	ariaLabel: string;
};

type CardNavItem = {
	label: string;
	bgColor: string;
	textColor: string;
	links: CardNavLink[];
};

interface CardNavProps {
	logo?: string;
	logoAlt?: string;
	items: CardNavItem[];
	className?: string;
	ease?: string;
	baseColor?: string;
	menuColor?: string;
	buttonBgColor?: string;
	buttonTextColor?: string;
}

type Side = "start" | "end" | "top" | "bottom";
type SideOffsetData = Partial<Record<Side, NavData[]>>;

type NavData = {
	title: string;
	icon?: LucideIcon;
	className?: string;
	isHidden?: boolean;
} & ({ href: RouteDefinition<"get">; component?: never } | { component: React.FC; href?: never } | { href?: never; component?: never });

const convertToCardNavItems = (sideData: SideOffsetData): CardNavItem[] => {
	const cards: CardNavItem[] = [];

	// Flatten all items from all positions (start, end, top, bottom)
	const allItems = Object.values(sideData)
		.flat()
		.filter((item) => item && !item.isHidden);

	// Push each item as its own card
	allItems.forEach((item) => {
		cards.push({
			label: item.title,
			bgColor: "#f3f4f6",
			textColor: "#1b1b18",
			links: [
				{
					label: item.title,
					href: item.href ? String(item.href) : "#",
					ariaLabel: item.title,
				},
			],
		});
	});

	return cards;
};

export const NavHeader = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => {
	const page = usePage<SharedData>();
	const { auth } = page.props;

	const sentinelRef = useRef<HTMLDivElement>(null);

	const [showCardNav, setShowCardNav] = useState(false);

	const actions: SideOffsetData = useMemo(
		() => ({
			end: [
				{
					title: "Dashboard",
					href: dashboard(),
					className: "inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]",
					isHidden: auth.user === null,
				},
				{
					title: "Sign In",
					href: login(),
					className: "inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]",
					isHidden: auth.user !== null,
				},
				{
					title: "Create an Account",
					href: register(),
					className: "inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]",
					isHidden: auth.user !== null,
				},
			],
		}),
		[auth],
	);

	// Setup scroll observer - watch the sentinel element that scrolls with content
	useEffect(() => {
		const sentinelElement = sentinelRef.current;
		if (!sentinelElement) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// Show CardNav when sentinel is not intersecting (scrolled past)
				setShowCardNav(!entry.isIntersecting);
			},
			{
				threshold: 0,
				rootMargin: "0px 0px 0px 0px",
			},
		);

		observer.observe(sentinelElement);

		return () => {
			if (sentinelElement) {
				observer.unobserve(sentinelElement);
			}
		};
	}, []);

	const cardNavItems = useMemo(() => convertToCardNavItems(actions), [actions]);

	return (
		<>
			<div ref={sentinelRef} className="pointer-events-none absolute top-0 left-0 h-1 w-full" aria-hidden="true" />

			<nav
				style={{ ...props.style }}
				className={cn("border-sidebar-border/80 fixed top-0 right-0 left-0 z-30 h-auto min-h-10 w-full border-b bg-white", props.className, {
					hidden: showCardNav,
				})}
			>
				<ul className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-5 py-3">
					{Object.entries(actions).flatMap(([side, items]) =>
						items?.map(
							(action) =>
								!action.isHidden &&
								(action.component ? (
									<action.component key={action.title} />
								) : (
									action.href && (
										<li key={action.title}>
											<Link href={action.href} className={action.className ?? ""}>
												{action.title}
											</Link>
										</li>
									)
								)),
						),
					)}
				</ul>
			</nav>

			<div
				className={cn(
					"fixed right-0 bottom-0 left-0 z-50 transition-all duration-300",
					showCardNav ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
				)}
			>
				{cardNavItems.length > 0 && (
					<CardNav logo="/path-to-your-logo.svg" logoAlt="Your Logo" items={cardNavItems} baseColor="#ffffff" menuColor="#000000" buttonBgColor="#1b1b18" buttonTextColor="#ffffff" />
				)}
			</div>
		</>
	);
});

const CardNav: React.FC<CardNavProps> = ({ logo, logoAlt = "Logo", items, className = "", ease = "power3.out", baseColor = "#fff", menuColor, buttonBgColor, buttonTextColor }) => {
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const navRef = useRef<HTMLDivElement | null>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	const tlRef = useRef<gsap.core.Timeline | null>(null);

	const calculateHeight = () => {
		const navEl = navRef.current;
		if (!navEl) return 260;

		const isMobile = window.matchMedia("(max-width: 768px)").matches;
		if (isMobile) {
			const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
			if (contentEl) {
				const wasVisible = contentEl.style.visibility;
				const wasPointerEvents = contentEl.style.pointerEvents;
				const wasPosition = contentEl.style.position;
				const wasHeight = contentEl.style.height;

				contentEl.style.visibility = "visible";
				contentEl.style.pointerEvents = "auto";
				contentEl.style.position = "static";
				contentEl.style.height = "auto";

				contentEl.offsetHeight;

				const topBar = 60;
				const padding = 16;
				const contentHeight = contentEl.scrollHeight;

				contentEl.style.visibility = wasVisible;
				contentEl.style.pointerEvents = wasPointerEvents;
				contentEl.style.position = wasPosition;
				contentEl.style.height = wasHeight;

				return topBar + contentHeight + padding;
			}
		}
		return 260;
	};

	const createTimeline = useCallback(() => {
		const navEl = navRef.current;
		if (!navEl) return null;

		gsap.set(navEl, { height: 60, overflow: "hidden" });
		gsap.set(cardsRef.current, { y: 50, opacity: 0 });

		const tl = gsap.timeline({ paused: true });

		tl.to(navEl, {
			height: calculateHeight,
			duration: 0.4,
			ease,
		});

		tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");

		return tl;
	}, [ease]);

	useLayoutEffect(() => {
		const tl = createTimeline();
		tlRef.current = tl;

		return () => {
			tl?.kill();
			tlRef.current = null;
		};
	}, [ease, items, createTimeline]);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (!tlRef.current) return;

			if (isExpanded) {
				const newHeight = calculateHeight();
				gsap.set(navRef.current, { height: newHeight });

				tlRef.current.kill();
				const newTl = createTimeline();
				if (newTl) {
					newTl.progress(1);
					tlRef.current = newTl;
				}
			} else {
				tlRef.current.kill();
				const newTl = createTimeline();
				if (newTl) {
					tlRef.current = newTl;
				}
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isExpanded, createTimeline]);

	const toggleMenu = () => {
		const tl = tlRef.current;
		if (!tl) return;
		if (!isExpanded) {
			setIsHamburgerOpen(true);
			setIsExpanded(true);
			tl.play(0);
		} else {
			setIsHamburgerOpen(false);
			tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
			tl.reverse();
		}
	};

	const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
		if (el) cardsRef.current[i] = el;
	};

	return (
		<nav className={cn("w-full bg-white px-4 py-4", className)}>
			<div className="mx-auto max-w-[800px]">
				<div
					ref={navRef}
					className={`card-nav ${isExpanded ? "open" : ""} relative block h-[60px] overflow-hidden rounded-xl shadow-lg will-change-[height]`}
					style={{ backgroundColor: baseColor }}
				>
					<div className="card-nav-top absolute inset-x-0 top-0 z-2 flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
						<div
							className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group order-2 flex h-full cursor-pointer flex-col items-center justify-center gap-1.5 md:order-0`}
							onClick={toggleMenu}
							role="button"
							aria-label={isExpanded ? "Close menu" : "Open menu"}
							tabIndex={0}
							style={{ color: menuColor || "#000" }}
						>
							<div
								className={`hamburger-line h-0.5 w-[30px] origin-[50%_50%] bg-current transition-[transform,opacity,margin] duration-300 ease-linear ${
									isHamburgerOpen ? "translate-y-1 rotate-45" : ""
								} group-hover:opacity-75`}
							/>
							<div
								className={`hamburger-line h-0.5 w-[30px] origin-[50%_50%] bg-current transition-[transform,opacity,margin] duration-300 ease-linear ${
									isHamburgerOpen ? "-translate-y-1 -rotate-45" : ""
								} group-hover:opacity-75`}
							/>
						</div>

						<div className="logo-container order-1 flex items-center md:absolute md:top-1/2 md:left-1/2 md:order-0 md:-translate-x-1/2 md:-translate-y-1/2">
							<img src={logo} alt={logoAlt} className="logo h-7" />
						</div>

						<button
							type="button"
							className="card-nav-cta-button hidden h-full cursor-pointer rounded-[calc(0.75rem-0.2rem)] border-0 px-4 font-medium transition-colors duration-300 hover:opacity-90 md:inline-flex"
							style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
						>
							Get Started
						</button>
					</div>

					<div
						className={`card-nav-content absolute top-[60px] right-0 bottom-0 left-0 z-1 flex flex-col items-stretch justify-start gap-2 p-2 ${
							isExpanded ? "pointer-events-auto visible" : "pointer-events-none invisible"
						} md:flex-row md:items-end md:gap-3`}
						aria-hidden={!isExpanded}
					>
						{(items || []).slice(0, 3).map((item, idx) => (
							<div
								key={`${item.label}-${idx}`}
								className="nav-card relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] flex-col gap-2 rounded-[calc(0.75rem-0.2rem)] p-[12px_16px] select-none md:h-full md:min-h-0 md:flex-[1_1_0%]"
								ref={setCardRef(idx)}
								style={{ backgroundColor: item.bgColor, color: item.textColor }}
							>
								<div className="nav-card-label text-[18px] font-normal tracking-[-0.5px] md:text-[22px]">{item.label}</div>
								<div className="nav-card-links mt-auto flex flex-col gap-0.5">
									{item.links?.map((lnk, i) => (
										<a
											key={`${lnk.label}-${i}`}
											className="nav-card-link inline-flex cursor-pointer items-center gap-1.5 text-[15px] no-underline transition-opacity duration-300 hover:opacity-75 md:text-[16px]"
											href={lnk.href}
											aria-label={lnk.ariaLabel}
										>
											<GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
											{lnk.label}
										</a>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};
