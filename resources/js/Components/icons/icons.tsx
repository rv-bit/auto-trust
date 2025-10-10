import React from "react";

import type { IconProps, InternalIcon } from "@/types/icons";

export const Copy: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 14 16" {...props}>
		<path d="M2.404 15.322h5.701c1.26 0 1.887-.662 1.887-1.927V12.38h1.154c1.254 0 1.91-.662 1.91-1.928V5.555c0-.774-.158-1.266-.626-1.74L9.512.837C9.066.387 8.545.21 7.865.21H5.463c-1.254 0-1.91.662-1.91 1.928v1.084H2.404c-1.254 0-1.91.668-1.91 1.933v8.239c0 1.265.656 1.927 1.91 1.927zm7.588-6.62c0-.792-.1-1.161-.592-1.665L6.225 3.814c-.452-.462-.844-.58-1.5-.591V2.215c0-.533.28-.832.843-.832h2.38v2.883c0 .726.386 1.113 1.107 1.113h2.83v4.998c0 .539-.276.832-.844.832H9.992V8.701zm-.79-4.29c-.206 0-.288-.088-.288-.287V1.594l2.771 2.818H9.201zM2.503 14.15c-.563 0-.844-.293-.844-.832V5.232c0-.539.281-.837.85-.837h1.91v3.187c0 .85.416 1.26 1.26 1.26h3.14v4.476c0 .54-.28.832-.843.832H2.504zM5.79 7.816c-.24 0-.346-.105-.346-.345V4.547l3.223 3.27H5.791z" />
	</svg>
));

export const Message: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 25 24" {...props}>
		<path
			d="M22.468 10V13C22.468 17 20.468 19 16.468 19H15.968C15.658 19 15.358 19.15 15.168 19.4L13.668 21.4C13.008 22.28 11.928 22.28 11.268 21.4L9.76802 19.4C9.60802 19.18 9.23802 19 8.96802 19H8.46802C4.46802 19 2.46802 18 2.46802 13V8C2.46802 4 4.46802 2 8.46802 2H14.468"
			stroke="white"
			strokeWidth="1.5"
			strokeMiterlimit="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M19.968 7C21.3487 7 22.468 5.88071 22.468 4.5C22.468 3.11929 21.3487 2 19.968 2C18.5873 2 17.468 3.11929 17.468 4.5C17.468 5.88071 18.5873 7 19.968 7Z"
			fill="var(--most-mint)"
			stroke="white"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M16.4645 11H16.4735" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M12.4635 11H12.4725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M8.46252 11H8.47151" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
));

export const House: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 170 180" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M166.407 74.8366C168.702 77.1013 170 80.2401 170 83.5221V167.2C170 174.269 164.465 180 157.636 180H12.3637C5.53545 180 6.10352e-05 174.269 6.10352e-05 167.2L6.10352e-05 82.8495C6.10352e-05 79.5102 1.34403 76.322 3.70888 74.0512L77.4934 3.20172C79.6368 1.14362 82.4522 0 85.3755 0L85.9437 0C88.922 0 91.786 1.18689 93.9417 3.31449L166.407 74.8366ZM50.2273 144.982C46.3864 144.982 43.2728 148.206 43.2728 152.182C43.2728 156.158 46.3865 159.382 50.2273 159.382H119C122.841 159.382 125.955 156.158 125.955 152.182C125.955 148.206 122.841 144.982 119 144.982H50.2273Z"
			fill={props.fill ?? "white"}
			className={props.className}
		/>
		<path
			d="M44.7517 146.823C43.41 148.317 43 150.388 43 152.396C43 153.545 43.1295 154.708 43.6056 155.754C45.0222 158.866 47.29 159.705 52 159.994H117.5C121.611 160.085 123.652 159.217 125.383 155.196C125.831 154.155 126 153.017 126 151.884C126 150.898 125.88 149.907 125.515 148.992C124.155 145.59 122.087 144.519 117.5 144H52C48.556 144.241 46.5218 144.852 44.7517 146.823Z"
			fill={props.fill ?? "white"}
			fillOpacity={props.fillOpacity ?? 1}
		/>
	</svg>
));

export const BackArrow: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 220 225" {...props}>
		<rect y="0.00012207" rx="25" className={props.className} />
		<path d="M149.333 113.5L21 113.5" stroke="black" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M94 169.5L149 113.25L94 57" stroke="black" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M189 158.023L189 67" stroke="black" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
));

export const SidebarTriggerIcon: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 220 225" {...props}>
		<path
			d="M149.333 113.5L20.9999 113.5M93.9999 169.5L149 113.25L93.9999 57"
			stroke={props.stroke}
			strokeWidth="18"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="group-data-[collapsible=icon]:group-hover/sidebar-trigger:slide-in-from-left-120 group-data-[collapsible=icon]:group-hover/sidebar-trigger:animate-in group-data-[collapsible=icon]:not-hover:animate-out group-data-[collapsible=icon]:not-hover:slide-out-to-right-120 group-hover/sidebar-trigger:slide-in-from-left-120 group-hover/sidebar-trigger:animate-in not-hover:animate-out not-hover:slide-out-to-left-100 not-hover:-translate-x-96 group-hover/sidebar-trigger:not-hover:translate-x-5 group-data-[collapsible=icon]:not-hover:-translate-x-96 group-data-[collapsible=icon]:group-hover/sidebar-trigger:not-hover:translate-x-5"
		/>
		<path
			d="M189 158.023L189 67"
			stroke={props.stroke}
			strokeWidth="18"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="opacity-100 transition-opacity duration-200 ease-in-out group-hover/sidebar-trigger:opacity-0 group-data-[collapsible=icon]:group-hover/sidebar-trigger:opacity-0"
		/>
	</svg>
));

export const PencilSquare: InternalIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
	<svg role="graphics-symbol" viewBox="0 0 24 24" {...props}>
		<g id="bgCarrier" strokeWidth="0"></g>
		<g id="tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
		<g id="iconCarrier">
			<path
				d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
				stroke="#464455"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</g>
	</svg>
));
