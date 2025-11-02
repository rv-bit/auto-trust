import { Link } from "@inertiajs/react";
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/resources/app-config";

const metadata = [
	{
		title: "Explore",
		children: [
			{ title: "About Us", route: "/about" },
			{ title: "Contact Us", route: "/contact" },
			{ title: "Careers", route: "/careers" },
		],
	},
	{
		title: "Company",
		children: [
			{ title: "Our Story", route: "/our-story" },
			{ title: "Blog", route: "/blog" },
			{ title: "Press", route: "/press" },
		],
	},
	{
		title: "Customer",
		children: [
			{ title: "Contact Information", route: "/contact-information" },
			{ title: "My Account", route: "/login" },
			{ title: "FAQ", route: "/faq" },
			{ title: "Privacy Policy", route: "/privacy-policy" },
			{ title: "Terms of Service", route: "/terms-of-service" },
			{ title: "Cookie Policy", route: "/cookie-policy" },
			{ title: "Shipping", route: "/shipping" },
			{ title: "Returns", route: "/returns" },
		],
	},
];

export const AppFooter = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"footer">>(({ ...props }, ref) => {
	return (
		<footer ref={ref} className={cn("border-border mt-auto flex w-full flex-col items-center justify-end border-t bg-black px-6 lg:px-8", props.className)}>
			<div className="mx-auto flex w-full max-w-7xl flex-col">
				<div id="footer__content-wrapper">
					<section id="footer__column-links" className="py-8">
						<div id="footer__column footer__column--help">
							<div id="footer__column-container" className="flex flex-wrap justify-start gap-5 md:gap-20">
								<div id="contact-details">
									<Button id="contact-details_title" asChild variant={"link"} className="p-0 text-xl text-white underline hover:text-white dark:text-white dark:hover:text-white">
										<Link rel="noopener" target="_blank">
											Help Center
										</Link>
									</Button>
									<div id="contact-details_time" className="mb-3 text-sm text-white">
										Monday to Friday 9.00 - 18.00 <br></br>
										Saturday 9.00 - 17.30 <br></br>
										Sundays and Bank Holidays CLOSED
									</div>

									<div id="footer__social-media">
										<div id="footer__social-media" className="space-x-4">
											<Link href="https://www.facebook.com/profile.php?id=100087050144571" target="_blank" className="inline-block size-fit">
												<svg className="size-6 fill-white" viewBox="0 0 24 24">
													<path d="M9.032 23L9 13H5V9h4V6.5C9 2.79 11.298 1 14.61 1c1.585 0 2.948.118 3.345.17v3.88H15.66c-1.802 0-2.15.856-2.15 2.112V9h5.24l-2 4h-3.24v10H9.032z"></path>
												</svg>
											</Link>
											<Link href="https://www.facebook.com/profile.php?id=100087050144571" target="_blank" className="inline-block size-fit">
												<svg className="size-6 fill-white" viewBox="0 0 24 24">
													<path d="M13.9763 10.1624L22.7186 0H20.647L13.056 8.82378L6.9928 0H0L9.16842 13.3433L0 24H2.07168L10.0881 14.6816L16.491 24H23.4838L13.9756 10.1624H13.9763ZM11.1387 13.4608L10.2097 12.1321L2.81823 1.55971H6.0004L11.9654 10.092L12.8944 11.4206L20.6479 22.5114H17.4657L11.1384 13.4614V13.4608H11.1387Z"></path>
												</svg>
											</Link>
											<Link href="https://www.facebook.com/profile.php?id=100087050144571" target="_blank" className="inline-block size-fit">
												<svg className="size-6 fill-white" viewBox="0 0 24 24">
													<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.36.06 2.63.34 3.6 1.31.98.98 1.26 2.24 1.32 3.61.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.36-.34 2.63-1.31 3.6-.98.98-2.25 1.26-3.61 1.32-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.37-.06-2.63-.34-3.6-1.31-.98-.98-1.26-2.25-1.32-3.61-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.06-1.37.34-2.63 1.31-3.6.98-.98 2.24-1.26 3.61-1.32 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.1.17 3.4.64 2.01 2.01.64 3.4.16 5.11.07 7.05A85.64 85.64 0 0 0 0 12c0 3.26.01 3.67.07 4.95.1 1.95.57 3.66 1.94 5.04 1.38 1.37 3.1 1.85 5.04 1.94 1.28.06 1.7.07 4.95.07s3.67-.01 4.95-.07c1.95-.1 3.66-.57 5.04-1.94 1.37-1.38 1.85-3.1 1.94-5.04.06-1.28.07-1.7.07-4.95s-.01-3.67-.07-4.95c-.1-1.95-.57-3.66-1.94-5.04C20.6.64 18.89.16 16.95.07A85.64 85.64 0 0 0 12 0z"></path>
													<path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
													<circle cx="18.41" cy="5.59" r="1.44"></circle>
												</svg>
											</Link>
										</div>
									</div>
								</div>

								<div id="footer__column">
									<ul id="footer__link-list">
										<li id="footer__list-item" className="text-white">
											<Button
												id="contact-details_title"
												asChild
												variant={"link"}
												className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white"
											>
												<Link rel="noopener" target="_blank" href="https://www.autotrust.co.uk/contact-us">
													About us
												</Link>
											</Button>
										</li>
										<li id="footer__list-item" className="text-white">
											<Button
												id="contact-details_title"
												asChild
												variant={"link"}
												className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white"
											>
												<Link rel="noopener" target="_blank" href="https://www.autotrust.co.uk/contact-us">
													Contact us
												</Link>
											</Button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
				</div>

				<div id="footer__smallprint" className="border-gray-200 border-t py-8">
					<section id="footer-smallprint__legal" className="mb-8 flex flex-wrap justify-between gap-3 text-white md:flex-nowrap md:gap-0">
						<div id="footer-smallprint__copyright" className="mr-6 w-fit">
							© 2025 {APP_NAME} Ltd. All rights reserved
						</div>
						<div id="footer-smallprint__legal-links" className="space-x-4">
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link id="footer-smallprint__legal-link" rel="nofollow" data-detail-element-name="cookie management center" data-interaction-type="footer" href="#">
									Manage cookies &amp; privacy
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									rel="nofollow"
									data-detail-element-name="terms of use"
									data-interaction-type="footer"
									href="https://www.autotrust.co.uk/terms-and-conditions"
								>
									Terms &amp; conditions
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									rel="nofollow"
									data-detail-element-name="fraud disclaimer"
									data-interaction-type="footer"
									href="https://www.autotrust.co.uk/fraud-disclaimer"
								>
									Fraud disclaimer
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link id="footer-smallprint__legal-link" data-detail-element-name="esg" data-interaction-type="footer" href="https://www.autotrust.co.uk/esg">
									ESG Policy
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									rel="nofollow"
									data-detail-element-name="privacy policy"
									data-interaction-type="footer"
									href="https://www.autotrust.co.uk/privacy-policy"
								>
									Privacy policy
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									data-detail-element-name="fakereviewspolicy"
									data-interaction-type="footer"
									data-mobile-app="hide"
									href="https://www.autotrust.co.uk/partners/fakereviewspolicy"
								>
									Fake Reviews Policy
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									rel="nofollow"
									data-detail-element-name="modern slavery statement"
									data-interaction-type="footer"
									href="https://www.autotrust.co.uk/modern_slavery_statement"
								>
									Modern slavery statement
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									rel="nofollow"
									data-detail-element-name="accessibility statement"
									data-interaction-type="footer"
									href="https://www.autotrust.co.uk/accessibility-notice"
								>
									Accessibility notice
								</Link>
							</Button>
							<Button asChild variant={"link"} className="p-0 text-sm text-white underline hover:text-white dark:text-white dark:hover:text-white">
								<Link
									id="footer-smallprint__legal-link"
									data-detail-element-name="sitemap"
									data-interaction-type="footer"
									data-mobile-app="hide"
									href="https://www.autotrust.co.uk/sitemap"
								>
									Sitemap
								</Link>
							</Button>
						</div>
					</section>

					<section id="footer__fca">
						<p className="text-white dark:text-white">
							Average savings are calculated daily based on the best dealer prices on {APP_NAME} vs manufacturer RRP. Where it is shown that the EV Grant is included, this refers to the
							Government grant awarded to manufacturers on certain EV models and derivatives, the amount awarded under the EV Grant is included in the Savings stated and applied at the
							point of sale.
							{APP_NAME} is the trading name of {APP_NAME} Ltd, which is authorised and regulated by the Financial Conduct Authority for credit broking and insurance distribution
							activities (firm reference number: 767155). {APP_NAME} Leasey Limited is an appointed representative of ITC Compliance Limited which is authorised and regulated by the
							Financial Conduct Authority for credit broking (firm reference number: 313486) {APP_NAME} and {APP_NAME} Leasey Limited are each credit brokers and not a lenders.{" "}
							{APP_NAME} and {APP_NAME} Leasey Limited may receive a fee from retailers advertising finance and may receive a commission from partners (including dealers) for introducing
							customers. All finance offers and monthly payments shown are subject to application and status. {APP_NAME} is covered by the Financial Ombudsman Service (please see
							www.financial-ombudsman.org.uk for more information). {APP_NAME} Ltd is registered in England (company number 07103079), registered office 2nd Floor, Verde Building, 10
							Bressenden Place, London, England, SW1E 5DH. {APP_NAME} Leasey Limited is registered in England (company number 13601174), registered office 2nd Floor, Verde Building, 10
							Bressenden Place, London, England, SW1E 5DH and is a wholly owned subsidiary of {APP_NAME} Ltd.
						</p>
					</section>
				</div>
			</div>
		</footer>
	);
});